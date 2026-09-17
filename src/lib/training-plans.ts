import type { TrainingPlan } from '@/types';
import { unstable_cache } from 'next/cache';
import { PUBLIC_CACHE_TAGS, PUBLIC_CONTENT_REVALIDATE_SECONDS } from '@/lib/cache-tags';
import { prisma } from '@/lib/prisma';

const formatPrice = (amount: number, currency: string) => {
  if (currency === 'CLP') {
    return `$${amount.toLocaleString('es-CL')}`;
  }

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
  }).format(amount);
};

const oldDefaultPlanImage = '/images/atletas-collage.jpg';

const getCachedTrainingPlans = unstable_cache(
  async () => {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        slug: true,
        category: true,
        name: true,
        price: true,
        currency: true,
        modality: true,
        excerpt: true,
        idealFor: true,
        imageUrl: true,
        imageAlt: true,
        features: {
          orderBy: { sortOrder: 'asc' },
          select: { text: true },
        },
      },
    });

    return plans.map((plan): TrainingPlan => ({
      id: plan.slug,
      category: plan.category === 'RUNNING' ? 'running' : 'triatlon',
      name: plan.name,
      price: formatPrice(plan.price, plan.currency),
      modality: plan.modality,
      excerpt: plan.excerpt,
      idealFor: plan.idealFor ?? '',
      features: plan.features.map((feature) => feature.text),
      imageUrl: plan.imageUrl === oldDefaultPlanImage ? '' : plan.imageUrl || '',
      imageAlt: plan.imageAlt || `Imagen de ${plan.name}`,
    }));
  },
  ['active-training-plans'],
  {
    tags: [PUBLIC_CACHE_TAGS.plans],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

export async function getTrainingPlans(): Promise<TrainingPlan[]> {
  try {
    return await getCachedTrainingPlans();
  } catch {
    return [];
  }
}
