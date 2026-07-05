import type { TrainingPlan } from '@/types';
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

export async function getTrainingPlans(): Promise<TrainingPlan[]> {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
      include: {
        features: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return plans.map((plan) => ({
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
  } catch {
    return [];
  }
}
