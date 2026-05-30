import type { Race } from '@/types';
import { prisma } from '@/lib/prisma';

const typeMap = {
  TRIATLON: 'triatlon',
  DUATLON: 'duatlon',
  ACUATLON: 'acuatlon',
  RUNNING: 'running',
  CICLISMO: 'ciclismo',
  NATACION: 'natacion',
} as const;

const statusMap = {
  UPCOMING: 'upcoming',
  REGISTRATION_OPEN: 'registration_open',
  REGISTRATION_CLOSED: 'registration_closed',
  FINISHED: 'finished',
} as const;

export async function getActiveRaces(): Promise<Race[]> {
  try {
    const races = await prisma.race.findMany({
      where: { isActive: true },
      orderBy: [{ date: 'asc' }, { sortOrder: 'asc' }],
    });

    return races.map((race) => ({
      id: race.id,
      name: race.name,
      date: race.date.toISOString().slice(0, 10),
      location: race.location,
      type: typeMap[race.type],
      distance: race.distance ?? undefined,
      description: race.description ?? undefined,
      registrationUrl: race.registrationUrl ?? undefined,
      status: statusMap[race.status],
    }));
  } catch {
    return [];
  }
}
