import { NextResponse, type NextRequest } from 'next/server';
import {
  createVerificationToken,
  getEmailVerificationIdentifier,
  getPasswordResetIdentifier,
  getTrustedAppOrigin,
  hashVerificationToken,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

function loginRedirect(origin: string, verification: 'invalid' | 'expired') {
  const redirectUrl = new URL('/login', origin);
  redirectUrl.searchParams.set('verification', verification);
  return NextResponse.redirect(redirectUrl, 303);
}

export async function GET(request: NextRequest) {
  const trustedOrigin = getTrustedAppOrigin();

  if (!trustedOrigin) {
    return NextResponse.json({ message: 'Falta configurar la URL publica de la app.' }, { status: 500 });
  }

  const confirmationUrl = new URL('/verificar-email', trustedOrigin);
  const email = request.nextUrl.searchParams.get('email')?.toLowerCase().trim();
  const token = request.nextUrl.searchParams.get('token')?.trim();

  if (!email || !token) return loginRedirect(trustedOrigin, 'invalid');

  confirmationUrl.searchParams.set('email', email);
  confirmationUrl.searchParams.set('token', token);
  return NextResponse.redirect(confirmationUrl, 303);
}

export async function POST(request: NextRequest) {
  const trustedOrigin = getTrustedAppOrigin();

  if (!trustedOrigin) {
    return NextResponse.json({ message: 'Falta configurar la URL publica de la app.' }, { status: 500 });
  }

  const formData = await request.formData();
  const email = String(formData.get('email') ?? '').toLowerCase().trim();
  const token = String(formData.get('token') ?? '').trim();

  if (!email || !token) return loginRedirect(trustedOrigin, 'invalid');

  const identifier = getEmailVerificationIdentifier(email);
  const hashedToken = hashVerificationToken(token);
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token: hashedToken,
      },
    },
  });

  if (!verificationToken) return loginRedirect(trustedOrigin, 'invalid');

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.deleteMany({ where: { identifier } });
    return loginRedirect(trustedOrigin, 'expired');
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      emailVerified: true,
      accounts: { select: { id: true }, take: 1 },
    },
  });

  if (!user || user.emailVerified || user.accounts.length) {
    await prisma.verificationToken.deleteMany({ where: { identifier } });
    return loginRedirect(trustedOrigin, 'invalid');
  }

  const passwordToken = createVerificationToken();
  const passwordIdentifier = getPasswordResetIdentifier(email);
  const hashedPasswordToken = hashVerificationToken(passwordToken);
  const passwordExpires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        passwordHash: null,
        sessionVersion: { increment: 1 },
      },
    }),
    prisma.verificationToken.deleteMany({ where: { identifier } }),
    prisma.verificationToken.deleteMany({ where: { identifier: passwordIdentifier } }),
    prisma.verificationToken.create({
      data: {
        identifier: passwordIdentifier,
        token: hashedPasswordToken,
        expires: passwordExpires,
      },
    }),
  ]);

  const passwordUrl = new URL('/recuperar-contrasena', trustedOrigin);
  passwordUrl.searchParams.set('email', email);
  passwordUrl.searchParams.set('token', passwordToken);
  passwordUrl.searchParams.set('verification', 'verified');
  return NextResponse.redirect(passwordUrl, 303);
}
