import { NextResponse } from 'next/server';
import {
  createVerificationToken,
  getEmailVerificationIdentifier,
  getTrustedAppOrigin,
  hashVerificationToken,
  sendVerificationEmail,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';
import { consumeRateLimit, getClientAddress } from '@/lib/rate-limit';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').toLowerCase().trim();

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ success: false, message: 'Ingresa tu nombre.' }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Ingresa un email valido.' }, { status: 400 });
    }

    const clientAddress = getClientAddress(request.headers);
    const emailLimit = consumeRateLimit({
      scope: 'email-registration',
      identifiers: [email],
      limit: 5,
      windowMs: 60 * 60 * 1_000,
    });
    const addressLimit = consumeRateLimit({
      scope: 'address-registration',
      identifiers: [clientAddress],
      limit: 20,
      windowMs: 60 * 60 * 1_000,
    });

    if (!emailLimit.allowed || !addressLimit.allowed) {
      const retryAfter = Math.max(
        emailLimit.retryAfterSeconds,
        addressLimit.retryAfterSeconds,
      );

      return NextResponse.json(
        { success: false, message: 'Espera antes de solicitar otro correo.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        emailVerified: true,
        accounts: { select: { id: true }, take: 1 },
      },
    });

    if (existingUser?.emailVerified || existingUser?.accounts.length) {
      return NextResponse.json({ success: false, message: 'Ya existe una cuenta con ese email.' }, { status: 409 });
    }

    const token = createVerificationToken();
    const identifier = getEmailVerificationIdentifier(email);
    const hashedToken = hashVerificationToken(token);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const origin = getTrustedAppOrigin();

    if (!origin) {
      return NextResponse.json(
        { success: false, message: 'Falta configurar la URL publica de la app.' },
        { status: 500 },
      );
    }

    const verificationUrl = new URL('/api/auth/verify-email', origin);

    verificationUrl.searchParams.set('email', email);
    verificationUrl.searchParams.set('token', token);

    if (existingUser) {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: existingUser.id },
          data: { passwordHash: null, sessionVersion: { increment: 1 } },
        }),
        prisma.verificationToken.deleteMany({ where: { identifier } }),
        prisma.verificationToken.create({
          data: { identifier, token: hashedToken, expires },
        }),
      ]);
    } else {
      await prisma.$transaction([
        prisma.user.create({
          data: {
            name,
            email,
          },
        }),
        prisma.verificationToken.deleteMany({ where: { identifier } }),
        prisma.verificationToken.create({
          data: { identifier, token: hashedToken, expires },
        }),
      ]);
    }

    let emailSent = false;

    try {
      emailSent = await sendVerificationEmail({
        to: email,
        name: existingUser?.name ?? name,
        verificationUrl: verificationUrl.toString(),
      });
    } catch (emailError) {
      console.error('Register verification email error:', emailError);
    }

    if (!emailSent) {
      const isDevelopment = process.env.NODE_ENV !== 'production';

      return NextResponse.json(
        {
          success: isDevelopment,
          emailSent: false,
          message: isDevelopment
            ? 'Cuenta pendiente. Abre el enlace mostrado en la consola local.'
            : 'No pudimos enviar la verificacion. Reintenta cuando el correo este disponible.',
        },
        { status: isDevelopment ? 200 : 503 },
      );
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: existingUser
        ? 'Te enviamos un nuevo correo de verificacion.'
        : 'Cuenta creada. Verifica tu correo para elegir una contrasena.',
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'No pudimos crear la cuenta. Revisa la conexion a PostgreSQL.' },
      { status: 500 },
    );
  }
}
