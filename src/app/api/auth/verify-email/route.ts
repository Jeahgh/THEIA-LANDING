import { NextResponse, type NextRequest } from 'next/server';
import { getEmailVerificationIdentifier, hashVerificationToken } from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')?.toLowerCase().trim();
  const token = request.nextUrl.searchParams.get('token')?.trim();
  const redirectUrl = new URL('/perfil', request.nextUrl.origin);

  if (!email || !token) {
    redirectUrl.searchParams.set('verification', 'invalid');
    return NextResponse.redirect(redirectUrl);
  }

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

  if (!verificationToken) {
    redirectUrl.searchParams.set('verification', 'invalid');
    return NextResponse.redirect(redirectUrl);
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
    redirectUrl.searchParams.set('verification', 'expired');
    return NextResponse.redirect(redirectUrl);
  }

  await prisma.$transaction([
    prisma.user.updateMany({
      where: { email },
      data: { emailVerified: new Date() },
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

  redirectUrl.searchParams.set('verification', 'verified');
  return NextResponse.redirect(redirectUrl);
}
