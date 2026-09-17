import type { Race } from '@/types';
import { unstable_cache } from 'next/cache';
import { PUBLIC_CACHE_TAGS, PUBLIC_CONTENT_REVALIDATE_SECONDS } from '@/lib/cache-tags';
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

const getCachedActiveRaces = unstable_cache(
  async () => {
    const races = await prisma.race.findMany({
      where: { isActive: true },
      orderBy: [{ date: 'asc' }, { sortOrder: 'asc' }],
      select: {
        id: true,
        name: true,
        date: true,
        location: true,
        type: true,
        distance: true,
        description: true,
        registrationUrl: true,
        status: true,
      },
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
  },
  ['active-races'],
  {
    tags: [PUBLIC_CACHE_TAGS.races],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

export async function getActiveRaces(): Promise<Race[]> {
  try {
    return await getCachedActiveRaces();
  } catch {
    return [];
  }
}
