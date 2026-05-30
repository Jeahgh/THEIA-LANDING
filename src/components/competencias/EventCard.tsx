// =============================================================================
// EventCard — Tema Claro, Cálido
// =============================================================================

import Card from '@/components/ui/Card';
import type { Race, RaceStatus, RaceType } from '@/types';

function getStatusBadge(status: RaceStatus) {
  const badges: Record<RaceStatus, { text: string; className: string }> = {
    upcoming: { text: 'Próximamente', className: 'bg-gray-100 text-gray-600' },
    registration_open: { text: 'Inscripciones abiertas', className: 'bg-green-50 text-green-700 border border-green-200' },
    registration_closed: { text: 'Inscripciones cerradas', className: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
    finished: { text: 'Finalizado', className: 'bg-gray-50 text-gray-500' },
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

  return (
    <Card hover className="group">
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
            <span className="text-xs text-text-muted bg-gray-50 px-2 py-0.5 rounded-full">{getRaceTypeLabel(race.type)}</span>
          </div>
          <h3 className="mb-2 text-lg font-bold leading-tight text-text-primary transition-colors group-hover:text-brand-blue sm:text-xl">{race.name}</h3>
          <p className="text-text-muted text-sm mb-2">{race.location}</p>
          {race.distance && <span className="inline-block text-xs text-brand-blue bg-brand-blue-pale px-2 py-0.5 rounded mb-3">{race.distance}</span>}
          {race.description && <p className="text-text-secondary text-sm leading-relaxed">{race.description}</p>}
        </div>
      </div>
    </Card>
  );
}
