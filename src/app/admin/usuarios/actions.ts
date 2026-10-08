'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma, Role } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

const readRole = (value: FormDataEntryValue | null) => {
  const role = String(value ?? Role.MEMBER);
  return Object.values(Role).includes(role as Role) ? (role as Role) : Role.MEMBER;
};

export async function updateUserRole(userId: string, formData: FormData) {
  const actor = await requireAdmin('/admin/usuarios');
  const role = readRole(formData.get('role'));
  const isActive = formData.get('isActive') === 'on';
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, isActive: true },
  });

  if (!target) {
    redirect('/admin/usuarios?error=not-found');
  }

  const removesAdminAccess = target.role === Role.ADMIN && (role !== Role.ADMIN || !isActive);

  if (target.id === actor.id && removesAdminAccess) {
    redirect('/admin/usuarios?error=self-admin');
  }

  if (removesAdminAccess) {
    const activeAdmins = await prisma.user.count({
      where: { role: Role.ADMIN, isActive: true },
    });

    if (activeAdmins <= 1) {
      redirect('/admin/usuarios?error=last-admin');
    }
  }

  const shouldRevokeSessions = target.role !== role || target.isActive !== isActive;

  await prisma.user.update({
    where: { id: userId },
    data: {
      role,
      isActive,
      ...(shouldRevokeSessions ? { sessionVersion: { increment: 1 } } : {}),
    },
  });

  revalidatePath('/admin/usuarios');
  redirect('/admin/usuarios?guardado=actualizado');
}

export async function deleteUser(userId: string) {
  const actor = await requireAdmin('/admin/usuarios');

  if (userId === actor.id) {
    redirect('/admin/usuarios?error=self-delete');
  }

  let error: string | null;
  try {
    error = await prisma.$transaction(async (transaction) => {
      const target = await transaction.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true, isActive: true },
      });

      if (!target) return 'not-found';

      if (target.role === Role.ADMIN && target.isActive) {
        const activeAdmins = await transaction.user.count({
          where: { role: Role.ADMIN, isActive: true },
        });
        if (activeAdmins <= 1) return 'last-admin';
      }

      // Linked accounts and sessions are removed by the existing cascade relations.
      await transaction.user.delete({ where: { id: userId } });
      return null;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  } catch (cause) {
    if (cause instanceof Prisma.PrismaClientKnownRequestError && cause.code === 'P2034') {
      redirect('/admin/usuarios?error=conflict');
    }
    throw cause;
  }

  if (error) redirect(`/admin/usuarios?error=${error}`);

  revalidatePath('/admin/usuarios');
  redirect('/admin/usuarios?eliminado=1');
}
