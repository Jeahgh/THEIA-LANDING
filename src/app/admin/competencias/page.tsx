import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import RaceForm from '@/components/admin/RaceForm';
import { createRace, deleteRace } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Competencias',
};

export default async function AdminCompetitionsPage({
  searchParams,
}: {
  searchParams: Promise<{ guardado?: string; eliminado?: string }>;
}) {
  const { guardado, eliminado } = await searchParams;
  const races = await prisma.race.findMany({
    orderBy: [{ date: 'asc' }, { sortOrder: 'asc' }],
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Competencias</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Calendario de competencias</h1>
      </div>

      <CreateContentPanel closedLabel="Crear competencia">
        <RaceForm action={createRace} submitLabel="Crear competencia" />
      </CreateContentPanel>

      <AdminActionStatus saved={guardado} deleted={eliminado} />

      {races.length === 0 ? (
        <EmptyState tone="admin">No hay competencias.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-lg theia-card-glow sm:rounded-2xl">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Competencias existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {races.map((race) => (
              <div key={race.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="font-bold text-text-primary">{race.name}</h3>
                  <p className="text-sm text-text-secondary">{race.location} - {race.date.toLocaleDateString('es-CL')}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <Link href={`/admin/competencias/${race.id}`} className="rounded-lg border border-brand-blue px-4 py-2 text-center text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white">
                    Editar
                  </Link>
                  <ConfirmDeleteButton action={deleteRace.bind(null, race.id)} itemName={`la competencia "${race.name}"`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
