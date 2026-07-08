import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AthleteForm from '@/components/admin/AthleteForm';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import CreateContentPanel from '@/components/admin/CreateContentPanel';
import TimedStatusMessage from '@/components/admin/TimedStatusMessage';
import EmptyState from '@/components/ui/EmptyState';
import { createAthlete, deleteAthlete } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Equipo Theia',
};

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams?: Promise<{ eliminado?: string }>;
}) {
  const params = await searchParams;
  const athletes = await prisma.athlete.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Equipo Theia</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Atletas publicados</h1>
      </div>

      <CreateContentPanel closedLabel="Agregar atleta">
        <AthleteForm action={createAthlete} submitLabel="Crear atleta" />
      </CreateContentPanel>

      {params?.eliminado && <TimedStatusMessage message="Se ha borrado correctamente." />}

      {athletes.length === 0 ? (
        <EmptyState tone="admin">No hay atletas creados.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-lg theia-card-glow sm:rounded-2xl">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Atletas existentes</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {athletes.map((athlete) => (
              <div key={athlete.id} className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex min-w-0 gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-lg font-bold text-brand-blue">
                    {athlete.imageUrl ? (
                      <Image src={athlete.imageUrl} alt={athlete.imageAlt ?? athlete.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      athlete.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-text-primary">{athlete.name}</h3>
                      <span className="rounded-full bg-brand-blue-pale px-2 py-0.5 text-xs font-semibold text-brand-blue">{athlete.role}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${athlete.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {athlete.isActive ? 'Visible' : 'Oculto'}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-text-muted">{athlete.bio}</p>
                    <p className="mt-1 text-xs text-text-muted">{athlete.achievements.length} logros o etiquetas</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end">
                  <Link
                    href={`/admin/equipo/${athlete.id}`}
                    className="rounded-lg border border-brand-blue px-4 py-2 text-center text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    Editar
                  </Link>
                  <ConfirmDeleteButton action={deleteAthlete.bind(null, athlete.id)} itemName={`el atleta "${athlete.name}"`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
