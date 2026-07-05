import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PlanForm from '@/components/admin/PlanForm';
import { updatePlan } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar plan',
};

export default async function EditPlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await prisma.plan.findUnique({
    where: { id },
    include: {
      features: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!plan) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Planes</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Editar plan</h1>
      </div>
      <PlanForm action={updatePlan.bind(null, plan.id)} plan={plan} submitLabel="Guardar cambios" />
    </div>
  );
}
