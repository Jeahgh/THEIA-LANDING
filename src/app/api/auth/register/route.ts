import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
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

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 12),
      },
    });

    return NextResponse.json({ success: true, message: 'Cuenta creada correctamente.' });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'No pudimos crear la cuenta. Revisa la conexion a PostgreSQL.' },
      { status: 500 },
    );
  }
}
