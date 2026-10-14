import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/password-reset.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function loadRecovery({ fails = false } = {}) {
  const writes = [];
  const messages = [];
  const modules = {
    '@/lib/prisma': { prisma: {
      verificationToken: {
        deleteMany: (query) => { writes.push(['delete', query.where]); return Promise.resolve({ count: 1 }); },
        create: (query) => { writes.push(['create', query.data]); return Promise.resolve(query.data); },
      },
      $transaction: (operations) => Promise.all(operations),
    } },
    '@/lib/email-verification': {
      createVerificationToken: () => 'test-plain-token',
      hashVerificationToken: () => 'test-hashed-token',
      getPasswordResetIdentifier: (email) => `password-reset:${email}`,
      getTrustedAppOrigin: () => 'https://theia.example.test',
      sendPasswordResetEmail: async (message) => { messages.push(message); if (fails) throw new Error('Delivery failed'); return true; },
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, URL, Date, require: (name) => modules[name] });
  return { ...exports, writes, messages };
}

test('user and admin recovery store only the token hash, expire after one hour and use the trusted site URL', async () => {
  const recovery = loadRecovery();
  const start = Date.now();
  assert.equal(await recovery.sendUserPasswordReset({ email: 'athlete@example.test', name: 'Atleta' }), true);
  const token = recovery.writes.find(([type]) => type === 'create')[1];
  assert.equal(token.token, 'test-hashed-token');
  assert.equal(token.identifier, 'password-reset:athlete@example.test');
  assert.ok(token.expires.getTime() >= start + 3600000);
  assert.ok(token.expires.getTime() <= Date.now() + 3600000);
  const message = recovery.messages[0];
  assert.equal(message.to, 'athlete@example.test');
  const url = new URL(message.resetUrl);
  assert.equal(url.origin, 'https://theia.example.test');
  assert.equal(url.searchParams.get('token'), 'test-plain-token');
});

test('failed delivery invalidates only the generated recovery token', async () => {
  const recovery = loadRecovery({ fails: true });
  await assert.rejects(recovery.sendUserPasswordReset({ email: 'athlete@example.test', name: null }), /Delivery failed/);
  assert.equal(recovery.writes.at(-1)[0], 'delete');
  assert.equal(recovery.writes.at(-1)[1].token, 'test-hashed-token');
});
