const path = require('path');
const { spawnSync } = require('child_process');
const { loadEnvConfig } = require('@next/env');

const projectRoot = path.resolve(__dirname, '..');
const action = process.argv[2];
const forwardedArgs = process.argv.slice(3);
const nextCli = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
const prismaCli = path.join(projectRoot, 'node_modules', 'prisma', 'build', 'index.js');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parsePostgresUrl(variableName, value) {
  let parsedUrl;

  try {
    parsedUrl = new URL(value);
  } catch {
    fail(`${variableName} no contiene una URL valida.`);
  }

  if (!['postgres:', 'postgresql:'].includes(parsedUrl.protocol)) {
    fail(`${variableName} debe usar postgresql:// o postgres://.`);
  }

  if ([...parsedUrl.searchParams.keys()].some((key) => key.toLowerCase() === 'host')) {
    fail(`${variableName} no permite reemplazar el host mediante parametros.`);
  }

  const host = parsedUrl.hostname.replace(/^\[|\]$/g, '').toLowerCase();

  if (!['localhost', '127.0.0.1', '::1'].includes(host)) {
    fail(`${variableName} apunta a "${host}". Los comandos locales solo aceptan loopback.`);
  }

  return parsedUrl;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    env: options.env ?? process.env,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    fail(`No se pudo ejecutar ${command}: ${result.error.message}`);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function rejectDatabaseOverrides(args) {
  const forbiddenOptions = ['--url', '--config'];

  for (const argument of args) {
    const normalized = argument.toLowerCase();

    if (
      forbiddenOptions.some(
        (option) => normalized === option || normalized.startsWith(`${option}=`),
      )
    ) {
      fail(`El argumento ${argument} no esta permitido en comandos locales protegidos.`);
    }
  }
}

function startDatabase() {
  console.log('THEIA local: iniciando solo PostgreSQL (servicio db)...');
  run('docker', ['compose', 'up', '-d', '--wait', 'db']);
}

process.env.NODE_ENV = 'development';
loadEnvConfig(projectRoot, true);

if (!process.env.DATABASE_URL) {
  fail('Falta DATABASE_URL en el entorno de desarrollo local.');
}

const databaseUrl = parsePostgresUrl('DATABASE_URL', process.env.DATABASE_URL);

if (process.env.DIRECT_URL) {
  parsePostgresUrl('DIRECT_URL', process.env.DIRECT_URL);
}

process.env.THEIA_DATABASE_TARGET = 'local';

const databaseName = decodeURIComponent(databaseUrl.pathname.replace(/^\//, '')) || '(sin nombre)';
console.log(
  `THEIA local: PostgreSQL verificado en ${databaseUrl.hostname}:${databaseUrl.port || '5432'}/${databaseName}.`,
);

switch (action) {
  case 'dev':
    startDatabase();
    console.log('THEIA local: aplicando migraciones pendientes...');
    run(process.execPath, [prismaCli, 'migrate', 'deploy']);
    console.log('THEIA local: comprobando migraciones...');
    run(process.execPath, [prismaCli, 'migrate', 'status']);
    run(process.execPath, [nextCli, 'dev', '--port', '3000', ...forwardedArgs]);
    break;

  case 'dev:web':
    run(process.execPath, [nextCli, 'dev', '--port', '3000', ...forwardedArgs]);
    break;

  case 'build':
    run(process.execPath, [nextCli, 'build', ...forwardedArgs], {
      env: { ...process.env, NODE_ENV: 'production', THEIA_DATABASE_TARGET: 'local' },
    });
    break;

  case 'db:up':
    startDatabase();
    break;

  case 'db:stop':
    run('docker', ['compose', 'stop', 'db']);
    break;

  case 'db:status':
    rejectDatabaseOverrides(forwardedArgs);
    run(process.execPath, [prismaCli, 'migrate', 'status', ...forwardedArgs]);
    break;

  case 'db:migrate':
    rejectDatabaseOverrides(forwardedArgs);
    run(process.execPath, [prismaCli, 'migrate', 'dev', ...forwardedArgs]);
    break;

  case 'db:seed':
    run(process.execPath, ['prisma/seed.mjs', ...forwardedArgs]);
    break;

  case 'db:studio':
    rejectDatabaseOverrides(forwardedArgs);
    run(process.execPath, [prismaCli, 'studio', ...forwardedArgs]);
    break;

  default:
    fail(`Accion local desconocida: ${action ?? '(ninguna)'}.`);
}
