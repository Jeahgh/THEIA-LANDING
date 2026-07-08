import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import {
  createVerificationToken,
  getEmailVerificationIdentifier,
  getTrustedAppOrigin,
  hashVerificationToken,
  sendVerificationEmail,
} from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').toLowerCase().trim();
    const password = String(body.password ?? '');
    const confirmPassword = String(body.confirmPassword ?? '');

    if (name.length < 2) {
      return NextResponse.json({ success: false, message: 'Ingresa tu nombre.' }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Ingresa un email valido.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Las contraseñas no coinciden.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
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

    await prisma.$transaction([
      prisma.user.create({
        data: {
          name,
          email,
          passwordHash: await hash(password, 12),
        },
      }),
      prisma.verificationToken.deleteMany({ where: { identifier } }),
      prisma.verificationToken.create({
        data: {
          identifier,
          token: hashedToken,
          expires,
        },
      }),
    ]);

    let emailSent = false;

    try {
      emailSent = await sendVerificationEmail({
        to: email,
        name,
        verificationUrl: verificationUrl.toString(),
      });
    } catch (emailError) {
      console.error('Register verification email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent
        ? 'Cuenta creada. Te enviamos un correo de verificacion.'
        : 'Cuenta creada. No pudimos enviar la verificacion automaticamente.',
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'No pudimos crear la cuenta. Revisa la conexion a PostgreSQL.' },
      { status: 500 },
    );
  }
}
