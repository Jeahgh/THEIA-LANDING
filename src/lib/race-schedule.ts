import type { Race } from '../types/index.ts';

export function getClubDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function getRaceDaysRemaining(date: string, today: string) {
  // Compare calendar dates, so daylight saving changes never add or lose a day.
  return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
}

export function getRaceStatus(date: string, today = getClubDate()) {
  // A date-only event stays upcoming throughout its day in Chile.
  return date < today ? 'finished' : 'upcoming';
}

export function getRaceSchedule(races: Race[], now = new Date()) {
  const today = getClubDate(now);

  const all = races.map((race): Race => ({
    ...race, status: getRaceStatus(race.date, today),
  })).sort((a, b) => a.date.localeCompare(b.date));
  return { today, all, upcoming: all.filter((race) => race.status !== 'finished') };
}

export function getCompactRaceName(race: Pick<Race, 'name' | 'distance'>) {
  const name = race.name.trim();
  const distance = race.distance?.trim();
  const normalize = (value: string) => value.toLocaleLowerCase('es').replace(/[^\p{L}\p{N}]/gu, '');
  return distance && !normalize(name).includes(normalize(distance)) ? `${name} ${distance}` : name;
}
