import { unstable_cache } from 'next/cache';
import { PUBLIC_CACHE_TAGS, PUBLIC_CONTENT_REVALIDATE_SECONDS } from '@/lib/cache-tags';
import { prisma } from '@/lib/prisma';

export type PublicAthlete = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
  imageAlt: string | null;
};

export type ClubStats = {
  athletes: number;
  coaches: number;
  races: number;
};

const getCachedActiveAthletes = unstable_cache(
  async () => {
    const members = await prisma.athlete.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        imageUrl: true,
        imageAlt: true,
      },
    });

    members.sort((first, second) => {
      const firstPriority = first.role === 'Entrenador' ? 0 : 1;
      const secondPriority = second.role === 'Entrenador' ? 0 : 1;
      return firstPriority - secondPriority;
    });

    return members;
  },
  ['active-athletes'],
  {
    tags: [PUBLIC_CACHE_TAGS.team],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

const getCachedClubStats = unstable_cache(
  async () => {
    const [athletes, coaches, races] = await Promise.all([
      prisma.athlete.count({ where: { isActive: true, role: 'Atleta' } }),
      prisma.athlete.count({ where: { isActive: true, role: 'Entrenador' } }),
      prisma.race.count({ where: { isActive: true } }),
    ]);

    return { athletes, coaches, races };
  },
  ['club-stats'],
  {
    tags: [PUBLIC_CACHE_TAGS.team, PUBLIC_CACHE_TAGS.races],
    revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
  },
);

export async function getActiveAthletes(limit?: number): Promise<PublicAthlete[]> {
  try {
    const members = await getCachedActiveAthletes();
    return limit ? members.slice(0, limit) : members;
  } catch {
    return [];
  }
}

export async function getClubStats(): Promise<ClubStats> {
  try {
    return await getCachedClubStats();
  } catch {
    return { athletes: 0, coaches: 0, races: 0 };
  }
}
