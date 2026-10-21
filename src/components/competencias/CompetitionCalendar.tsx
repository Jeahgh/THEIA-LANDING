'use client';

import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getClubDate, getCompactRaceName, getRaceDaysRemaining, getRaceStatus } from '@/lib/race-schedule';
import type { Race } from '@/types';

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
type View = 'upcoming' | 'finished' | 'all';
const pageSize = 3;

export default function CompetitionCalendar({ races: initialRaces, today: initialToday }: { races: Race[]; today: string }) {
  const [today, setToday] = useState(initialToday);
  useEffect(() => {
    const timer = window.setInterval(() => setToday(getClubDate()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const races = initialRaces.map((race): Race => ({ ...race, status: getRaceStatus(race.date, today) }));
  const nextRace = races.find((race) => race.status !== 'finished');
  const [month, setMonth] = useState(initialToday.slice(0, 7));
  const [season, setSeason] = useState(Number(initialToday.slice(0, 4)));
  const [view, setView] = useState<View>(nextRace ? 'upcoming' : races.length ? 'finished' : 'upcoming');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [limit, setLimit] = useState(pageSize);
  const [year, monthNumber] = month.split('-').map(Number);
  const years = [...new Set([Number(today.slice(0, 4)), ...races.map((race) => race.season ?? Number(race.date.slice(0, 4)))])].sort((a, b) => a - b);
  const seasonRaces = races.filter((race) => (race.season ?? Number(race.date.slice(0, 4))) === season);
  const nextSeasonRace = seasonRaces.find((race) => race.status !== 'finished');
  const todayLabel = new Intl.DateTimeFormat('es-CL', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${today}T12:00:00Z`)).replace(',', '');
  const filtered = seasonRaces.filter((race) => (
    (view === 'all' || (view === 'finished' ? race.status === 'finished' : race.status !== 'finished')) &&
    (!selectedDate || race.date === selectedDate)
  ));
  const visible = filtered.slice(0, limit);
  const groups = Map.groupBy(visible, (race) => race.date.slice(0, 7));
  const firstWeekday = (new Date(year, monthNumber - 1, 1, 12).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthNumber, 0, 12).getDate();
  const cells = Array.from({ length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - firstWeekday + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
  const controlClass = 'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue';

  function changeMonth(delta: number) {
    const date = new Date(year, monthNumber - 1 + delta, 1, 12);
    setMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate(null);
    setLimit(pageSize);
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
      <aside aria-label="Calendario de competencias" className="rounded-2xl bg-[#edf4fa] p-4 sm:p-5">
        <time dateTime={today} className="mb-5 block text-center text-sm font-semibold text-brand-navy first-letter:uppercase">{todayLabel}</time>
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior" className={`${controlClass} px-3 text-xl hover:bg-gray-100`}>‹</button>
          <h3 className="text-center text-lg font-bold text-brand-navy">{months[monthNumber - 1]} {year}</h3>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Mes siguiente" className={`${controlClass} px-3 text-xl hover:bg-gray-100`}>›</button>
        </div>
        <table className="mt-4 w-full table-fixed text-center text-sm">
          <caption className="sr-only">Competencias de {months[monthNumber - 1]} de {year}</caption>
          <thead><tr>{['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((label, index) => <th key={index} scope="col" className="h-10 font-medium text-text-secondary">{label}</th>)}</tr></thead>
          <tbody>{Array.from({ length: cells.length / 7 }, (_, row) => (
            <tr key={row}>{cells.slice(row * 7, row * 7 + 7).map((day, col) => {
              const date = `${month}-${String(day).padStart(2, '0')}`;
              const dayRaces = day ? seasonRaces.filter((race) => race.date === date) : [];
              return (
                <td key={col} className="h-11">
                  {day !== null && (
                    <button type="button" disabled={dayRaces.length === 0} onClick={() => {
                      setSelectedDate(selectedDate === date ? null : date);
                      setView(dayRaces.length > 0 && dayRaces.every((race) => race.status === 'finished') ? 'finished' : 'all');
                      setLimit(pageSize);
                    }} aria-label={`${day} de ${months[monthNumber - 1]} de ${year}${dayRaces.length ? `: ${dayRaces.map((race) => getCompactRaceName(race)).join(', ')}` : ': sin competencias'}`} aria-current={date === today ? 'date' : undefined} aria-pressed={dayRaces.length ? selectedDate === date : undefined} className={`h-9 w-9 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:cursor-default ${date === today ? 'ring-1 ring-[#42627b] ring-offset-2 ring-offset-[#edf4fa]' : ''} ${selectedDate === date ? 'bg-brand-blue font-bold text-white' : dayRaces.length ? 'bg-[#d4e9fa] font-bold text-[#215b87] hover:bg-[#bcdcf5]' : 'text-text-secondary/60'}`}>{day}</button>
                  )}
                </td>
              );
            })}</tr>
          ))}</tbody>
        </table>
        <button type="button" onClick={() => { setView('all'); setSelectedDate(null); setLimit(pageSize); }} className="mt-4 rounded py-2 text-sm font-bold text-[#215b87] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">Ver toda la temporada</button>
        {nextSeasonRace && <div className="mt-6 rounded-xl bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#42627b]">El próximo desafío</p>
          <p className="mt-2 text-base font-bold leading-snug text-brand-navy">{getCompactRaceName(nextSeasonRace)}</p>
          <p className="mt-3 text-sm text-text-secondary">{nextSeasonRace.date === today ? 'La largada es hoy' : <><span className="text-3xl font-bold text-[#42627b] tabular-nums">{getRaceDaysRemaining(nextSeasonRace.date, today)}</span> {getRaceDaysRemaining(nextSeasonRace.date, today) === 1 ? 'día' : 'días'} para la largada</>}</p>
        </div>}
      </aside>

      <div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" aria-label="Estado de las competencias">
            {([{ key: 'upcoming', text: 'Próximas' }, { key: 'finished', text: 'Finalizadas' }] as const).map((item) => (
              <button key={item.key} type="button" aria-pressed={view === item.key} onClick={() => { setView(item.key); if (item.key === 'upcoming') setMonth(season === Number(today.slice(0, 4)) ? today.slice(0, 7) : (nextSeasonRace?.date ?? `${season}-01-01`).slice(0, 7)); setSelectedDate(null); setLimit(pageSize); }} className={`${controlClass} focus-visible:outline-slate-500 ${view === item.key ? 'bg-slate-200 text-slate-800' : 'text-text-secondary hover:bg-gray-100'}`}>{item.text}</button>
            ))}
          </div>
          <select aria-label="Temporada de competencias" value={season} onChange={(event) => {
            const nextSeason = Number(event.target.value);
            const matches = races.filter((race) => (race.season ?? Number(race.date.slice(0, 4))) === nextSeason);
            const first = matches.find((race) => race.status !== 'finished') ?? matches[0];
            setSeason(nextSeason);
            setMonth(first?.date.slice(0, 7) ?? `${nextSeason}-${String(monthNumber).padStart(2, '0')}`);
            setSelectedDate(null);
            setLimit(pageSize);
          }} className="rounded-lg bg-[#f3f4f5] px-4 py-2 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-brand-blue">{years.map((item) => <option key={item} value={item}>Temporada {item}</option>)}</select>
        </div>
        <div aria-live="polite">
          {view === 'all' && <p className="mb-5 text-sm font-semibold text-text-secondary">Todas las competencias de la temporada</p>}
          {visible.length > 0 ? [...groups].map(([key, events]) => (
            <section key={key} aria-label={`${months[Number(key.slice(5)) - 1]} ${key.slice(0, 4)}`} className="mb-8 last:mb-0">
              <h3 className="mb-4 text-lg font-bold text-text-secondary">{months[Number(key.slice(5)) - 1]}</h3>
              <div className="space-y-6">{events.map((race) => <EventCard key={race.id} race={race} today={today} />)}</div>
            </section>
          )) : <p className="py-10 text-text-secondary">No hay competencias para esta selección.</p>}
        </div>
        {filtered.length > limit && <button type="button" onClick={() => setLimit(limit + pageSize)} className="mt-7 rounded-full bg-[#e6eef4] px-6 py-3 text-sm font-bold text-[#42627b] hover:bg-[#dce8f1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">Ver más competencias</button>}
      </div>
    </div>
  );
}
