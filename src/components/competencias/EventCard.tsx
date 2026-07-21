// =============================================================================
// EventCard — Tema Race Night
// =============================================================================

import type { Race, RaceStatus, RaceType } from '@/types';

function getStatusBadge(status: RaceStatus) {
  const badges: Record<RaceStatus, { text: string; className: string }> = {
    upcoming: { text: 'Próximamente', className: 'bg-brand-blue-pale text-brand-blue' },
    registration_open: { text: 'Inscripciones abiertas', className: 'bg-brand-blue text-white border border-brand-blue' },
    registration_closed: { text: 'Inscripciones cerradas', className: 'bg-swim-light text-brand-navy border border-brand-blue-soft' },
    finished: { text: 'Finalizado', className: 'bg-bg-section text-text-muted' },
  };
  return badges[status];
}

function getRaceTypeLabel(type: RaceType): string {
  const labels: Record<RaceType, string> = {
    triatlon: 'Triatlón', duatlon: 'Duatlón', acuatlon: 'Acuatlón',
    running: 'Running', ciclismo: 'Ciclismo', natacion: 'Natación',
  };
  return labels[type];
}

export default function EventCard({ race }: { race: Race }) {
  const date = new Date(race.date + 'T12:00:00');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const badge = getStatusBadge(race.status);
  const className = 'group block border-b border-brand-blue/15 py-6 transition-colors first:pt-0 last:border-b-0 last:pb-0';

  const content = (
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Date */}
        <div className="flex items-center justify-center rounded-xl bg-brand-blue-pale px-4 py-3 transition-colors duration-300 group-hover:bg-brand-blue sm:min-w-[80px] sm:flex-col">
          <span className="mr-2 text-3xl font-bold leading-none text-brand-blue transition-colors group-hover:text-white sm:mr-0">{date.getDate()}</span>
          <div className="flex flex-col items-center">
            <span className="text-brand-blue/60 group-hover:text-white/70 text-xs font-semibold tracking-wider uppercase transition-colors">{months[date.getMonth()].slice(0, 3)}</span>
            <span className="text-text-muted group-hover:text-white/50 text-xs transition-colors">{date.getFullYear()}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${badge.className}`}>{badge.text}</span>
            <span className="text-xs text-brand-blue bg-brand-blue-pale px-2 py-0.5 rounded-full">{getRaceTypeLabel(race.type)}</span>
          </div>
          <h3 className="mb-2 text-lg font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue sm:text-xl">{race.name}</h3>
          <p className="text-text-muted text-sm mb-2">{race.location}</p>
          {race.distance && <span className="inline-block text-xs text-brand-blue bg-brand-blue-pale px-2 py-0.5 rounded mb-3">{race.distance}</span>}
          {race.description && <p className="text-text-secondary text-sm leading-relaxed">{race.description}</p>}
        </div>
      </div>
  );

  return race.registrationUrl ? (
    <a
      href={race.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ir a la inscripción de ${race.name}`}
      className={`${className} cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4`}
    >
      {content}
    </a>
  ) : (
    <article className={className}>{content}</article>
  );
}
