import type { Metadata } from 'next';
import Image from 'next/image';
import { getActiveRaces } from '@/lib/races';
import SectionTitle from '@/components/ui/SectionTitle';
import EventCard from '@/components/competencias/EventCard';

export const metadata: Metadata = {
  title: 'Competencias',
  description: 'Calendario de competencias de triatlón, duatlón, acuatlón y más con Theia Triathlon Performance.',
};

export const dynamic = 'force-dynamic';

export default async function CompetenciasPage() {
  const races = await getActiveRaces();
  const openRaces = races.filter((r) => r.status === 'registration_open');
  const upcomingRaces = races.filter((r) => r.status === 'upcoming');
  const finishedRaces = races.filter((r) => r.status === 'finished');

  return (
    <>
      {/* Hero — mismo estilo que Nosotros */}
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas en competencia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/50 to-bg-warm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Competencias</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">Calendario completo de eventos de la temporada 2026</p>
            </div>
          </div>
        </div>
      </section>

      {races.length === 0 && (
        <section className="section-padding bg-bg-warm">
          <div className="content-shell max-w-4xl">
            <div className="rounded-lg border border-border-subtle bg-white p-6 text-center text-text-secondary shadow-lg shadow-brand-blue/8 sm:rounded-2xl sm:p-10">
              No hay competencias activas por ahora.
            </div>
          </div>
        </section>
      )}

      {openRaces.length > 0 && (
        <section className="section-padding bg-gradient-to-br from-bg-warm via-white to-run-light/50 relative">
          {/* Fondo sutil con patrón */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.04),transparent_50%)]" />
          <div className="content-shell relative max-w-5xl">
            <SectionTitle title="Inscripciones Abiertas" subtitle="¡Inscríbete ahora y asegura tu cupo!" align="left" />
            <div className="space-y-6">{openRaces.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}

      {upcomingRaces.length > 0 && (
        <section className="section-padding bg-gradient-to-br from-brand-blue-pale via-bg-section to-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(46,125,209,0.05),transparent_50%)]" />
          <div className="content-shell relative max-w-5xl">
            <SectionTitle title="Próximas Competencias" subtitle="Eventos que se acercan en el calendario" align="left" />
            <div className="space-y-6">{upcomingRaces.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}

      {finishedRaces.length > 0 && (
        <section className="section-padding bg-gradient-to-br from-white via-bg-warm to-brand-blue-pale/60 relative">
          <div className="content-shell relative max-w-5xl">
            <SectionTitle title="Competencias Finalizadas" subtitle="Resultados de la temporada" align="left" />
            <div className="space-y-6">{finishedRaces.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
