import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('avatar');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, message: 'Debes subir una imagen.' }, { status: 400 });
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ success: false, message: 'Formato no soportado. Usa JPG, PNG o WebP.' }, { status: 400 });
  }

  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: 'La imagen no puede superar 2 MB.' }, { status: 400 });
  }

  const extension = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
  const fileName = `${user.id}-${Date.now()}.${extension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
  const publicUrl = `/uploads/profiles/${fileName}`;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));

  await prisma.user.update({
    where: { id: user.id },
    data: { image: publicUrl },
  });

  return NextResponse.json({ success: true, imageUrl: publicUrl });
}
