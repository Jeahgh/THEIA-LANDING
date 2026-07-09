'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { RaceStatus, RaceType } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/competencias');
}

function readRaceData(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    date: new Date(`${String(formData.get('date') ?? '').trim()}T12:00:00`),
    location: String(formData.get('location') ?? '').trim(),
    type: String(formData.get('type') ?? 'TRIATLON') as RaceType,
    status: String(formData.get('status') ?? 'UPCOMING') as RaceStatus,
    distance: String(formData.get('distance') ?? '').trim() || null,
    description: String(formData.get('description') ?? '').trim() || null,
    registrationUrl: String(formData.get('registrationUrl') ?? '').trim() || null,
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
      isActive: true,
    },
  });
  revalidatePath('/');
  revalidatePath('/competencias');
  revalidatePath('/admin/competencias');
  redirect('/admin/competencias');
}

export async function deleteRace(raceId: string) {
  await ensureAdmin();
  await prisma.race.delete({ where: { id: raceId } });
  revalidatePath('/');
  revalidatePath('/competencias');
  revalidatePath('/admin/competencias');
  redirect('/admin/competencias?eliminado=1');
}
