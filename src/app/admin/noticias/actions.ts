'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { NewsCategory } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/noticias');
}

function readNewsData(formData: FormData) {
  return {
    title: String(formData.get('title') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    date: new Date(`${String(formData.get('date') ?? '').trim()}T12:00:00`),
    category: String(formData.get('category') ?? 'NOTICIAS') as NewsCategory,
    imageUrl: String(formData.get('imageUrl') ?? '').trim() || null,
  };
}

async function readNewsResults(formData: FormData, category: NewsCategory) {
  if (category !== 'RESULTADOS') return [];

  const athleteNames = formData.getAll('resultAthlete');
  const positions = formData.getAll('resultPosition');
  const distances = formData.getAll('resultDistance');
  const times = formData.getAll('resultTime');

  const activeAthletes = await prisma.athlete.findMany({
    where: { isActive: true, role: 'Atleta' },
    select: { name: true },
  });
  const validNames = new Set(activeAthletes.map((athlete) => athlete.name.toLocaleLowerCase('es-CL')));

  return athleteNames.flatMap((athleteName, index) => {
    const result = {
      athleteName: String(athleteName).trim(),
      position: String(positions[index] ?? '').trim(),
      distance: String(distances[index] ?? '').trim(),
      time: String(times[index] ?? '').trim(),
      sortOrder: index,
    };

    const isComplete = result.athleteName && result.position && result.distance && result.time;
    const isExistingAthlete = validNames.has(result.athleteName.toLocaleLowerCase('es-CL'));
    return isComplete && isExistingAthlete ? [result] : [];
  });
}

export async function createNewsPost(formData: FormData) {
  await ensureAdmin();
  const data = readNewsData(formData);
  const lastPost = await prisma.newsPost.findFirst({
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.newsPost.create({
    data: {
      ...data,
      sortOrder: (lastPost?.sortOrder ?? 0) + 1,
      published: true,
      results: { create: await readNewsResults(formData, data.category) },
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/noticias');
  redirect('/admin/noticias?guardado=creado');
}

export async function updateNewsPost(postId: string, formData: FormData) {
  await ensureAdmin();
  const data = readNewsData(formData);
  await prisma.newsPost.update({
    where: { id: postId },
    data: {
      ...data,
      results: {
        deleteMany: {},
        create: await readNewsResults(formData, data.category),
      },
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/noticias');
  redirect('/admin/noticias?guardado=actualizado');
}

export async function deleteNewsPost(postId: string) {
  await ensureAdmin();
  await prisma.newsPost.delete({ where: { id: postId } });
  revalidatePath('/');
  revalidatePath('/admin/noticias');
  redirect('/admin/noticias?eliminado=1');
}
