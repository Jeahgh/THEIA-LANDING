import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import ContentActions from '@/components/admin/ContentActions';
import PlanForm from '@/components/admin/PlanForm';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import ContentFilters from '@/components/admin/ContentFilters';
import { filterAdminItems, readAdminFilters, type AdminSearchParams, type AdminFilterField } from '@/lib/admin-filters';
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
  searchParams?: Promise<AdminSearchParams>;
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
  const fields: AdminFilterField[] = [
    { name: 'category', label: 'Categoría', allLabel: 'Todas', options: [{ value: 'RUNNING', label: 'Running' }, { value: 'TRIATLON', label: 'Triatlón' }] },
  ];
  const filters = readAdminFilters(params, fields);
  const visiblePlans = filterAdminItems(plans, filters, (plan) => ({ text: `${plan.name} ${plan.modality}`, values: { category: plan.category } }));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Planes</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Planes de entrenamiento</h1>
      </div>

      <CreateContentPanel closedLabel="Crear plan">
        <PlanForm action={createPlan} submitLabel="Crear plan" />
      </CreateContentPanel>

      <AdminActionStatus saved={typeof params?.guardado === 'string' ? params.guardado : undefined} deleted={typeof params?.eliminado === 'string' ? params.eliminado : undefined} />
      <ContentFilters label="planes" placeholder="Nombre o modalidad" fields={fields} {...filters} />

      {visiblePlans.length === 0 ? (
        <EmptyState tone="admin">{plans.length ? 'No hay planes que coincidan con los filtros.' : 'No hay planes creados.'}</EmptyState>
      ) : (
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Planes existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {visiblePlans.map((plan) => (
              <div key={plan.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-text-primary">{plan.name}</h3>
                    <span className="rounded-full bg-brand-blue-pale px-2 py-0.5 text-xs font-semibold text-brand-blue">
                      {categoryLabels[plan.category]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary [overflow-wrap:anywhere]">${plan.price.toLocaleString('es-CL')} CLP - {plan.modality}</p>
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
