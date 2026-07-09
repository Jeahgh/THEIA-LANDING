const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const standaloneServer = path.join(root, '.next', 'standalone', 'server.js');
const nextBuildId = path.join(root, '.next', 'BUILD_ID');
const nextServerDir = path.join(root, '.next', 'server');
const isCpanel =
  root.startsWith('/home/theiaspo/') ||
  process.execPath.includes('/opt/alt/alt-nodejs') ||
  Boolean(process.env.PASSENGER_APP_ENV);

if (isCpanel) {
  console.log('Skipping Next.js build on cPanel.');
  console.log('cPanel does not have enough memory for next build in this account.');

  if (fs.existsSync(nextBuildId) && fs.existsSync(nextServerDir)) {
    console.log('OK prebuilt .next output exists. Restart the Node.js app.');
    process.exit(0);
  }

  if (fs.existsSync(standaloneServer)) {
    console.log('OK standalone output exists. Restart the Node.js app.');
    process.exit(0);
  }

  console.error('Missing prebuilt .next output.');
  console.error('Run npm run build:cpanel locally, commit/push .next production files, then pull in cPanel.');
  process.exit(1);
}

const buildScript = path.join(root, 'scripts', 'cpanel-build-local.cjs');
const result = spawnSync(process.execPath, [buildScript], {
  cwd: root,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
