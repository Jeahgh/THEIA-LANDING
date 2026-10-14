import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import ContentActions from '@/components/admin/ContentActions';
import PlanForm from '@/components/admin/PlanForm';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import { createPlan, deletePlan, updatePlan } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Planes',
};

const categoryLabels = {
  RUNNING: 'Running',
  TRIATLON: 'Triatlon',
} as const;

export default async function AdminPlansPage({
  searchParams,
}: {
  searchParams?: Promise<{ guardado?: string; eliminado?: string }>;
}) {
  await requireAdmin('/admin/planes');
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

      <AdminActionStatus saved={params?.guardado} deleted={params?.eliminado} />

      {plans.length === 0 ? (
        <EmptyState tone="admin">No hay planes creados.</EmptyState>
      ) : (
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Planes existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
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
                <ContentActions name={plan.name} title="Editar plan" deleteAction={deletePlan.bind(null, plan.id)}>
                  <PlanForm action={updatePlan.bind(null, plan.id)} plan={plan} submitLabel="Guardar cambios" />
                </ContentActions>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
