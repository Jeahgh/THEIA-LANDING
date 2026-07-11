const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const artifact = path.join(root, 'deploy', 'cpanel');
const failures = [];
const warnings = [];

function formatBytes(value) {
  if (!Number.isFinite(value)) return 'desconocido';
  return `${(value / 1024 / 1024).toFixed(1)} MiB`;
}

function ok(label, detail = '') {
  console.log(`OK   ${label}${detail ? `: ${detail}` : ''}`);
}

function fail(label, detail = '') {
  failures.push(label);
  console.log(`FAIL ${label}${detail ? `: ${detail}` : ''}`);
}

function warn(label, detail = '') {
  warnings.push(label);
  console.log(`WARN ${label}${detail ? `: ${detail}` : ''}`);
}

function info(label, detail = '') {
  console.log(`INFO ${label}${detail ? `: ${detail}` : ''}`);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function packageFile(base, packageName) {
  return path.join(base, 'node_modules', ...packageName.split('/'), 'package.json');
}

function directoryStats(directory) {
  let files = 0;
  let bytes = 0;
  const pending = [directory];

  while (pending.length > 0) {
    const current = pending.pop();

    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(fullPath);
      else if (entry.isFile()) {
        files += 1;
        bytes += fs.statSync(fullPath).size;
      }
    }
  }

  return { files, bytes };
}

function checkNode() {
  const [major, minor] = process.versions.node.split('.').map(Number);
  const supported = major === 22 && minor >= 12;

  if (supported) ok('Node compatible', `${process.version} (${process.platform}/${process.arch})`);
  else fail('Node incompatible', `${process.version}; selecciona Node 22.12 o superior de la rama 22`);

  info('Ejecutable Node', process.execPath);
  info('Entorno Passenger', process.env.PASSENGER_APP_ENV || 'no detectado');
  info('NODE_ENV', process.env.NODE_ENV || 'no definido');
  info('PORT', process.env.PORT ? 'definido por cPanel' : 'no definido en este proceso');
}

function checkResources() {
  if (typeof fs.statfsSync === 'function') {
    const disk = fs.statfsSync(root);
    const available = disk.bavail * disk.bsize;
    const total = disk.blocks * disk.bsize;
    info('Disco disponible', `${formatBytes(available)} de ${formatBytes(total)}`);

    if (available < 150 * 1024 * 1024) {
      warn('Poco espacio libre', 'menos de 150 MiB para logs y uploads');
    }

    if (process.platform !== 'win32' && Number.isFinite(disk.ffree)) {
      info('Inodos libres', String(disk.ffree));
    }
  }

  const constrained = typeof process.constrainedMemory === 'function' ? process.constrainedMemory() : 0;
  info('Memoria visible', `${formatBytes(os.freemem())} libre de ${formatBytes(os.totalmem())}`);
  if (constrained > 0 && constrained < 1024 ** 5) {
    info('Limite de memoria del proceso', formatBytes(constrained));
  }

  if (fs.existsSync('/proc/self/limits')) {
    const limits = fs
      .readFileSync('/proc/self/limits', 'utf8')
      .split(/\r?\n/)
      .filter((line) => /Max (data size|resident set|address space|processes|open files)/.test(line));
    for (const line of limits) info('Limite Linux', line.trim().replace(/\s{2,}/g, ' | '));
  }
}

function checkEnvironment() {
  const required = [
    'DATABASE_URL',
    'AUTH_SECRET',
    'AUTH_URL',
    'NEXT_PUBLIC_APP_URL',
    'AUTH_GOOGLE_ID',
    'AUTH_GOOGLE_SECRET',
    'EMAIL_FROM',
  ];

  for (const name of required) {
    if (process.env[name]?.trim()) ok(`Variable ${name}`, 'presente');
    else fail(`Variable ${name}`, 'ausente');
  }

  const smtpReady = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].every((name) => process.env[name]?.trim());
  const resendReady = Boolean(process.env.RESEND_API_KEY?.trim());

  if (smtpReady || resendReady) ok('Transporte de correo', smtpReady ? 'SMTP' : 'Resend');
  else warn('Transporte de correo ausente', 'registro y recuperacion no enviaran mensajes');

  info('DIRECT_URL', process.env.DIRECT_URL ? 'presente (solo migraciones)' : 'ausente (opcional en runtime)');
}

