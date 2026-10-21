import Image from 'next/image';
import { getRaceDaysRemaining } from '@/lib/race-schedule';
import { getSafeExternalHttpsUrl } from '@/lib/external-url';
import type { Race, RaceType } from '@/types';

const photos: Record<RaceType, string[]> = {
  triatlon: ['/images/hero-bike-team.jpg', '/images/hero-team-finish.jpg', '/images/equipo-running.jpg'],
  duatlon: ['/images/hero-bike-team.jpg', '/images/hero-running-pack.jpg'],
  acuatlon: ['/images/hero-team-finish.jpg'], running: ['/images/hero-running-pack.jpg', '/images/equipo-running.jpg'],
  ciclismo: ['/images/hero-bike-team.jpg'], natacion: ['/images/hero-team-finish.jpg'],
};
const monthLabels = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export default function EventCard({ race, today }: { race: Race; today: string }) {
  const [year, month, day] = race.date.split('-');
  const url = getSafeExternalHttpsUrl(race.registrationUrl);
  const title = race.name;
  const daysRemaining = getRaceDaysRemaining(race.date, today);
  const photoIndex = [...`${race.id}${race.date}`].reduce((value, character) => value + character.charCodeAt(0), 0) % photos[race.type].length;

  const classes = 'grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-transparent p-3 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6 xl:grid-cols-[180px_minmax(0,1fr)]';
  const content = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image src={race.imageUrl || photos[race.type][photoIndex]} alt={race.imageUrl ? `Imagen de ${title}` : 'Equipo Theia en actividades deportivas del club'} fill sizes="(min-width: 1280px) 180px, (min-width: 640px) 160px, 96px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <time dateTime={race.date} aria-label={`${day} de ${monthLabels[Number(month) - 1]} de ${year}`} className="text-sm font-semibold text-[#42627b]">{Number(day)} de {monthLabels[Number(month) - 1]}</time>
          {daysRemaining >= 0 && <span className="rounded-full bg-[#e6eef4] px-3 py-1.5 text-xs font-bold text-[#42627b] tabular-nums">{daysRemaining === 0 ? 'Hoy es la competencia' : `Falta${daysRemaining === 1 ? '' : 'n'} ${daysRemaining} día${daysRemaining === 1 ? '' : 's'}`}</span>}
        </div>
        <h3 className="text-xl font-bold leading-tight text-brand-navy [overflow-wrap:anywhere] sm:text-2xl">
          {title}
        </h3>
        {race.distance && <p className="mt-1 text-sm font-medium text-[#42627b] [overflow-wrap:anywhere]">{race.distance}</p>}
        {race.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">{race.description}</p>}
      </div>
    </>
  );
  return (
    <article>
      {url ? <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${title} (abre otra pestaña)`}
        className={`${classes} transition-colors hover:border-[#a7bdce] hover:bg-white/70 focus-visible:border-[#42627b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42627b]`}>{content}</a>
        : <div className={classes}>{content}</div>}
    </article>
  );
}
