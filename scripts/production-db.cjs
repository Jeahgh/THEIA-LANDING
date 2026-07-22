const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const environmentFile = path.join(projectRoot, '.env.production-ops.local');
const action = process.argv[2];
const forwardedArgs = process.argv.slice(3);
const prismaCli = path.join(projectRoot, 'node_modules', 'prisma', 'build', 'index.js');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(environmentFile)) {
  fail('Falta .env.production-ops.local. No se realizo ninguna operacion.');
}

delete process.env.THEIA_PRODUCTION_DATABASE_URL;

try {
  process.loadEnvFile(environmentFile);
} catch (error) {
  fail(`No se pudo cargar .env.production-ops.local: ${error.message}`);
}

const productionDatabaseUrl = process.env.THEIA_PRODUCTION_DATABASE_URL;

if (!productionDatabaseUrl) {
  fail('Falta THEIA_PRODUCTION_DATABASE_URL en .env.production-ops.local.');
}

let parsedUrl;

try {
  parsedUrl = new URL(productionDatabaseUrl);
} catch {
  fail('THEIA_PRODUCTION_DATABASE_URL no contiene una URL valida.');
}

if (!['postgres:', 'postgresql:'].includes(parsedUrl.protocol)) {
  fail('THEIA_PRODUCTION_DATABASE_URL debe usar postgresql:// o postgres://.');
}

if ([...parsedUrl.searchParams.keys()].some((key) => key.toLowerCase() === 'host')) {
  fail('THEIA_PRODUCTION_DATABASE_URL no permite reemplazar el host mediante parametros.');
}

const host = parsedUrl.hostname.replace(/^\[|\]$/g, '').toLowerCase();

if (['localhost', '127.0.0.1', '::1'].includes(host)) {
  fail('La operacion de produccion rechazo una URL loopback.');
}

const databaseName = decodeURIComponent(parsedUrl.pathname.replace(/^\//, '')) || '(sin nombre)';
console.log(`THEIA produccion: destino ${parsedUrl.hostname}:${parsedUrl.port || '5432'}/${databaseName}.`);

if (action === 'deploy' && !forwardedArgs.includes('--confirm-production')) {
  fail('Para aplicar migraciones repite el comando con: -- --confirm-production');
}

if (!['status', 'deploy'].includes(action)) {
  fail(`Accion de produccion desconocida: ${action ?? '(ninguna)'}.`);
}

const prismaAction = action === 'status' ? ['migrate', 'status'] : ['migrate', 'deploy'];
const childEnvironment = {
  ...process.env,
  NODE_ENV: 'production',
  THEIA_DATABASE_TARGET: 'production',
  THEIA_PRODUCTION_DATABASE_URL: productionDatabaseUrl,
};
const result = spawnSync(process.execPath, [prismaCli, ...prismaAction], {
  cwd: projectRoot,
  env: childEnvironment,
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  fail(`No se pudo ejecutar Prisma: ${result.error.message}`);
}

process.exit(result.status ?? 1);
