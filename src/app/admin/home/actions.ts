'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/home');
}

const cleanText = (value: FormDataEntryValue | null) => String(value ?? '').trim() || null;

function readSlideData(formData: FormData) {
  const buttonVariant = String(formData.get('buttonVariant') ?? 'primary');

  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim(),
    imageUrl: cleanText(formData.get('imageUrl')),
    ctaText: cleanText(formData.get('ctaText')),
    ctaHref: cleanText(formData.get('ctaHref')),
    buttonVariant: ['primary', 'teal', 'warm', 'outline'].includes(buttonVariant) ? buttonVariant : 'primary',
    isActive: formData.get('isActive') === 'on',
  };
}

export async function createHeroSlide(formData: FormData) {
  await ensureAdmin();
  const lastSlide = await prisma.heroSlide.findFirst({
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.heroSlide.create({
    data: {
      ...readSlideData(formData),
      sortOrder: (lastSlide?.sortOrder ?? 0) + 1,
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/home');
  redirect('/admin/home?guardado=1');
}

export async function updateHeroSlide(slideId: string, formData: FormData) {
  await ensureAdmin();
  await prisma.heroSlide.update({
    where: { id: slideId },
    data: readSlideData(formData),
  });
  revalidatePath('/');
  revalidatePath('/admin/home');
  redirect('/admin/home?guardado=1');
}

export async function deleteHeroSlide(slideId: string) {
  await ensureAdmin();
  await prisma.heroSlide.delete({ where: { id: slideId } });
  revalidatePath('/');
  revalidatePath('/admin/home');
  redirect('/admin/home?eliminado=1');
}

export async function setHeroSlideActive(slideId: string, isActive: boolean) {
  await ensureAdmin();
  await prisma.heroSlide.update({
    where: { id: slideId },
    data: { isActive },
  });
  revalidatePath('/');
  revalidatePath('/admin/home');
}

export async function moveHeroSlide(slideId: string, direction: 'up' | 'down') {
  await ensureAdmin();

  const slides = await prisma.heroSlide.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: { id: true },
  });

  const currentIndex = slides.findIndex((slide) => slide.id === slideId);
  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= slides.length) {
    revalidatePath('/admin/home');
    return;
  }

  const reordered = [...slides];
  [reordered[currentIndex], reordered[targetIndex]] = [reordered[targetIndex], reordered[currentIndex]];

  await prisma.$transaction(
    reordered.map((slide, index) =>
      prisma.heroSlide.update({
        where: { id: slide.id },
        data: { sortOrder: index + 1 },
      })
    )
  );

  revalidatePath('/');
  revalidatePath('/admin/home');
  redirect('/admin/home?guardado=1');
}

export async function reorderHeroSlides(slideIds: string[]) {
  await ensureAdmin();

  await prisma.$transaction(
    slideIds.map((slideId, index) =>
      prisma.heroSlide.update({
        where: { id: slideId },
        data: { sortOrder: index + 1 },
      })
    )
  );

  revalidatePath('/');
  revalidatePath('/admin/home');
}

export async function saveHeroSlidesState(
  slides: Array<{ id: string; isActive: boolean }>,
  deletedIds: string[]
) {
  await ensureAdmin();

  await prisma.$transaction([
    ...(deletedIds.length > 0
      ? [
          prisma.heroSlide.deleteMany({
            where: { id: { in: deletedIds } },
          }),
        ]
      : []),
    ...slides.map((slide, index) =>
      prisma.heroSlide.update({
        where: { id: slide.id },
        data: {
          isActive: slide.isActive,
          sortOrder: index + 1,
        },
      })
    ),
  ]);

  revalidatePath('/');
  revalidatePath('/admin/home');
}
