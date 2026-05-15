// =============================================================================
// API Route: /api/contact
// =============================================================================
// Endpoint POST para recibir mensajes del formulario de contacto.
// Actualmente valida y devuelve respuesta de éxito.
// Cuando conectes PostgreSQL, descomenta las líneas de Prisma para
// guardar los mensajes en la base de datos.
//
// Uso:
//   POST /api/contact
//   Body: { name: string, email: string, message: string }
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // Descomentar cuando conectes la DB

/**
 * Maneja las solicitudes POST al formulario de contacto.
 * Valida los datos, y opcionalmente los guarda en la base de datos.
 */
export async function POST(request: NextRequest) {
  try {
    // Parsear el body de la solicitud
    const body = await request.json();
    const { name, email, message } = body;

    // ----------------------------------------------------------------
    // Validación de campos obligatorios
    // ----------------------------------------------------------------
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Todos los campos son obligatorios (name, email, message).',
        },
        { status: 400 }
      );
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'El formato del email no es válido.',
        },
        { status: 400 }
      );
    }

    // Validación de longitud mínima
    if (name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: 'El nombre debe tener al menos 2 caracteres.',
        },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: 'El mensaje debe tener al menos 10 caracteres.',
        },
        { status: 400 }
      );
    }

    // ----------------------------------------------------------------
    // Guardar en base de datos (descomentar cuando PostgreSQL esté configurado)
    // ----------------------------------------------------------------
    // const contactMessage = await prisma.contactMessage.create({
    //   data: {
    //     name: name.trim(),
    //     email: email.trim().toLowerCase(),
    //     message: message.trim(),
    //   },
    // });
    //
    // console.log('Mensaje guardado:', contactMessage.id);

    // Log temporal mientras no hay DB
    console.log('📩 Nuevo mensaje de contacto:', {
      name: name.trim(),
      email: email.trim(),
      message: message.trim().substring(0, 50) + '...',
      timestamp: new Date().toISOString(),
    });

    // ----------------------------------------------------------------
    // Respuesta exitosa
    // ----------------------------------------------------------------
    return NextResponse.json(
      {
        success: true,
        message: '¡Mensaje recibido con éxito! Te contactaremos pronto.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor. Por favor intenta de nuevo.',
      },
      { status: 500 }
    );
  }
}
