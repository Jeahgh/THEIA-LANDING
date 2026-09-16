import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/authz';
import { InvalidImageUploadError, validateImageUpload } from '@/lib/image-upload';
import { prisma } from '@/lib/prisma';
import { consumeRateLimit } from '@/lib/rate-limit';
import { uploadPublicUrl } from '@/lib/uploads';

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const MAX_MULTIPART_BYTES = MAX_AVATAR_BYTES + 64 * 1024;

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 401 });
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_MULTIPART_BYTES) {
    return NextResponse.json({ success: false, message: 'La solicitud es demasiado grande.' }, { status: 413 });
  }

  const uploadLimit = consumeRateLimit({
    scope: 'user-avatar-upload',
    identifiers: [user.id],
    limit: 5,
    windowMs: 10 * 60 * 1_000,
  });

  if (!uploadLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Espera antes de subir otra imagen.' },
      { status: 429, headers: { 'Retry-After': String(uploadLimit.retryAfterSeconds) } },
    );
  }

  const formData = await request.formData();
  const file = formData.get('avatar');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, message: 'Debes subir una imagen.' }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_AVATAR_BYTES) {
    return NextResponse.json({ success: false, message: 'La imagen no puede superar 2 MB.' }, { status: 400 });
  }

  try {
    const image = validateImageUpload(
      new Uint8Array(await file.arrayBuffer()),
      file.type,
      MAX_AVATAR_BYTES,
    );
    // Un nombre estable por usuario y formato evita crecimiento ilimitado del
    // directorio. El query versiona la URL sin crear un archivo nuevo.
    const fileName = `${user.id}.${image.extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
    const publicUrl = `${uploadPublicUrl('profiles', fileName)}?v=${Date.now()}`;

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), image.bytes);

    await prisma.user.update({
      where: { id: user.id },
      data: { image: publicUrl },
    });

    return NextResponse.json({ success: true, imageUrl: publicUrl });
  } catch (error) {
    if (error instanceof InvalidImageUploadError) {
      return NextResponse.json(
        { success: false, message: 'La imagen no es un JPG, PNG o WebP valido.' },
        { status: 415 },
      );
    }

    throw error;
  }
}
