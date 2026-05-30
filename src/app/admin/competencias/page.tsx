import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import TimedStatusMessage from '@/components/admin/TimedStatusMessage';
import { createRace, deleteRace } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Competencias',
};

export default async function AdminCompetitionsPage({
  searchParams,
}: {
  searchParams: Promise<{ eliminado?: string }>;
}) {
  const { eliminado } = await searchParams;
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
        <form action={createRace} className="rounded-lg border border-border-subtle bg-white p-4 shadow-lg shadow-brand-blue/8 sm:rounded-2xl sm:p-6">
          <h2 className="text-lg font-bold text-text-primary sm:text-xl">Nueva competencia</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input name="name" placeholder="Nombre" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" required />
            <input name="location" placeholder="Ubicacion" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" required />
            <input name="date" type="date" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" required />
            <input name="distance" placeholder="Distancia" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" />
            <select name="type" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl">
              <option value="TRIATLON">Triatlon</option>
              <option value="DUATLON">Duatlon</option>
              <option value="ACUATLON">Acuatlon</option>
              <option value="RUNNING">Running</option>
              <option value="CICLISMO">Ciclismo</option>
              <option value="NATACION">Natacion</option>
            </select>
            <select name="status" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl">
              <option value="UPCOMING">Proximamente</option>
              <option value="REGISTRATION_OPEN">Inscripciones abiertas</option>
              <option value="REGISTRATION_CLOSED">Inscripciones cerradas</option>
              <option value="FINISHED">Finalizada</option>
            </select>
            <input name="registrationUrl" placeholder="Link inscripcion" className="rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl md:col-span-2" />
          </div>
          <textarea name="description" placeholder="Descripcion" className="mt-4 min-h-24 w-full rounded-lg border border-border-subtle px-4 py-3 sm:rounded-xl" />
          <button className="mt-6 w-full rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-vivid sm:w-auto sm:rounded-xl">
            Crear competencia
          </button>
        </form>
      </CreateContentPanel>

      {eliminado && <TimedStatusMessage message="Se ha borrado correctamente." />}

      <div className="overflow-hidden rounded-lg border border-border-subtle bg-white shadow-lg shadow-brand-blue/8 sm:rounded-2xl">
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-text-primary sm:text-xl">Competencias existentes</h2>
        </div>
        <div className="divide-y divide-border-subtle">
          {races.length === 0 && <p className="px-4 py-5 text-text-muted sm:px-6">No hay competencias.</p>}
          {races.map((race) => (
            <div key={race.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="font-bold text-text-primary">{race.name}</h3>
                <p className="text-sm text-text-secondary">{race.location} - {race.date.toLocaleDateString('es-CL')} - {race.status}</p>
              </div>
              <ConfirmDeleteButton action={deleteRace.bind(null, race.id)} itemName={`la competencia "${race.name}"`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
