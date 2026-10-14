import {
  createVerificationToken,
  getPasswordResetIdentifier,
  getTrustedAppOrigin,
  hashVerificationToken,
  sendPasswordResetEmail,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

export async function sendUserPasswordReset(user: { email: string; name: string | null }) {
  const origin = getTrustedAppOrigin();
  if (!origin) throw new Error('password_reset_origin_missing');

  const token = createVerificationToken();
  const identifier = getPasswordResetIdentifier(user.email);
  const hashedToken = hashVerificationToken(token);
  const resetUrl = new URL('/recuperar-contrasena', origin);
  resetUrl.searchParams.set('email', user.email);
  resetUrl.searchParams.set('token', token);

  await prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { identifier } }),
    prisma.verificationToken.create({
      data: { identifier, token: hashedToken, expires: new Date(Date.now() + 60 * 60 * 1000) },
    }),
  ]);

  try {
    return await sendPasswordResetEmail({ to: user.email, name: user.name, resetUrl: resetUrl.toString() });
  } catch (error) {
    // A failed delivery must not leave a usable recovery link behind.
    await prisma.verificationToken.deleteMany({ where: { identifier, token: hashedToken } });
    throw error;
  }
}
