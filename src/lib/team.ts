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

export async function getActiveAthletes(limit?: number): Promise<PublicAthlete[]> {
  try {
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

    return limit ? members.slice(0, limit) : members;
  } catch {
    return [];
  }
}

export async function getClubStats(): Promise<ClubStats> {
  try {
    const [athletes, coaches, races] = await Promise.all([
      prisma.athlete.count({ where: { isActive: true, role: 'Atleta' } }),
      prisma.athlete.count({ where: { isActive: true, role: 'Entrenador' } }),
      prisma.race.count({ where: { isActive: true } }),
    ]);

    return { athletes, coaches, races };
  } catch {
    return { athletes: 0, coaches: 0, races: 0 };
  }
}