function checkArtifact() {
  const required = [
    'server.js',
    'package.json',
    '.next/BUILD_ID',
    '.next/static',
    'node_modules/next/package.json',
    'node_modules/pg/package.json',
    'public',
    'public/uploads',
  ];

  for (const relativePath of required) {
    const fullPath = path.join(artifact, relativePath);
    if (fs.existsSync(fullPath)) ok(`Artefacto ${relativePath}`);
    else fail(`Artefacto ${relativePath}`, 'ausente');
  }

  if (!fs.existsSync(artifact)) return;

  const rootLock = readJson(path.join(root, 'package-lock.json'));
  for (const packageName of ['next', 'react', 'react-dom', 'pg']) {
    const installed = readJson(packageFile(artifact, packageName));
    const expected = rootLock?.packages?.[`node_modules/${packageName}`]?.version;

    if (!installed) {
      fail(`Paquete runtime ${packageName}`, 'ausente');
    } else if (expected && installed.version !== expected) {
      fail(`Paquete runtime ${packageName}`, `instalado ${installed.version}, lock ${expected}`);
    } else {
      ok(`Paquete runtime ${packageName}`, installed.version);
    }
  }

  const imagePackages = path.join(artifact, 'node_modules', '@img');
  const imageNames = fs.existsSync(imagePackages) ? fs.readdirSync(imagePackages) : [];
  const linuxSharp = imageNames.some((name) => /^sharp-linux(?:musl)?-/.test(name));
  const foreignSharp = imageNames.filter((name) => /sharp-(?:win32|darwin)-/.test(name));

  if (linuxSharp) ok('Sharp para Linux');
  else fail('Sharp para Linux', 'ausente');

  if (foreignSharp.length === 0) ok('Artefacto sin binarios Windows/macOS');
  else fail('Binarios de plataforma incorrecta', foreignSharp.join(', '));

  const stats = directoryStats(artifact);
  info('Tamano del artefacto', `${stats.files} archivos, ${formatBytes(stats.bytes)}`);

  try {
    fs.accessSync(path.join(artifact, 'public', 'uploads'), fs.constants.W_OK);
    ok('Uploads escribibles');
  } catch {
    fail('Uploads no escribibles', path.join(artifact, 'public', 'uploads'));
  }

  if (fs.existsSync(path.join(root, 'node_modules'))) {
    warn('node_modules raiz detectado', 'el artefacto no lo usa; puede consumir cuota innecesaria en cPanel');
  }
}

async function checkDatabase() {
  if (!process.env.DATABASE_URL) return;

  const pgPackage = path.join(artifact, 'node_modules', 'pg');
  if (!fs.existsSync(pgPackage)) return;

  let client;
  try {
    const { Client } = require(pgPackage);
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 8000,
      query_timeout: 8000,
      statement_timeout: 8000,
    });
    await client.connect();
    await client.query('SELECT 1');
    ok('Conexion PostgreSQL', 'SELECT 1');
  } catch (error) {
    fail('Conexion PostgreSQL', `${error?.name || 'Error'} ${error?.code || ''}`.trim());
  } finally {
    if (client) await client.end().catch(() => {});
  }
}

async function main() {
  console.log('=== THEIA cPanel doctor (no muestra secretos) ===');
  info('Directorio', root);
  checkNode();
  checkResources();
  checkEnvironment();
  checkArtifact();
  await checkDatabase();

  console.log('\n=== Resumen ===');
  console.log(`Fallos: ${failures.length}; advertencias: ${warnings.length}`);
  if (failures.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`FAIL doctor: ${error?.stack || error}`);
  process.exitCode = 1;
});
