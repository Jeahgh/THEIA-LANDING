import { NextRequest, NextResponse } from 'next/server';
import { CLUB_INFO } from '@/lib/constants';
import { sendEmail } from '@/lib/email-verification';

export const runtime = 'nodejs';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanField(value: unknown) {
  return String(value ?? '').trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanSubjectValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = cleanField(body.name);
    const email = cleanField(body.email).toLowerCase();
    const message = cleanField(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'El formato del email no es valido.' },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'El nombre debe tener al menos 2 caracteres.' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'El mensaje debe tener al menos 10 caracteres.' },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const emailSent = await sendEmail({
      to: CLUB_INFO.email,
      replyTo: email,
      subject: `Nuevo mensaje de contacto - ${cleanSubjectValue(name)}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h1 style="margin:0 0 16px">Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="padding:14px 16px;border-radius:12px;background:#f1f5f9">
            ${safeMessage}
          </div>
        </div>
      `,
      text: `Nuevo mensaje de contacto\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      logLabel: 'contact-form',
      devUrl: `Mensaje de ${name} <${email}>: ${message}`,
    });

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: 'El correo de contacto no esta configurado.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Mensaje enviado con exito' }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json(
      { success: false, message: 'No pudimos enviar el mensaje. Intenta nuevamente.' },
      { status: 500 }
    );
  }
}
