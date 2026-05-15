// =============================================================================
// UpcomingRaces — Fondo azul oscuro con texto de alto contraste
// =============================================================================

import { RACES } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import type { RaceStatus } from '@/types';

function formatDate(dateStr: string): { day: string; month: string } {
  const date = new Date(dateStr + 'T12:00:00');
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  return { day: date.getDate().toString().padStart(2, '0'), month: months[date.getMonth()] };
}

function getStatusBadge(status: RaceStatus) {
  const badges: Record<RaceStatus, { text: string; className: string }> = {
    upcoming:             { text: 'Próximamente',          className: 'bg-white/15 text-white border border-white/25' },
    registration_open:   { text: 'Inscripciones abiertas', className: 'bg-run text-white shadow-sm shadow-run/40' },
    registration_closed: { text: 'Inscripciones cerradas', className: 'bg-accent-warm text-white shadow-sm shadow-accent-warm/40' },
    finished:            { text: 'Finalizado',             className: 'bg-white/10 text-white/50 border border-white/15' },
  };
  return badges[status];
}

export default function UpcomingRaces() {
  const upcomingRaces = RACES.slice(0, 3);

  return (
    <section id="upcoming-races" className="section-padding bg-gradient-to-br from-brand-navy via-brand-blue-vivid to-brand-navy">
      <div className="w-full px-6 sm:px-8 lg:px-12">

        {/* Encabezado con contraste máximo */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
          {/* Línea decorativa blanca */}
          <div className="w-16 h-1 bg-gradient-to-r from-brand-blue-soft via-white to-accent-warm rounded-full" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Próximas Competencias
          </h2>
          <p className="text-brand-blue-soft text-lg sm:text-xl max-w-2xl">
            Prepárate para los desafíos de la temporada 2026
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {upcomingRaces.map((race) => {
            const { day, month } = formatDate(race.date);
            const badge = getStatusBadge(race.status);

            return (
              <div
                key={race.id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-md transition-all duration-300 hover:bg-white/[0.15] hover:border-white/35 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="flex gap-4">
                  {/* Bloque de fecha — blanco con acento */}
                  <div className="flex flex-col items-center justify-center bg-white/20 rounded-xl px-3 py-2 min-w-[64px] group-hover:bg-white/30 transition-colors duration-300 border border-white/25">
                    <span className="text-white text-2xl font-bold leading-none">{day}</span>
                    <span className="text-brand-blue-soft text-xs font-bold tracking-widest">{month}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Badge de estado */}
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${badge.className}`}>
                      {badge.text}
                    </span>
                    {/* Nombre de la carrera — blanco nítido */}
                    <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-brand-blue-soft transition-colors truncate">
                      {race.name}
                    </h3>
                    {/* Ubicación */}
                    <p className="text-brand-blue-soft/90 text-sm font-medium">{race.location}</p>
                    {/* Distancia */}
                    {race.distance && (
                      <span className="inline-block text-xs font-semibold text-white bg-white/15 border border-white/20 px-2.5 py-0.5 rounded-full mt-2">
                        {race.distance}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="white" href="/competencias">
            Ver todas las competencias
          </Button>
        </div>
      </div>
    </section>
  );
}
