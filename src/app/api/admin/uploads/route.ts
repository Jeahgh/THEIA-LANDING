import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/authz';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const allowedFolders = ['home', 'news', 'plans', 'coaches', 'athletes', 'testimonials', 'competitions'];

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 401 });
  }

  if (user.role !== 'ADMIN') {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 403 });
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

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ success: false, message: 'Formato no soportado. Usa JPG, PNG o WebP.' }, { status: 400 });
  }

  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: 'La imagen no puede superar 4 MB.' }, { status: 400 });
  }

  const extension = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
  const fileName = `${safeName || 'imagen'}-${Date.now()}.${extension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  const publicUrl = `/uploads/${folder}/${fileName}`;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ success: true, imageUrl: publicUrl });
}
