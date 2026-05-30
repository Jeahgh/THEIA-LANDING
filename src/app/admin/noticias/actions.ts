'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { NewsCategory } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/admin/noticias');
  if (session.user.role !== 'ADMIN') redirect('/');
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

export async function createNewsPost(formData: FormData) {
  await ensureAdmin();
  const lastPost = await prisma.newsPost.findFirst({
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.newsPost.create({
    data: {
      ...readNewsData(formData),
      sortOrder: (lastPost?.sortOrder ?? 0) + 1,
      published: true,
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/noticias');
  redirect('/admin/noticias');
}

export async function updateNewsPost(postId: string, formData: FormData) {
  await ensureAdmin();
  await prisma.newsPost.update({
    where: { id: postId },
    data: readNewsData(formData),
  });
  revalidatePath('/');
  revalidatePath('/admin/noticias');
  redirect('/admin/noticias');
}

export async function deleteNewsPost(postId: string) {
  await ensureAdmin();
  await prisma.newsPost.delete({ where: { id: postId } });
  revalidatePath('/');
  revalidatePath('/admin/noticias');
  redirect('/admin/noticias?eliminado=1');
}
