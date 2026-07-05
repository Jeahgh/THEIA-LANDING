import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import PlanForm from '@/components/admin/PlanForm';
import TimedStatusMessage from '@/components/admin/TimedStatusMessage';
import { createPlan, deletePlan } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Planes',
};

const categoryLabels = {
  RUNNING: 'Running',
  TRIATLON: 'Triatlon',
} as const;

export default async function AdminPlansPage({
  searchParams,
}: {
  searchParams?: Promise<{ eliminado?: string }>;
}) {
  const params = await searchParams;
  const plans = await prisma.plan.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    include: {
      features: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Planes</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Planes de entrenamiento</h1>
      </div>

      <CreateContentPanel closedLabel="Crear plan">
        <PlanForm action={createPlan} submitLabel="Crear plan" />
      </CreateContentPanel>

      {params?.eliminado && <TimedStatusMessage message="Se ha borrado correctamente." />}

      <div className="overflow-hidden rounded-lg theia-card-glow">
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-text-primary sm:text-xl">Planes existentes</h2>
        </div>
        <div className="divide-y divide-border-subtle">
          {plans.length === 0 && <p className="px-4 py-5 text-text-muted sm:px-6">No hay planes creados.</p>}
          {plans.map((plan) => (
            <div key={plan.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-text-primary">{plan.name}</h3>
                  <span className="rounded-full bg-brand-blue-pale px-2 py-0.5 text-xs font-semibold text-brand-blue">
                    {categoryLabels[plan.category]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">${plan.price.toLocaleString('es-CL')} CLP - {plan.modality}</p>
                <p className="mt-1 line-clamp-1 text-sm text-text-muted">{plan.excerpt}</p>
                {plan.idealFor && (
                  <p className="mt-1 line-clamp-1 text-xs font-medium text-brand-navy/70">Ideal para: {plan.idealFor}</p>
                )}
                <p className="mt-1 text-xs text-text-muted">{plan.features.length} caracteristicas</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end">
                <Link
                  href={`/admin/planes/${plan.id}`}
                  className="rounded-lg border border-brand-blue px-4 py-2 text-center text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                >
                  Editar
                </Link>
                <ConfirmDeleteButton action={deletePlan.bind(null, plan.id)} itemName={`el plan "${plan.name}"`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
