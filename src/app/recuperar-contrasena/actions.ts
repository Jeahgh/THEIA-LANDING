'use server';

import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import {
  createVerificationToken,
  getPasswordResetIdentifier,
  getTrustedAppOrigin,
  hashVerificationToken,
  sendPasswordResetEmail,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get('email') ?? '').toLowerCase().trim();

  if (!emailRegex.test(email)) {
    redirect('/recuperar-contrasena?error=email');
  }

  const origin = getTrustedAppOrigin();

  if (!origin) {
    redirect('/recuperar-contrasena?error=config');
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, name: true, isActive: true },
  });

  if (!user?.email || !user.isActive) {
    redirect('/recuperar-contrasena?sent=1');
  }

  const token = createVerificationToken();
  const identifier = getPasswordResetIdentifier(user.email);
  const hashedToken = hashVerificationToken(token);
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const resetUrl = new URL('/recuperar-contrasena', origin);

  resetUrl.searchParams.set('email', user.email);
  resetUrl.searchParams.set('token', token);

  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: {
      identifier,
      token: hashedToken,
      expires,
    },
  });

  try {
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl: resetUrl.toString(),
    });
  } catch (error) {
    console.error('Password reset email error:', error);
    redirect('/recuperar-contrasena?error=send');
  }

  redirect('/recuperar-contrasena?sent=1');
}

export async function resetPassword(formData: FormData) {
  const email = String(formData.get('email') ?? '').toLowerCase().trim();
  const token = String(formData.get('token') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (!emailRegex.test(email) || !token) {
    redirect('/recuperar-contrasena?error=invalid');
  }

  if (password.length < 8 || password !== confirmPassword) {
    const params = new URLSearchParams({ email, token, error: 'password' });
    redirect(`/recuperar-contrasena?${params.toString()}`);
  }

  const identifier = getPasswordResetIdentifier(email);
  const hashedToken = hashVerificationToken(token);
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token: hashedToken,
      },
    },
  });

  if (!verificationToken) {
    redirect('/recuperar-contrasena?error=invalid');
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token: hashedToken,
        },
      },
    });
    redirect('/recuperar-contrasena?error=expired');
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, emailVerified: true },
  });

  if (!user) {
    redirect('/recuperar-contrasena?error=invalid');
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: await hash(password, 12),
        emailVerified: user.emailVerified ?? new Date(),
        sessionVersion: { increment: 1 },
      },
    }),
    prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token: hashedToken,
        },
      },
    }),
  ]);

  redirect('/login?passwordReset=1');
}
