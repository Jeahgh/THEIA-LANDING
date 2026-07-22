import { existsSync } from 'node:fs';
import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'prisma/config';

type DatabaseTarget = 'local' | 'production' | 'container';

const target = (process.env.THEIA_DATABASE_TARGET ?? 'local') as DatabaseTarget;

if (!['local', 'production', 'container'].includes(target)) {
  throw new Error(`THEIA_DATABASE_TARGET no valido: ${target}.`);
}

if (target === 'local') {
  loadEnvConfig(process.cwd(), true);
}

if (
  target === 'container'
  && (
    process.env.THEIA_CONTAINER_CONTEXT !== '1'
    || !existsSync('/run/theia-container-context')
  )
) {
  throw new Error('El destino container solo se puede usar dentro del flujo Docker de THEIA.');
}

const datasourceUrl =
  target === 'production'
    ? process.env.THEIA_PRODUCTION_DATABASE_URL
    : process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!datasourceUrl) {
  throw new Error(
    target === 'production'
      ? 'Falta THEIA_PRODUCTION_DATABASE_URL para operar sobre produccion.'
      : 'Configura DIRECT_URL o DATABASE_URL antes de ejecutar Prisma.',
  );
}

let datasourceHost: string;

try {
  const parsedUrl = new URL(datasourceUrl);

  if (!['postgres:', 'postgresql:'].includes(parsedUrl.protocol)) {
    throw new Error('El protocolo debe ser postgresql:// o postgres://.');
  }

  if ([...parsedUrl.searchParams.keys()].some((key) => key.toLowerCase() === 'host')) {
    throw new Error('No se permite reemplazar el host mediante parametros de conexion.');
  }

  datasourceHost = parsedUrl.hostname.replace(/^\[|\]$/g, '').toLowerCase();
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  throw new Error(`La URL de PostgreSQL para ${target} no es valida: ${reason}`);
}

const isLoopback = ['localhost', '127.0.0.1', '::1'].includes(datasourceHost);

if (target === 'local' && !isLoopback) {
  throw new Error(`Prisma local rechazo el host no local "${datasourceHost}".`);
}

if (target === 'production' && isLoopback) {
  throw new Error('Prisma de produccion rechazo una URL loopback.');
}

if (target === 'container' && datasourceHost !== 'db') {
  throw new Error(
    `Prisma del contenedor rechazo el host "${datasourceHost}"; se esperaba "db".`,
  );
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
