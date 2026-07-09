const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const nextBuildId = path.join(root, '.next', 'BUILD_ID');
const nextServerDir = path.join(root, '.next', 'server');
const isCpanel =
  root.startsWith('/home/theiaspo/') ||
  process.execPath.includes('/opt/alt/alt-nodejs') ||
  Boolean(process.env.PASSENGER_APP_ENV);

if (isCpanel) {
  console.log('Skipping local Next.js build on cPanel.');
  console.log('Use the prebuilt .next output committed from the local machine.');

  if (fs.existsSync(nextBuildId) && fs.existsSync(nextServerDir)) {
    console.log('OK prebuilt .next output exists. Restart the Node.js app.');
    process.exit(0);
  }

  console.error('Missing prebuilt .next output. Pull the latest deployment commit first.');
  process.exit(1);
}

function copyDir(source, target) {
  if (!fs.existsSync(source)) return;
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');

console.log('=== THEIA local cPanel build ===');
console.log('Building Next.js standalone output...');

const build = spawnSync(process.execPath, [nextBin, 'build', '--webpack'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: '1',
  },
});

if (build.error) {
  console.error(build.error);
  process.exit(1);
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const standaloneDir = path.join(root, '.next', 'standalone');
const standaloneServer = path.join(standaloneDir, 'server.js');

if (!fs.existsSync(standaloneServer)) {
  console.error('Standalone server was not generated at .next/standalone/server.js');
  process.exit(1);
}

copyDir(path.join(root, 'public'), path.join(standaloneDir, 'public'));
copyDir(path.join(root, '.next', 'static'), path.join(standaloneDir, '.next', 'static'));

for (const fileName of fs.readdirSync(standaloneDir)) {
  if (fileName === '.env' || fileName.startsWith('.env.')) {
    fs.rmSync(path.join(standaloneDir, fileName), { force: true });
  }
}

console.log('Standalone build ready at .next/standalone');
