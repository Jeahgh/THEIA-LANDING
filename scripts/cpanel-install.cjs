const { spawnSync } = require('child_process');
const path = require('path');

const root = process.cwd();
const npmExecPath = process.env.npm_execpath;

if (!npmExecPath) {
  console.error('npm_execpath is not available. Run this through cPanel Run JS script / npm run.');
  process.exit(1);
}

const installArgs = [
  'install',
  '--no-audit',
  '--no-fund',
  '--include=dev',
  '--legacy-peer-deps',
  '--package-lock=false',
];

const npmCommand = npmExecPath.endsWith('.js') ? process.execPath : npmExecPath;
const npmArgs = npmExecPath.endsWith('.js') ? [npmExecPath, ...installArgs] : installArgs;

console.log('=== THEIA cPanel install ===');
console.log(`cwd: ${root}`);
console.log(`node: ${process.version}`);
console.log(`npm_execpath: ${npmExecPath}`);
console.log(`command: ${npmCommand} ${npmArgs.join(' ')}`);

const result = spawnSync(npmCommand, npmArgs, {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    NPM_CONFIG_ENGINE_STRICT: 'false',
    NEXT_TELEMETRY_DISABLED: '1',
  },
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
