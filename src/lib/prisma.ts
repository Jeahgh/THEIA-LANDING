// =============================================================================
// Prisma Client - Singleton
// =============================================================================
// Next.js recarga modulos en desarrollo. Guardar PrismaClient en globalThis evita
// abrir una conexion nueva en cada hot reload.
// =============================================================================

import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no esta configurada.');
}

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
