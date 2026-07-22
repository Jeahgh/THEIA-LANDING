const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const action = process.argv[2];
const forwardedArgs = process.argv.slice(3);
const nextCli = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
const prismaCli = path.join(projectRoot, 'node_modules', 'prisma', 'build', 'index.js');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (
  process.env.THEIA_CONTAINER_CONTEXT !== '1'
  || !fs.existsSync('/run/theia-container-context')
) {
  fail('Este comando es interno y solo se puede ejecutar dentro de Docker.');
}

const childEnvironment = {
  ...process.env,
  THEIA_DATABASE_TARGET: 'container',
};

let args;

switch (action) {
  case 'build':
    args = [nextCli, 'build', ...forwardedArgs];
    break;
  case 'db:deploy':
    args = [prismaCli, 'migrate', 'deploy'];
    break;
  case 'db:seed': {
    const seedResult = spawnSync(process.execPath, ['prisma/seed.mjs'], {
      cwd: projectRoot,
      env: childEnvironment,
      stdio: 'inherit',
      shell: false,
    });

    if (seedResult.error) {
      fail(`No se pudo ejecutar el seed: ${seedResult.error.message}`);
    }

    process.exit(seedResult.status ?? 1);
  }
  default:
    fail(`Accion de contenedor desconocida: ${action ?? '(ninguna)'}.`);
}

const result = spawnSync(process.execPath, args, {
  cwd: projectRoot,
  env: childEnvironment,
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  fail(`No se pudo ejecutar la herramienta del contenedor: ${result.error.message}`);
}

process.exit(result.status ?? 1);
