import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RaceForm from '@/components/admin/RaceForm';
import { updateRace } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar competencia',
};

export default async function EditCompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const race = await prisma.race.findUnique({ where: { id } });
  if (!race) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Competencias</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Editar competencia</h1>
      </div>
      <RaceForm action={updateRace.bind(null, race.id)} race={race} submitLabel="Guardar cambios" />
    </div>
  );
}
