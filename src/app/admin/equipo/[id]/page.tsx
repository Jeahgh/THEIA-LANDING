import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AthleteForm from '@/components/admin/AthleteForm';
import { updateAthlete } from '../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar atleta',
};

export default async function EditAthletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const athlete = await prisma.athlete.findUnique({ where: { id } });

  if (!athlete) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Equipo Theia</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Editar atleta</h1>
      </div>
      <AthleteForm action={updateAthlete.bind(null, athlete.id)} athlete={athlete} submitLabel="Guardar cambios" />
    </div>
  );
}
