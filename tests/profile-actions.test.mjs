import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/app/perfil/actions.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function loadActions({ denied = false, allowed = true, sent = true, fails = false } = {}) {
  const calls = [];
  const modules = {
    'next/cache': { revalidatePath: () => {} },
    'next/navigation': { redirect: (url) => { throw new Error(url); } },
    '@/lib/authz': { requireActiveUser: async () => { calls.push('authorize'); if (denied) throw new Error('Unauthorized'); return { id: 'signed-in', email: 'athlete@example.test', name: 'Atleta' }; } },
    '@/lib/prisma': { prisma: {} },
    '@/lib/rate-limit': { consumeRateLimit: (options) => { calls.push(['limit', options]); return { allowed }; } },
    '@/lib/password-reset': { sendUserPasswordReset: async (user) => { calls.push(['send', user]); if (fails) throw new Error('SMTP unavailable'); return sent; } },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (name) => { assert.ok(name in modules); return modules[name]; } });
  return { ...exports, calls };
}

test('profile recovery requires authentication before sending or accessing an account', async () => {
  const actions = loadActions({ denied: true });
  await assert.rejects(actions.requestProfilePasswordReset(), /Unauthorized/);
  assert.deepEqual(actions.calls, ['authorize']);
});

test('profile recovery uses the signed-in account, ignores supplied targets and does not change passwords', async () => {
  const actions = loadActions();
  assert.equal((await actions.requestProfilePasswordReset({ email: 'someone-else@example.test' })).success, true);
  assert.equal(actions.calls.at(-1)[1].email, 'athlete@example.test');
  assert.equal(actions.calls[1][1].scope, 'email-password-reset');
});

test('profile recovery respects the shared account rate limit', async () => {
  const actions = loadActions({ allowed: false });
  assert.equal((await actions.requestProfilePasswordReset()).tone, 'error');
  assert.equal(actions.calls.some((call) => Array.isArray(call) && call[0] === 'send'), false);
});

test('missing local mail transport or delivery failure never reports that an email was sent', async () => {
  for (const options of [{ sent: false }, { fails: true }]) {
    const result = await loadActions(options).requestProfilePasswordReset();
    assert.equal(result.success, undefined);
    assert.ok(result.tone === 'info' || result.tone === 'error');
  }
});
