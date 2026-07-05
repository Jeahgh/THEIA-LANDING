import { prisma } from '@/lib/prisma';

export type PublicAthlete = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
  imageAlt: string | null;
  achievements: string[];
};

export type ClubStats = {
  athletes: number;
  coaches: number;
  races: number;
};

export async function getActiveAthletes(limit?: number): Promise<PublicAthlete[]> {
  try {
    return await prisma.athlete.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      ...(limit ? { take: limit } : {}),
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        imageUrl: true,
        imageAlt: true,
        achievements: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getClubStats(): Promise<ClubStats> {
  try {
    const [athletes, coaches, races] = await Promise.all([
      prisma.athlete.count({ where: { isActive: true } }),
      prisma.coach.count({ where: { isActive: true } }),
      prisma.race.count({ where: { isActive: true } }),
    ]);

    return { athletes, coaches, races };
  } catch {
    return { athletes: 0, coaches: 0, races: 0 };
  }
}
