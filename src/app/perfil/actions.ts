'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireActiveUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import { consumeRateLimit } from '@/lib/rate-limit';
import { sendUserPasswordReset } from '@/lib/password-reset';

export async function updateProfile(formData: FormData) {
  const currentUser = await requireActiveUser('/perfil');
  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  if (name.length < 2) redirect('/perfil?error=nombre');

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { name, phone: phone || null },
  });

  revalidatePath('/perfil');
  redirect('/perfil?updated=1');
}

export async function requestProfilePasswordReset(): Promise<{
  success?: boolean;
  message: string;
  tone?: 'success' | 'error' | 'info';
}> {
  const user = await requireActiveUser('/perfil');
  if (!user.email) {
    return { message: 'Tu cuenta no tiene un correo asociado.', tone: 'error' };
  }

  const limit = consumeRateLimit({
    scope: 'email-password-reset',
    identifiers: [user.email.toLowerCase().trim()],
    limit: 5,
    windowMs: 60 * 60 * 1_000,
  });
  if (!limit.allowed) {
    return { message: 'Ya solicitaste varios enlaces. Espera antes de intentarlo nuevamente.', tone: 'error' };
  }

  try {
    const sent = await sendUserPasswordReset({ email: user.email, name: user.name });
    return sent
      ? { success: true, message: 'Te enviamos un correo para restablecer tu contraseña.' }
      : { message: 'El correo no se envió: no hay un proveedor configurado en este entorno local.', tone: 'info' };
  } catch {
    return { message: 'No pudimos enviar el correo. Inténtalo nuevamente en unos minutos.', tone: 'error' };
  }
}
