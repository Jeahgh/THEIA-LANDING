import { unstable_cache } from 'next/cache';
import { PUBLIC_CACHE_TAGS, PUBLIC_CONTENT_REVALIDATE_SECONDS } from '@/lib/cache-tags';
import { prisma } from '@/lib/prisma';

const getCachedTestimonials = unstable_cache(
  async () =>
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        name: true,
        role: true,
        quote: true,
        imageUrl: true,
      },
    }),
  ['active-testimonials'],
  {
    tags: [PUBLIC_CACHE_TAGS.testimonials],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

export async function getActiveTestimonials() {
  try {
    return await getCachedTestimonials();
  } catch {
    return [];
  }
}

