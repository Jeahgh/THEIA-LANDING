'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma, Role } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import type { UserActionState } from '@/lib/admin-user-types';
import { sendUserPasswordReset } from '@/lib/password-reset';
import { consumeRateLimit } from '@/lib/rate-limit';

export async function updateUser(userId: string, _previous: UserActionState, formData: FormData): Promise<UserActionState> {
  const actor = await requireAdmin('/admin/usuarios');
  const roleValue = String(formData.get('role') ?? '');
  if (!Object.values(Role).includes(roleValue as Role)) return { error: 'Selecciona un rol válido.' };
  const role = roleValue as Role;
  const isActive = formData.get('isActive') === 'on';

  try {
    const error = await prisma.$transaction(async (transaction) => {
      const target = await transaction.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true, isActive: true },
      });
      if (!target) return 'El usuario ya no existe.';
      const removesAdminAccess = target.role === Role.ADMIN && (role !== Role.ADMIN || !isActive);
      if (target.id === actor.id && removesAdminAccess) return 'No puedes quitarte el acceso de administrador.';
      if (removesAdminAccess && await transaction.user.count({ where: { role: Role.ADMIN, isActive: true } }) <= 1) {
        return 'Debe quedar al menos un administrador habilitado.';
      }
      const shouldRevokeSessions = target.role !== role || target.isActive !== isActive;
      await transaction.user.update({ where: { id: userId }, data: {
        role, isActive,
        ...(shouldRevokeSessions ? { sessionVersion: { increment: 1 } } : {}),
      } });
      return null;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    if (error) return { error };
  } catch (cause) {
    if (cause instanceof Prisma.PrismaClientKnownRequestError) {
      if (cause.code === 'P2034') return { error: 'La cuenta cambió mientras la editabas. Revisa los datos e inténtalo de nuevo.' };
    }
    throw cause;
  }
  revalidatePath('/admin/usuarios');
  revalidatePath('/perfil');
  return { success: 'Cambios guardados.' };
}

export async function sendUserRecoveryEmail(userId: string, _previous: UserActionState): Promise<UserActionState> {
  const actor = await requireAdmin('/admin/usuarios');
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, name: true, isActive: true } });
  if (!user?.email) return { error: 'El usuario no tiene un correo registrado.' };
  if (!user.isActive) return { error: 'Habilita y guarda la cuenta antes de enviar el correo de recuperación.' };
  const limit = consumeRateLimit({ scope: 'email-password-reset', identifiers: [user.email], limit: 5, windowMs: 60 * 60 * 1_000 });
  const actorLimit = consumeRateLimit({ scope: 'admin-password-reset', identifiers: [actor.id], limit: 20, windowMs: 60 * 60 * 1_000 });
  if (!limit.allowed || !actorLimit.allowed) return { error: 'Se han solicitado varios correos. Inténtalo más tarde.' };
  try {
    const sent = await sendUserPasswordReset({ email: user.email, name: user.name });
    return sent ? { success: `Correo de recuperación enviado a ${user.email}.` } : { error: 'El envío de correos no está configurado en este entorno.' };
  } catch {
    return { error: 'No se pudo enviar el correo. Revisa la configuración de correo e inténtalo de nuevo.' };
  }
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
