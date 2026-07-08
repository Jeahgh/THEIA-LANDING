// =============================================================================
// UpcomingRaces — Fondo azul oscuro con texto de alto contraste
// =============================================================================

import { getActiveRaces } from '@/lib/races';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import type { RaceStatus } from '@/types';

function formatDate(dateStr: string): { day: string; month: string } {
  const date = new Date(dateStr + 'T12:00:00');
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  return { day: date.getDate().toString().padStart(2, '0'), month: months[date.getMonth()] };
}

function getStatusBadge(status: RaceStatus) {
  const badges: Record<RaceStatus, { text: string; className: string }> = {
    upcoming:             { text: 'Próximamente',          className: 'bg-white/15 text-white border border-white/25' },
    registration_open:   { text: 'Inscripciones abiertas', className: 'bg-brand-blue text-white shadow-sm shadow-brand-blue/40' },
    registration_closed: { text: 'Inscripciones cerradas', className: 'bg-brand-blue-light text-brand-navy shadow-sm shadow-brand-blue/30' },
    finished:            { text: 'Finalizado',             className: 'bg-white/10 text-white/50 border border-white/15' },
  };
  return badges[status];
}

export default async function UpcomingRaces() {
  const upcomingRaces = (await getActiveRaces()).slice(0, 3);

  return (
    <section id="upcoming-races" className="section-padding bg-gradient-to-br from-brand-navy via-[#08213d] to-brand-navy">
      <div className="content-shell">

        {/* Encabezado con contraste máximo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-12">
          {/* Línea decorativa blanca */}
          <div className="w-16 h-1 bg-gradient-to-r from-brand-blue via-brand-blue-light to-white rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Próximas Competencias
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-brand-blue-soft sm:text-xl">
            Prepárate para los desafíos de la temporada 2026
          </p>
        </div>

        {upcomingRaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {upcomingRaces.map((race) => {
            const { day, month } = formatDate(race.date);
            const badge = getStatusBadge(race.status);

            return (
              <div
                key={race.id}
                className="group rounded-lg border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/[0.15] hover:shadow-xl hover:shadow-black/20 sm:rounded-2xl sm:p-6 lg:hover:-translate-y-1"
              >
                <div className="flex gap-4">
                  {/* Bloque de fecha — blanco con acento */}
                  <div className="flex min-w-[58px] flex-col items-center justify-center rounded-xl border border-white/25 bg-white/20 px-3 py-2 transition-colors duration-300 group-hover:bg-white/30 sm:min-w-[64px]">
                    <span className="text-white text-2xl font-bold leading-none">{day}</span>
                    <span className="text-brand-blue-soft text-xs font-bold tracking-widest">{month}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Badge de estado */}
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${badge.className}`}>
                      {badge.text}
                    </span>
                    {/* Nombre de la carrera — blanco nítido */}
                    <h3 className="mb-1 text-lg font-bold leading-tight text-white transition-colors group-hover:text-brand-blue-soft sm:truncate">
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
        ) : (
          <EmptyState tone="dark">
            No hay competencias activas por ahora.
          </EmptyState>
        )}

        <div className="mt-10 text-center sm:mt-12">
          <Button variant="white" href="/competencias">
            Ver todas las competencias
          </Button>
        </div>
      </div>
    </section>
  );
}
