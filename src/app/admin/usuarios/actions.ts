'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
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
}
