const { spawnSync } = require('child_process');
const path = require('path');

const cwd = process.cwd();
const isCpanel =
  cwd.startsWith('/home/theiaspo/') ||
  process.execPath.includes('/opt/alt/alt-nodejs') ||
  Boolean(process.env.PASSENGER_APP_ENV);

if (isCpanel) {
  console.log('Skipping prisma generate on cPanel.');
  console.log('The Prisma client is generated locally in src/generated/prisma and committed to Git.');
  process.exit(0);
}

const prismaCli = path.join(cwd, 'node_modules', 'prisma', 'build', 'index.js');
const result = spawnSync(process.execPath, [prismaCli, 'generate'], {
  cwd,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
