const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = process.cwd();

function line(label, value) {
  console.log(`${label}: ${value || '(empty)'}`);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function resolvePackage(packageName) {
  try {
    const packagePath = require.resolve(`${packageName}/package.json`, { paths: [root] });
    const json = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log(`OK ${packageName}: ${json.version} (${packagePath})`);
  } catch (error) {
    try {
      const entryPath = require.resolve(packageName, { paths: [root] });
      console.log(`OK ${packageName}: resolved (${entryPath})`);
    } catch {
      console.log(`MISSING ${packageName}: ${error.message}`);
    }
  }
}

console.log('=== THEIA cPanel doctor ===');
line('cwd', root);
line('node', process.version);
line('execPath', process.execPath);
line('npm_execpath', process.env.npm_execpath);
line('NODE_ENV', process.env.NODE_ENV);
line('PORT', process.env.PORT);
line('HOST', process.env.HOST);

console.log('\n=== Files ===');
for (const file of ['package.json', 'package-lock.json', 'server.js', 'cpanel-smoke-server.js', 'prisma/schema.prisma']) {
  console.log(`${exists(file) ? 'OK' : 'MISSING'} ${file}`);
}

console.log('\n=== Packages ===');
for (const packageName of [
  'next',
  'react',
  'react-dom',
  'prisma',
  '@prisma/client',
  '@prisma/debug',
  '@prisma/engines',
  '@prisma/engines-version',
  '@prisma/fetch-engine',
  '@prisma/get-platform',
  '@prisma/adapter-pg',
  'pg',
  'next-auth',
]) {
  resolvePackage(packageName);
}

console.log('\n=== Generated Prisma Client ===');
for (const file of [
  'src/generated/prisma/index.js',
  'src/generated/prisma/index.d.ts',
  'src/generated/prisma/runtime/client.js',
]) {
  console.log(`${exists(file) ? 'OK' : 'MISSING'} ${file}`);
}

console.log('\n=== Prisma CLI syntax check ===');
const prismaCli = path.join(root, 'node_modules', 'prisma', 'build', 'index.js');
if (!fs.existsSync(prismaCli)) {
  console.log(`MISSING ${prismaCli}`);
  process.exitCode = 1;
} else {
  const stats = fs.statSync(prismaCli);
  console.log(`Prisma CLI size: ${stats.size} bytes`);
  const result = spawnSync(process.execPath, ['--check', prismaCli], {
    cwd: root,
    encoding: 'utf8',
  });

  if (result.status === 0) {
    console.log('OK Prisma CLI syntax');
  } else {
    console.log(`FAIL Prisma CLI syntax, exit ${result.status}`);
    if (result.stderr) console.error(result.stderr);
    process.exitCode = result.status || 1;
  }
}
