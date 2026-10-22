import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/app/admin/usuarios/actions.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
class DatabaseError extends Error { constructor(code) { super(code); this.code = code; } }

function load({ denied = false, limited = false, duplicate = false, race = false, mail = true, mailFails = false } = {}) {
  const calls = [];
  const modules = {
    'next/cache': { revalidatePath: path => calls.push(['refresh', path]) },
    'next/navigation': { redirect: () => {} },
    '@/generated/prisma': { Role: { MEMBER: 'MEMBER', COACH: 'COACH', ADMIN: 'ADMIN' }, Prisma: { PrismaClientKnownRequestError: DatabaseError } },
    '@/lib/authz': { requireAdmin: async () => { calls.push(['authorize']); if (denied) throw new Error('Unauthorized'); return { id: 'actor' }; } },
    '@/lib/rate-limit': { consumeRateLimit: () => ({ allowed: !limited }) },
    '@/lib/prisma': { prisma: { user: {
      findUnique: async () => { calls.push(['find']); return duplicate ? { id: 'existing' } : null; },
      create: async ({ data }) => { if (race) throw new DatabaseError('P2002'); calls.push(['create', data]); return { id: 'fake-id', ...data }; },
    } } },
    '@/lib/password-reset': { sendUserPasswordReset: async user => { calls.push(['email', user]); if (mailFails) throw new Error('Mail unavailable'); return mail; } },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: name => { assert.ok(name in modules, name); return modules[name]; } });
  return { create: exports.createUser, calls };
}

function form(values = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: ' Atleta Prueba ', email: 'ATLETA@example.test ', phone: '+56 9 1234 5678', role: 'MEMBER', ...values })) data.set(key, value);
  return data;
}

test('creating a user always requires admin authorization first', async () => {
  const action = load({ denied: true });
  await assert.rejects(action.create(form()), /Unauthorized/);
  assert.deepEqual(action.calls, [['authorize']]);
});

test('creation validates fields and role before touching the database', async () => {
  for (const values of [{ name: 'x' }, { name: 'x'.repeat(81) }, { email: 'invalid' }, { email: 'one,two@example.test' }, { email: 'Name<email@example.test>' }, { phone: '1'.repeat(41) }, { role: '' }, { role: 'OWNER' }]) {
    const action = load();
    assert.ok((await action.create(form(values))).error);
    assert.deepEqual(action.calls, [['authorize']]);
  }
});

test('creation respects the per-administrator rate limit', async () => {
  const action = load({ limited: true });
  assert.ok((await action.create(form())).error);
  assert.deepEqual(action.calls, [['authorize']]);
});

test('all supported roles use only validated fields and the user chooses their password by email', async () => {
  for (const role of ['MEMBER', 'COACH', 'ADMIN']) {
    const action = load();
    const result = await action.create(form({ role, passwordHash: 'forged', emailVerified: '2020-01-01', id: 'other-user' }));
    assert.equal(result.created, true);
    const data = action.calls.find(([type]) => type === 'create')[1];
    assert.deepEqual({ ...data }, { name: 'Atleta Prueba', email: 'atleta@example.test', phone: '+56 9 1234 5678', role, isActive: true });
    assert.equal(action.calls.filter(([type]) => type === 'email').length, 1);
  }
});

test('duplicate checks and simultaneous creation conflicts never replace an existing account or send mail', async () => {
  for (const options of [{ duplicate: true }, { race: true }]) {
    const action = load(options);
    assert.match((await action.create(form())).error, /Ya existe/);
    assert.equal(action.calls.some(([type]) => type === 'email'), false);
  }
});

test('mail failure accurately reports that the account exists and the email can be retried', async () => {
  for (const options of [{ mail: false }, { mailFails: true }]) {
    const action = load(options);
    const result = await action.create(form());
    assert.equal(result.created, true);
    assert.equal(result.tone, 'info');
    assert.match(result.message, /correo no se envió/);
    assert.equal(action.calls.filter(([type]) => type === 'create').length, 1);
  }
});
