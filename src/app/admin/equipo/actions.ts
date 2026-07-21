'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/equipo');
}

const cleanText = (value: FormDataEntryValue | null) => String(value ?? '').trim();

function readAthleteData(formData: FormData) {
  const name = cleanText(formData.get('name'));
  const role = cleanText(formData.get('role')) === 'Entrenador' ? 'Entrenador' : 'Atleta';

  return {
    name,
    role,
    bio: cleanText(formData.get('bio')),
    imageUrl: cleanText(formData.get('imageUrl')) || null,
    imageAlt: name ? `Foto de ${name}` : null,
    achievements: [],
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
  redirect('/admin/equipo?guardado=creado');
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
  redirect('/admin/equipo?guardado=actualizado');
}

export async function deleteAthlete(athleteId: string) {
  await ensureAdmin();

  await prisma.athlete.delete({ where: { id: athleteId } });

  revalidatePath('/');
  revalidatePath('/nosotros');
  revalidatePath('/admin/equipo');
  redirect('/admin/equipo?eliminado=1');
}
