import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../scripts/container-tools.cjs', import.meta.url), 'utf8');

function invoke(action, args = [], { seedExists = false, marker = true, childStatus = 0 } = {}) {
  const calls = [];
  const messages = [];
  const exitSignal = {};
  let exitCode;
  const processMock = {
    argv: ['node', 'container-tools.cjs', action, ...args], execPath: '/usr/local/bin/node',
    env: { THEIA_CONTAINER_CONTEXT: '1', DATABASE_URL: 'postgresql://test:test@db:5432/test' },
    exit(code) { exitCode = code; throw exitSignal; },
  };
  const modules = {
    fs: { existsSync: filename => filename === '/run/theia-container-context' ? marker : seedExists },
    path,
    child_process: { spawnSync: (command, arguments_, options) => {
      calls.push({ command, args: arguments_, env: options.env });
      return { status: childStatus };
    } },
  };
  try {
    vm.runInNewContext(source, {
      __dirname: '/app/scripts', process: processMock,
      console: { error: message => messages.push(message) }, require: name => modules[name],
    });
  } catch (cause) { if (cause !== exitSignal) throw cause; }
  return { calls, messages, exitCode };
}

test('normal migration runs only migrate deploy even when seed arguments are supplied', () => {
  const result = invoke('db:deploy', ['db', 'seed']);
  assert.equal(result.exitCode, 0);
  assert.equal(result.calls.length, 1);
  assert.deepEqual(Array.from(result.calls[0].args.slice(1)), ['migrate', 'deploy']);
  assert.equal(result.calls[0].env.THEIA_DATABASE_TARGET, 'container');
});

test('seed without explicit confirmation fails before starting any child process', () => {
  const result = invoke('db:seed', [], { seedExists: true });
  assert.equal(result.exitCode, 1);
  assert.equal(result.calls.length, 0);
  assert.match(result.messages[0], /--confirm-seed/);
});

test('migrator cannot seed even with explicit confirmation because its seed file is absent', () => {
  const result = invoke('db:seed', ['--confirm-seed']);
  assert.equal(result.exitCode, 1);
  assert.equal(result.calls.length, 0);
  assert.match(result.messages[0], /target seeder/);
});

test('explicit seeder execution starts the seed and propagates its exit status', () => {
  for (const childStatus of [0, 1]) {
    const result = invoke('db:seed', ['--confirm-seed'], { seedExists: true, childStatus });
    assert.equal(result.exitCode, childStatus);
    assert.deepEqual(Array.from(result.calls[0].args), ['prisma/seed.mjs', '--confirm-seed']);
  }
});

test('container commands reject execution outside the marked Docker context', () => {
  const result = invoke('db:deploy', [], { marker: false });
  assert.equal(result.exitCode, 1);
  assert.equal(result.calls.length, 0);
});
