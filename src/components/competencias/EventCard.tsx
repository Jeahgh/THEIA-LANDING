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
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Date */}
        <div className="flex sm:flex-col items-center justify-center bg-brand-blue-pale rounded-xl px-4 py-3 sm:min-w-[80px] group-hover:bg-brand-blue transition-colors duration-300">
          <span className="text-brand-blue group-hover:text-white text-3xl font-bold leading-none mr-2 sm:mr-0 transition-colors">{date.getDate()}</span>
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
          <h3 className="text-text-primary font-bold text-xl mb-2 group-hover:text-brand-blue transition-colors">{race.name}</h3>
          <p className="text-text-muted text-sm mb-2">{race.location}</p>
          {race.distance && <span className="inline-block text-xs text-brand-blue bg-brand-blue-pale px-2 py-0.5 rounded mb-3">{race.distance}</span>}
          {race.description && <p className="text-text-secondary text-sm leading-relaxed">{race.description}</p>}
        </div>
      </div>
    </Card>
  );
}
