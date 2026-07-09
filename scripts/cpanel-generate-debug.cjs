const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = process.cwd();
const logDir = path.join(root, 'tmp');
const logPath = path.join(logDir, 'prisma-generate-error.log');
const prismaCli = path.join(root, 'node_modules', 'prisma', 'build', 'index.js');

function tail(value, maxChars = 12000) {
  if (!value) return '';
  return value.length > maxChars ? value.slice(value.length - maxChars) : value;
}

console.log('=== THEIA Prisma generate debug ===');
console.log(`cwd: ${root}`);
console.log(`node: ${process.version}`);
console.log(`prismaCli: ${prismaCli}`);

if (!fs.existsSync(prismaCli)) {
  console.error(`MISSING Prisma CLI: ${prismaCli}`);
  process.exit(1);
}

const result = spawnSync(process.execPath, [prismaCli, 'generate'], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 1024 * 1024 * 80,
  env: {
    ...process.env,
    NO_COLOR: '1',
    PRISMA_HIDE_UPDATE_MESSAGE: '1',
  },
});

if (result.stdout) {
  console.log('\n=== stdout ===');
  console.log(result.stdout);
}

if (result.stderr) {
  fs.mkdirSync(logDir, { recursive: true });
  fs.writeFileSync(logPath, result.stderr);
}

if (result.status === 0) {
  console.log('OK prisma generate');
  process.exit(0);
}

console.error(`FAIL prisma generate, exit ${result.status}`);
if (result.error) {
  console.error(result.error);
}

if (result.stderr) {
  console.error(`Full stderr saved to: ${logPath}`);
  console.error('\n=== stderr tail ===');
  console.error(tail(result.stderr));
}

process.exit(result.status || 1);
