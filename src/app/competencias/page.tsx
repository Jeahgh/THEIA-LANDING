import type { Metadata } from 'next';
import Image from 'next/image';
import { RACES } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import EventCard from '@/components/competencias/EventCard';

export const metadata: Metadata = {
  title: 'Competencias',
  description: 'Calendario de competencias de triatlón, duatlón, acuatlón y más con Theia Triathlon Performance.',
};

export default function CompetenciasPage() {
  const openRaces = RACES.filter((r) => r.status === 'registration_open');
  const upcomingRaces = RACES.filter((r) => r.status === 'upcoming');
  const finishedRaces = RACES.filter((r) => r.status === 'finished');

  return (
    <>
      {/* Hero — mismo estilo que Nosotros */}
      <section className="relative pt-20 overflow-hidden">
        <div className="relative h-[350px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas en competencia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/50 to-bg-warm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Competencias</h1>
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">Calendario completo de eventos de la temporada 2026</p>
            </div>
          </div>
        </div>
      </section>

      {openRaces.length > 0 && (
        <section className="section-padding bg-white relative">
          {/* Fondo sutil con patrón */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.04),transparent_50%)]" />
          <div className="w-full px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto relative">
            <SectionTitle title="Inscripciones Abiertas" subtitle="¡Inscríbete ahora y asegura tu cupo!" align="left" />
            <div className="space-y-6">{openRaces.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}

      {upcomingRaces.length > 0 && (
        <section className="section-padding bg-bg-section relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(46,125,209,0.05),transparent_50%)]" />
          <div className="w-full px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto relative">
            <SectionTitle title="Próximas Competencias" subtitle="Eventos que se acercan en el calendario" align="left" />
            <div className="space-y-6">{upcomingRaces.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}

      {finishedRaces.length > 0 && (
        <section className="section-padding bg-white relative">
          <div className="w-full px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto relative">
            <SectionTitle title="Competencias Finalizadas" subtitle="Resultados de la temporada" align="left" />
            <div className="space-y-6">{finishedRaces.map((r) => <EventCard key={r.id} race={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
