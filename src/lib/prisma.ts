// =============================================================================
// Prisma Client — Patrón Singleton
// =============================================================================
// En desarrollo, Next.js recarga los módulos en cada Hot Reload. Sin este
// patrón, se crearían múltiples instancias de PrismaClient, agotando las
// conexiones a la base de datos.
//
// IMPORTANTE: Para usar Prisma necesitas:
//   1. Configurar DATABASE_URL en tu archivo .env
//   2. Ejecutar: npx prisma generate
//   3. Ejecutar: npx prisma migrate dev --name init
//
// Mientras tanto, este archivo está comentado para evitar errores de build.
// Cuando tengas PostgreSQL configurado, descomenta el código de abajo.
//
// Uso futuro:
//   import { prisma } from '@/lib/prisma';
//   const users = await prisma.user.findMany();
// =============================================================================

// -----------------------------------------------------------------------
// Descomenta el siguiente código cuando hayas ejecutado `npx prisma generate`
// -----------------------------------------------------------------------
//
// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
//
// export const prisma = globalForPrisma.prisma ?? new PrismaClient();
//
// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

/**
 * Placeholder export para evitar errores de importación.
 * Reemplazar por el código real de arriba cuando PostgreSQL esté configurado.
 */
export const prisma = null;
