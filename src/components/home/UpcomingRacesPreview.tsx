import Link from 'next/link';
import { getClubDate, getCompactRaceName, getRaceDaysRemaining } from '@/lib/race-schedule';
import { getSafeExternalHttpsUrl } from '@/lib/external-url';
import type { Race } from '@/types';

const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

export default function UpcomingRacesPreview({ races, today = getClubDate() }: { races: Race[]; today?: string }) {
  return (
    <section id="upcoming-races" aria-labelledby="upcoming-races-title" className="section-padding bg-[#edf4fa]">
      <div className="content-shell grid gap-10 lg:grid-cols-[0.9fr_1.35fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-4 text-lg font-bold tracking-[0.28em] text-[#42627b] sm:text-xl">THEIA</p>
          <h2 id="upcoming-races-title" className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
            Próximas<br />competencias
          </h2>
          <Link href="/competencias" className="mt-7 inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-vivid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
            Ver todas las competencias
          </Link>
        </div>

        {races.length > 0 ? (
          <ol className="flex flex-col gap-5 sm:gap-7" aria-label="Las tres próximas competencias">
            {races.map((race) => {
              const [year, month, day] = race.date.split('-');
              const name = getCompactRaceName(race);
              const registrationUrl = getSafeExternalHttpsUrl(race.registrationUrl);
              const days = getRaceDaysRemaining(race.date, today);
              const countdown = days === 0 ? 'Hoy' : days === 1 ? 'Mañana' : days > 1 ? `En ${days} días` : 'Próximamente';
              const rowClasses = 'group grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-2xl border border-transparent bg-white/85 p-4 text-brand-navy shadow-sm shadow-brand-navy/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a7bdce] hover:bg-white hover:shadow-md active:translate-y-0 motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-x-6 sm:p-5 xl:grid-cols-[80px_minmax(0,1fr)_auto]';
              const content = (
                <>
                  <time dateTime={race.date} aria-label={`${day} de ${months[Number(month) - 1]} de ${year}`} className="row-span-2 flex w-16 flex-col items-center text-center sm:w-20 xl:row-span-1">
                    <span className="text-5xl font-bold leading-none tracking-tight text-[#263c50] tabular-nums sm:text-6xl">{day}</span>
                    <span className="mt-2 text-xs font-bold tracking-[0.2em] text-text-secondary sm:text-sm">{months[Number(month) - 1]}</span>
                  </time>
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-xl font-bold leading-snug sm:text-2xl">{name}</h3>
                  </div>
                  <span className="col-start-2 justify-self-start rounded-full bg-[#f0f2f4] px-3 py-1.5 text-xs font-medium text-[#596675] xl:col-start-auto xl:justify-self-end xl:text-right">{countdown}</span>
                </>
              );
              return (
                <li key={race.id}>
                  {registrationUrl ? (
                    <a href={registrationUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} (abre otra pestaña)`} className={rowClasses}>{content}</a>
                  ) : (
                    <Link href="/competencias" aria-label={`Ver ${name} en el calendario de competencias`} className={rowClasses}>{content}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="py-12 text-lg text-text-secondary">No hay próximas competencias programadas.</p>
        )}
      </div>
    </section>
  );
}
