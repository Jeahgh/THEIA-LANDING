'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { compare, hash } from 'bcryptjs';
import { auth } from '@/auth';
import {
  createVerificationToken,
  getEmailVerificationIdentifier,
  hashVerificationToken,
  sendVerificationEmail,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/perfil');
  }

  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();

  if (name.length < 2) {
    redirect('/perfil?error=nombre');
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      phone: phone || null,
    },
  });

  revalidatePath('/perfil');
  redirect('/perfil?updated=1');
}

export async function updatePassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/perfil');
  }

  const currentPassword = String(formData.get('currentPassword') ?? '');
  const newPassword = String(formData.get('newPassword') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (newPassword.length < 8 || newPassword !== confirmPassword) {
    redirect('/perfil?passwordError=validation');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });

  if (user?.passwordHash) {
    const valid = await compare(currentPassword, user.passwordHash);
    if (!valid) {
      redirect('/perfil?passwordError=current');
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: await hash(newPassword, 12) },
  });

  revalidatePath('/perfil');
  redirect('/perfil?passwordUpdated=1');
}

export async function requestEmailVerification() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/perfil');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
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
  const headerStore = await headers();
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host');
  const protocol = headerStore.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https');
  const origin = host ? `${protocol}://${host}` : (process.env.AUTH_URL ?? 'http://localhost:3000');
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
