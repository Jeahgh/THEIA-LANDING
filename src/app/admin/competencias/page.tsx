import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import ContentActions from '@/components/admin/ContentActions';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import EmptyState from '@/components/ui/EmptyState';
import ContentFilters from '@/components/admin/ContentFilters';
import { filterAdminItems, readAdminFilters, type AdminSearchParams, type AdminFilterField } from '@/lib/admin-filters';
import { getClubDate, getRaceStatus } from '@/lib/race-schedule';
import RaceForm from '@/components/admin/RaceForm';
import { createRace, deleteRace, updateRace } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Competencias',
};

export default async function AdminCompetitionsPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  await requireAdmin('/admin/competencias');
  const params = await searchParams;
  const races = await prisma.race.findMany({
    orderBy: [{ date: 'asc' }, { sortOrder: 'asc' }],
  });
  const seasons = [...new Set(races.map((race) => race.season ?? race.date.getUTCFullYear()))].sort((a, b) => b - a);
  const fields: AdminFilterField[] = [
    { name: 'season', label: 'Temporada', allLabel: 'Todas', options: seasons.map((season) => ({ value: String(season), label: String(season) })) },
    { name: 'status', label: 'Estado', allLabel: 'Todos', options: [{ value: 'upcoming', label: 'Próximas' }, { value: 'finished', label: 'Finalizadas' }] },
  ];
  const filters = readAdminFilters(params, fields);
  const today = getClubDate();
  const visibleRaces = filterAdminItems(races, filters, (race) => ({
    text: `${race.name} ${race.location} ${race.distance ?? ''}`,
    values: {
      season: String(race.season ?? race.date.getUTCFullYear()),
      status: getRaceStatus(race.date.toISOString().slice(0, 10), today),
    },
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Competencias</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Calendario de competencias</h1>
      </div>

      <CreateContentPanel closedLabel="Crear competencia">
        <RaceForm action={createRace} submitLabel="Crear competencia" />
      </CreateContentPanel>

      <AdminActionStatus saved={typeof params.guardado === 'string' ? params.guardado : undefined} deleted={typeof params.eliminado === 'string' ? params.eliminado : undefined} />
      <ContentFilters label="competencias" placeholder="Nombre, lugar o distancia" fields={fields} {...filters} />

      {visibleRaces.length === 0 ? (
        <EmptyState tone="admin">{races.length ? 'No hay competencias que coincidan con los filtros.' : 'No hay competencias.'}</EmptyState>
      ) : (
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Competencias existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {visibleRaces.map((race) => (
              <div key={race.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="font-bold text-text-primary">{race.name}</h3>
                  <p className="text-sm text-text-secondary">{race.location} - {race.date.toLocaleDateString('es-CL')}</p>
                  <p className="mt-1 text-xs text-text-muted">Temporada {race.season ?? race.date.getUTCFullYear()}</p>
                </div>
                <ContentActions name={race.name} title="Editar competencia" deleteAction={deleteRace.bind(null, race.id)}>
                  <RaceForm action={updateRace.bind(null, race.id)} race={race} submitLabel="Guardar cambios" />
                </ContentActions>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
