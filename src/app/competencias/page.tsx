import type { Metadata } from 'next';
import Image from 'next/image';
import { getActiveRaces } from '@/lib/races';
import SectionTitle from '@/components/ui/SectionTitle';
import EventCard from '@/components/competencias/EventCard';
import EmptyState from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'Competencias',
  description: 'Calendario de competencias de triatlón, duatlón, acuatlón y más con Theia Triathlon Performance.',
};

export const dynamic = 'force-dynamic';

export default async function CompetenciasPage() {
  const races = await getActiveRaces();

  return (
    <>
      {/* Hero — mismo estilo que Nosotros */}
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas en competencia" fill className="object-cover" priority />
          <div className="absolute inset-0 theia-hero-overlay" />
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
        <section className="section-padding theia-light-section">
          <div className="content-shell max-w-4xl">
            <EmptyState>
              No hay competencias activas por ahora.
            </EmptyState>
          </div>
        </section>
      )}

      {races.length > 0 && (
        <section className="section-padding theia-light-section relative">
          {/* Fondo sutil con patrón */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(10,132,255,0.08),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.65),transparent_42%)]" />
          <div className="content-shell relative max-w-5xl">
            <SectionTitle title="Calendario de Competencias" subtitle="Todas las competencias activas de la temporada" align="left" />
            <div className="space-y-6">{races.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}

    </>
  );
}
