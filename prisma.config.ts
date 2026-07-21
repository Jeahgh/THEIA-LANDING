import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'prisma/config';

// Los comandos Prisma ejecutados localmente usan el entorno de desarrollo.
// Para operar deliberadamente sobre produccion se debe definir NODE_ENV=production.
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

const datasourceUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!datasourceUrl) {
  throw new Error('Configura DIRECT_URL o DATABASE_URL antes de ejecutar Prisma.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: datasourceUrl,
  },
});
