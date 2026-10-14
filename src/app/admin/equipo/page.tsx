import type { Metadata } from 'next';
import Image from 'next/image';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import AthleteForm from '@/components/admin/AthleteForm';
import ContentActions from '@/components/admin/ContentActions';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import { createAthlete, deleteAthlete, updateAthlete } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Equipo',
};

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams?: Promise<{ guardado?: string; eliminado?: string }>;
}) {
  await requireAdmin('/admin/equipo');
  const params = await searchParams;
  const athletes = await prisma.athlete.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Equipo Theia</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Integrantes publicados</h1>
      </div>

      <CreateContentPanel closedLabel="Agregar" title="Nuevo integrante">
        <AthleteForm action={createAthlete} submitLabel="Crear integrante" />
      </CreateContentPanel>

      <AdminActionStatus saved={params?.guardado} deleted={params?.eliminado} />

      {athletes.length === 0 ? (
        <EmptyState tone="admin">No hay integrantes creados.</EmptyState>
      ) : (
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Integrantes existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {athletes.map((athlete) => (
              <div key={athlete.id} className={`grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center ${athlete.isActive ? '' : 'bg-slate-50/70'}`}>
                <div className={`flex min-w-0 gap-4 transition-opacity ${athlete.isActive ? '' : 'opacity-45 grayscale-[0.5]'}`}>
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-lg font-bold text-brand-blue">
                    {athlete.imageUrl ? (
                      <Image src={athlete.imageUrl} alt={athlete.imageAlt ?? athlete.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      athlete.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-text-primary">{athlete.name}{!athlete.isActive && <span className="sr-only"> (Oculto)</span>}</h3>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-text-muted">{athlete.bio}</p>
                  </div>
                </div>
                <ContentActions name={athlete.name} title="Editar integrante" deleteAction={deleteAthlete.bind(null, athlete.id)}>
                  <AthleteForm action={updateAthlete.bind(null, athlete.id)} athlete={athlete} submitLabel="Guardar cambios" />
                </ContentActions>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
