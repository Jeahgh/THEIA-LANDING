'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import type { RaceType } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { getSafeExternalHttpsUrl } from '@/lib/external-url';
import { prisma } from '@/lib/prisma';
import { PUBLIC_CACHE_TAGS } from '@/lib/cache-tags';

async function ensureAdmin() {
  await requireAdmin('/admin/competencias');
}

function readRaceData(formData: FormData) {
  const date = new Date(`${String(formData.get('date') ?? '').trim()}T12:00:00`);
  const seasonValue = String(formData.get('season') ?? '').trim();
  const season = seasonValue ? Number(seasonValue) : date.getFullYear();
  const imageUrl = String(formData.get('imageUrl') ?? '').trim() || null;

  if (!Number.isFinite(date.getTime()) || !Number.isInteger(season) || season < 1000 || season > 9999) {
    throw new Error('Revisa la fecha y la temporada de la competencia.');
  }
  if (imageUrl && !/^\/(?:api\/)?uploads\/competitions\/[a-z0-9][a-z0-9._-]*\.(?:jpe?g|png|webp)$/i.test(imageUrl)) {
    throw new Error('Selecciona una imagen de competencia válida.');
  }

  return {
    name: String(formData.get('name') ?? '').trim(),
    date,
    season,
    imageUrl,
    location: String(formData.get('location') ?? '').trim(),
    type: String(formData.get('type') ?? 'TRIATLON') as RaceType,
    distance: String(formData.get('distance') ?? '').trim() || null,
    description: String(formData.get('description') ?? '').trim() || null,
    registrationUrl: getSafeExternalHttpsUrl(formData.get('registrationUrl')),
    isActive: formData.get('isActive') === 'on',
  };
}

export async function createRace(formData: FormData) {
  await ensureAdmin();
  const lastRace = await prisma.race.findFirst({
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.race.create({
    data: {
      ...readRaceData(formData),
      sortOrder: (lastRace?.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath('/');
  revalidatePath('/competencias');
  revalidatePath('/admin/competencias');
  updateTag(PUBLIC_CACHE_TAGS.races);
  if (formData.get('_dialog') !== 'on') redirect('/admin/competencias?guardado=creado');
}

export async function updateRace(raceId: string, formData: FormData) {
  await ensureAdmin();
  await prisma.race.update({
    where: { id: raceId },
    data: readRaceData(formData),
  });
  revalidatePath('/');
  revalidatePath('/competencias');
  revalidatePath('/admin/competencias');
  updateTag(PUBLIC_CACHE_TAGS.races);
  if (formData.get('_dialog') !== 'on') redirect('/admin/competencias?guardado=actualizado');
}

export async function deleteRace(raceId: string) {
  await ensureAdmin();
  await prisma.race.delete({ where: { id: raceId } });
  revalidatePath('/');
  revalidatePath('/competencias');
  revalidatePath('/admin/competencias');
  updateTag(PUBLIC_CACHE_TAGS.races);
  redirect('/admin/competencias?eliminado=1');
}
