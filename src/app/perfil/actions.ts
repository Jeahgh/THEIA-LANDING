'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { compare, hash } from 'bcryptjs';
import { requireActiveUser } from '@/lib/authz';
import {
  createVerificationToken,
  getEmailVerificationIdentifier,
  hashVerificationToken,
  sendVerificationEmail,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

function getTrustedAppOrigin() {
  const configuredOrigin = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL;

  if (configuredOrigin) {
    return configuredOrigin;
  }

  return process.env.NODE_ENV === 'production' ? null : 'http://localhost:3000';
}

export async function updateProfile(formData: FormData) {
  const currentUser = await requireActiveUser('/perfil');

  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();

  if (name.length < 2) {
    redirect('/perfil?error=nombre');
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name,
      phone: phone || null,
    },
  });

  revalidatePath('/perfil');
  redirect('/perfil?updated=1');
}

export async function updatePassword(formData: FormData) {
  const currentUser = await requireActiveUser('/perfil');

  const currentPassword = String(formData.get('currentPassword') ?? '');
  const newPassword = String(formData.get('newPassword') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (newPassword.length < 8 || newPassword !== confirmPassword) {
    redirect('/perfil?passwordError=validation');
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { passwordHash: true, emailVerified: true },
  });

  if (user?.passwordHash) {
    const valid = await compare(currentPassword, user.passwordHash);
    if (!valid) {
      redirect('/perfil?passwordError=current');
    }
  } else if (!user?.emailVerified) {
    redirect('/perfil?passwordError=verify-email');
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      passwordHash: await hash(newPassword, 12),
      sessionVersion: { increment: 1 },
    },
  });

  revalidatePath('/perfil');
  redirect('/login?callbackUrl=/perfil&passwordUpdated=1');
}

export async function requestEmailVerification() {
  const currentUser = await requireActiveUser('/perfil');

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { email: true, emailVerified: true, name: true },
  });

  if (!user?.email) {
    redirect('/perfil?verification=error');
  }

  if (user.emailVerified) {
    redirect('/perfil?verification=already');
  }

  const token = createVerificationToken();
  const identifier = getEmailVerificationIdentifier(user.email);
  const hashedToken = hashVerificationToken(token);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const origin = getTrustedAppOrigin();

  if (!origin) {
    redirect('/perfil?verification=config-error');
  }

  const verificationUrl = new URL('/api/auth/verify-email', origin);

  verificationUrl.searchParams.set('email', user.email);
  verificationUrl.searchParams.set('token', token);

  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: {
      identifier,
      token: hashedToken,
      expires,
    },
  });

  let emailSent = false;

  try {
    emailSent = await sendVerificationEmail({
      to: user.email,
      name: user.name,
      verificationUrl: verificationUrl.toString(),
    });
  } catch {
    redirect('/perfil?verification=send-error');
  }

  revalidatePath('/perfil');
  redirect(`/perfil?verification=${emailSent ? 'sent' : 'dev'}`);
}
