// =============================================================================
// Prisma Client - Singleton
// =============================================================================
// Next.js recarga modulos en desarrollo. Guardar PrismaClient en globalThis evita
// abrir una conexion nueva en cada hot reload.
// =============================================================================

import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

function assertSafeDevelopmentDatabase(value: string | undefined) {
  if (!value || process.env.NODE_ENV === 'production') return;

  let host: string;

  try {
    const databaseUrl = new URL(value);

    if ([...databaseUrl.searchParams.keys()].some((key) => key.toLowerCase() === 'host')) {
      throw new Error('DATABASE_URL no permite reemplazar el host mediante parametros.');
    }

    host = databaseUrl.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  } catch {
    throw new Error('DATABASE_URL no contiene una URL valida de PostgreSQL.');
  }

  if (!['localhost', '127.0.0.1', '::1'].includes(host)) {
    throw new Error(
      `Desarrollo rechazo DATABASE_URL con host remoto "${host}". ` +
        'Usa .env.development.local con PostgreSQL local.',
    );
  }
}

assertSafeDevelopmentDatabase(connectionString);

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
