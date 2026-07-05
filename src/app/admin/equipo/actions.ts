'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/equipo');
}

const cleanText = (value: FormDataEntryValue | null) => String(value ?? '').trim();

const parseLines = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

function readAthleteData(formData: FormData) {
  const name = cleanText(formData.get('name'));

  return {
    name,
    role: cleanText(formData.get('role')),
    bio: cleanText(formData.get('bio')),
    imageUrl: cleanText(formData.get('imageUrl')) || null,
    imageAlt: name ? `Foto de ${name}` : null,
    achievements: parseLines(formData.get('achievements')),
    isActive: formData.get('isActive') === 'on',
  };
}

export async function createAthlete(formData: FormData) {
  await ensureAdmin();

  const lastAthlete = await prisma.athlete.findFirst({
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.athlete.create({
    data: {
      ...readAthleteData(formData),
      sortOrder: (lastAthlete?.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath('/');
  revalidatePath('/nosotros');
  revalidatePath('/admin/equipo');
  redirect('/admin/equipo');
}

export async function updateAthlete(athleteId: string, formData: FormData) {
  await ensureAdmin();

  await prisma.athlete.update({
    where: { id: athleteId },
    data: readAthleteData(formData),
  });

  revalidatePath('/');
  revalidatePath('/nosotros');
  revalidatePath('/admin/equipo');
  redirect('/admin/equipo');
}

export async function deleteAthlete(athleteId: string) {
  await ensureAdmin();

  await prisma.athlete.delete({ where: { id: athleteId } });

  revalidatePath('/');
  revalidatePath('/nosotros');
  revalidatePath('/admin/equipo');
  redirect('/admin/equipo?eliminado=1');
}
