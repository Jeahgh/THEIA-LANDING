import type { TrainingPlan } from '@/types';
import { TRAINING_PLANS } from '@/lib/constants';
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

export async function getTrainingPlans(): Promise<TrainingPlan[]> {
  if (!process.env.DATABASE_URL) {
    return TRAINING_PLANS;
  }

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

    if (plans.length === 0) {
      return TRAINING_PLANS;
    }

    return plans.map((plan) => ({
      id: plan.slug,
      category: plan.category === 'RUNNING' ? 'running' : 'triatlon',
      name: plan.name,
      price: formatPrice(plan.price, plan.currency),
      modality: plan.modality,
      excerpt: plan.excerpt,
      features: plan.features.map((feature) => feature.text),
      imageUrl: plan.imageUrl,
      imageAlt: plan.imageAlt,
    }));
  } catch (error) {
    console.warn('Using static plans fallback:', error);
    return TRAINING_PLANS;
  }
}
