const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const deployRoot = path.join(root, 'deploy');
const target = path.join(deployRoot, 'cpanel');
const tempName = `.cpanel-build-${process.pid}-${Date.now()}`;
const temp = path.join(deployRoot, tempName);
const tempRelative = `deploy/${tempName}`;

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function walk(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

if (process.env.PASSENGER_APP_ENV || process.execPath.includes('/opt/alt/alt-nodejs')) {
  fail('Este build debe ejecutarse localmente, nunca dentro de cPanel.');
}

fs.mkdirSync(deployRoot, { recursive: true });
fs.rmSync(temp, { recursive: true, force: true });

console.log('=== THEIA: build Linux para cPanel ===');
console.log('Docker construira Next.js y Prisma dentro de Node 22 sobre Debian Linux.');

const result = spawnSync(
  'docker',
  [
    'build',
    '--target',
    'cpanel-artifact',
    '--output',
    `type=local,dest=${tempRelative}`,
    '.',
  ],
  {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
);

if (result.error) {
  fs.rmSync(temp, { recursive: true, force: true });
  fail(result.error.message);
}

if (result.status !== 0) {
  fs.rmSync(temp, { recursive: true, force: true });
  fail(`Docker termino con codigo ${result.status}${result.signal ? ` (${result.signal})` : ''}.`);
}

const required = [
  'server.js',
  'package.json',
  '.next/BUILD_ID',
  '.next/static',
  'node_modules/next/package.json',
  'node_modules/pg/package.json',
  'public',
];

for (const relativePath of required) {
  if (!fs.existsSync(path.join(temp, relativePath))) {
    fs.rmSync(temp, { recursive: true, force: true });
    fail(`El artefacto no contiene ${relativePath}.`);
  }
}

const files = walk(temp);
const forbiddenFiles = files.filter((file) => {
  const normalized = file.replaceAll('\\', '/').toLowerCase();
  return normalized.includes('/.env') || normalized.includes('win32') || normalized.includes('darwin');
});

if (forbiddenFiles.length > 0) {
  fs.rmSync(temp, { recursive: true, force: true });
  fail(`El artefacto contiene archivos de entorno o plataforma incorrecta: ${forbiddenFiles[0]}`);
}

const sharpLinux = path.join(temp, 'node_modules', '@img', 'sharp-linux-x64');
const sharpLinuxMusl = path.join(temp, 'node_modules', '@img', 'sharp-linuxmusl-x64');

if (!fs.existsSync(sharpLinux) && !fs.existsSync(sharpLinuxMusl)) {
  fs.rmSync(temp, { recursive: true, force: true });
  fail('No se encontro Sharp para Linux en el artefacto.');
}

const totalBytes = files.reduce((total, file) => total + fs.statSync(file).size, 0);

fs.rmSync(target, { recursive: true, force: true });
fs.renameSync(temp, target);

console.log(`OK deploy/cpanel: ${files.length} archivos, ${(totalBytes / 1024 / 1024).toFixed(1)} MiB.`);
console.log('Este directorio debe incluirse en el commit de despliegue.');
