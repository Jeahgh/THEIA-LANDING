import { prisma } from '@/lib/prisma';

export const LOCATION_SEARCH_DAILY_LIMIT = 500;

export async function reserveLocationSearch(now = new Date()) {
  const day = new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`);
  // PostgreSQL incrementa el mismo contador para todos los administradores y
  // réplicas. También contamos fallos para no subestimar el consumo externo.
  const usage = await prisma.locationSearchUsage.upsert({
    where: { day },
    create: { day, requests: 1 },
    update: { requests: { increment: 1 } },
    select: { requests: true },
  });
  return {
    allowed: usage.requests <= LOCATION_SEARCH_DAILY_LIMIT,
    retryAfterSeconds: Math.max(1, Math.ceil((day.getTime() + 86_400_000 - now.getTime()) / 1000)),
  };
}
