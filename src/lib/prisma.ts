// =============================================================================
// Prisma Client - Singleton
// =============================================================================
// Next.js recarga modulos en desarrollo. Guardar PrismaClient en globalThis evita
// abrir una conexion nueva en cada hot reload.
// =============================================================================

import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  if (!connectionString) {
    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error('DATABASE_URL no esta configurada.');
      },
    });
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
