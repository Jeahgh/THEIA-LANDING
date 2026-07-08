'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  await requireAdmin('/admin/testimonios');
}

const cleanText = (value: FormDataEntryValue | null) => String(value ?? '').trim();

function readTestimonialData(formData: FormData) {
  return {
    name: cleanText(formData.get('name')),
    role: cleanText(formData.get('role')),
    quote: cleanText(formData.get('quote')),
    imageUrl: cleanText(formData.get('imageUrl')) || null,
    isActive: formData.get('isActive') === 'on',
  };
}

export async function createTestimonial(formData: FormData) {
  await ensureAdmin();

  const lastTestimonial = await prisma.testimonial.findFirst({
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  await prisma.testimonial.create({
    data: {
      ...readTestimonialData(formData),
      sortOrder: (lastTestimonial?.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/testimonios');
  redirect('/admin/testimonios');
}

export async function updateTestimonial(testimonialId: string, formData: FormData) {
  await ensureAdmin();

  await prisma.testimonial.update({
    where: { id: testimonialId },
    data: readTestimonialData(formData),
  });

  revalidatePath('/');
  revalidatePath('/admin/testimonios');
  redirect('/admin/testimonios');
}

export async function deleteTestimonial(testimonialId: string) {
  await ensureAdmin();

  await prisma.testimonial.delete({ where: { id: testimonialId } });

  revalidatePath('/');
  revalidatePath('/admin/testimonios');
  redirect('/admin/testimonios?eliminado=1');
}
