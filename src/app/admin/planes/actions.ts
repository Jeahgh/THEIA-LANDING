'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { PlanCategory } from '@prisma/client';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/planes');
}

const cleanText = (value: FormDataEntryValue | null) => String(value ?? '').trim();

const parsePrice = (value: FormDataEntryValue | null) => {
  const price = Number(String(value ?? '').replace(/\D/g, ''));
  return Number.isFinite(price) ? price : 0;
};

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'plan';

async function buildUniqueSlug(name: string, currentPlanId?: string) {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 2;

  while (
    await prisma.plan.findFirst({
      where: {
        slug,
        ...(currentPlanId ? { NOT: { id: currentPlanId } } : {}),
      },
      select: { id: true },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function createPlan(formData: FormData) {
  await ensureAdmin();

  const name = cleanText(formData.get('name'));
  const category = String(formData.get('category') ?? 'RUNNING') as PlanCategory;
  const lastPlan = await prisma.plan.findFirst({
    where: { category },
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.plan.create({
    data: {
      slug: await buildUniqueSlug(name),
      category,
      name,
      modality: cleanText(formData.get('modality')),
      excerpt: cleanText(formData.get('excerpt')),
      price: parsePrice(formData.get('price')),
      imageUrl: cleanText(formData.get('imageUrl')),
      imageAlt: `Imagen de ${name}`,
      sortOrder: (lastPlan?.sortOrder ?? 0) + 1,
      isActive: true,
    },
  });

  revalidatePath('/planes');
  revalidatePath('/admin/planes');
  redirect('/admin/planes');
}

export async function updatePlan(planId: string, formData: FormData) {
  await ensureAdmin();

  const name = cleanText(formData.get('name'));

  await prisma.plan.update({
    where: { id: planId },
    data: {
      slug: await buildUniqueSlug(name, planId),
      category: String(formData.get('category') ?? 'RUNNING') as PlanCategory,
      name,
      modality: cleanText(formData.get('modality')),
      excerpt: cleanText(formData.get('excerpt')),
      price: parsePrice(formData.get('price')),
      imageUrl: cleanText(formData.get('imageUrl')),
      imageAlt: `Imagen de ${name}`,
    },
  });

  revalidatePath('/planes');
  revalidatePath('/admin/planes');
  redirect('/admin/planes');
}

export async function deletePlan(planId: string) {
  await ensureAdmin();
  await prisma.plan.delete({ where: { id: planId } });
  revalidatePath('/planes');
  revalidatePath('/admin/planes');
  redirect('/admin/planes?eliminado=1');
}
