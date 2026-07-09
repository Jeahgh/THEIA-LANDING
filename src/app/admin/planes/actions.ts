'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { PlanCategory } from '@/generated/prisma';
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

const parseFeatures = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .split(/\r?\n/)
    .map((feature) => feature.trim())
    .filter(Boolean);

const defaultPlanImage = (category: PlanCategory) =>
  category === 'TRIATLON' ? '/images/equipo-jersey.png' : '/images/equipo-running.jpg';

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
  const features = parseFeatures(formData.get('features'));
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
      idealFor: cleanText(formData.get('idealFor')) || null,
      price: parsePrice(formData.get('price')),
      imageUrl: defaultPlanImage(category),
      imageAlt: `Imagen de ${name}`,
      sortOrder: (lastPlan?.sortOrder ?? 0) + 1,
      isActive: true,
      ...(features.length > 0
        ? {
            features: {
              create: features.map((text, index) => ({
                text,
                sortOrder: index + 1,
              })),
            },
          }
        : {}),
    },
  });

  revalidatePath('/planes');
  revalidatePath('/admin/planes');
  redirect('/admin/planes');
}

export async function updatePlan(planId: string, formData: FormData) {
  await ensureAdmin();

  const name = cleanText(formData.get('name'));
  const category = String(formData.get('category') ?? 'RUNNING') as PlanCategory;
  const features = parseFeatures(formData.get('features'));
  const slug = await buildUniqueSlug(name, planId);

  await prisma.$transaction(async (tx) => {
    await tx.plan.update({
      where: { id: planId },
      data: {
        slug,
        category,
        name,
        modality: cleanText(formData.get('modality')),
        excerpt: cleanText(formData.get('excerpt')),
        idealFor: cleanText(formData.get('idealFor')) || null,
        price: parsePrice(formData.get('price')),
        imageAlt: `Imagen de ${name}`,
      },
    });

    await tx.planFeature.deleteMany({ where: { planId } });

    if (features.length > 0) {
      await tx.planFeature.createMany({
        data: features.map((text, index) => ({
          planId,
          text,
          sortOrder: index + 1,
        })),
      });
    }
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
