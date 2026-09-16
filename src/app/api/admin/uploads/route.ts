import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/authz';
import { InvalidImageUploadError, validateImageUpload } from '@/lib/image-upload';
import { consumeRateLimit } from '@/lib/rate-limit';
import { uploadPublicUrl } from '@/lib/uploads';

const allowedFolders = ['home', 'news', 'plans', 'coaches', 'athletes', 'testimonials', 'competitions'];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_MULTIPART_BYTES = MAX_IMAGE_BYTES + 64 * 1024;

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 401 });
  }

  if (user.role !== 'ADMIN') {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_MULTIPART_BYTES) {
    return NextResponse.json({ success: false, message: 'La solicitud es demasiado grande.' }, { status: 413 });
  }

  const uploadLimit = consumeRateLimit({
    scope: 'admin-image-upload',
    identifiers: [user.id],
    limit: 30,
    windowMs: 60 * 60 * 1_000,
  });

  if (!uploadLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Espera antes de subir otra imagen.' },
      { status: 429, headers: { 'Retry-After': String(uploadLimit.retryAfterSeconds) } },
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = String(formData.get('folder') ?? 'home');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, message: 'Debes subir una imagen.' }, { status: 400 });
  }

  if (!allowedFolders.includes(folder)) {
    return NextResponse.json({ success: false, message: 'Carpeta no permitida.' }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ success: false, message: 'La imagen no puede superar 4 MB.' }, { status: 400 });
  }

  try {
    const image = validateImageUpload(
      new Uint8Array(await file.arrayBuffer()),
      file.type,
      MAX_IMAGE_BYTES,
    );
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40);
    const fileName = `${safeName || 'imagen'}-${Date.now()}.${image.extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    const publicUrl = uploadPublicUrl(folder, fileName);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), image.bytes);

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
