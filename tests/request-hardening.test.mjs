import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import * as bodyReader from '../src/lib/http-body.ts';

async function loadRoute(route, user = { id: 'unit-test-only', role: 'ADMIN' }) {
  const source = await readFile(new URL(`../src/app/api/${route}/route.ts`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const forbidden = () => { throw new Error('Must not access database, mail or disk for a rejected request'); };
  const modules = {
    'next/server': { NextResponse: { json: (data, options) => Response.json(data, options) } },
    '@/lib/http-body': bodyReader,
    '@/lib/authz': { getCurrentUser: async () => user },
    '@/lib/rate-limit': { consumeRateLimit: () => ({ allowed: true }), getClientAddress: () => '127.0.0.1' },
    '@/lib/prisma': { prisma: new Proxy({}, { get: forbidden }) },
    '@/lib/email-verification': new Proxy({}, { get: forbidden }),
    '@/lib/image-upload': { validateImageUpload: forbidden },
    '@/lib/uploads': { uploadPublicUrl: forbidden },
    'node:fs/promises': { mkdir: forbidden, writeFile: forbidden },
    'node:path': {},
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, Request, Response, File, FormData, Uint8Array, console, require: name => {
    assert.ok(name in modules, name);
    return modules[name];
  } });
  return exports.POST;
}

test('registration rejects oversized, malformed and incorrectly typed bodies before database or email', async () => {
  const post = await loadRoute('auth/register');
  for (const [type, body, status] of [
    ['text/plain', '{}', 415],
    ['application/json', '{broken', 400],
    ['application/json', JSON.stringify({ name: 'Atleta', email: `${'x'.repeat(260)}@example.test` }), 400],
    ['application/json', JSON.stringify({ name: 'x'.repeat(9000) }), 413],
  ]) {
    const response = await post(new Request('http://localhost/api/auth/register', { method: 'POST', headers: { 'Content-Type': type }, body }));
    assert.equal(response.status, status);
  }
});

for (const route of ['admin/uploads', 'profile/avatar']) {
  test(`${route}: authorization still precedes multipart reading`, async () => {
    const post = await loadRoute(route, null);
    assert.equal((await post(new Request(`http://localhost/api/${route}`, { method: 'POST', body: 'invalid' }))).status, 401);
  });

  test(`${route}: a large chunked body is stopped without trusting Content-Length`, async () => {
    const post = await loadRoute(route);
    let cancelled = false;
    const request = new Request(`http://localhost/api/${route}`, {
      method: 'POST', duplex: 'half', headers: { 'Content-Type': 'multipart/form-data; boundary=test' },
      body: new ReadableStream({ pull(controller) { controller.enqueue(new Uint8Array(512 * 1024)); }, cancel() { cancelled = true; } }),
    });
    assert.equal((await post(request)).status, 413);
    assert.equal(cancelled, true);
  });

  test(`${route}: malformed multipart data returns a controlled error`, async () => {
    const post = await loadRoute(route);
    const response = await post(new Request(`http://localhost/api/${route}`, {
      method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: 'invalid',
    }));
    assert.equal(response.status, 400);
  });
}

test('direct seed execution requires confirmation before reading environment or creating a client', async () => {
  const source = (await readFile(new URL('../prisma/seed.mjs', import.meta.url), 'utf8')).replace(/^import .*;\r?$/gm, '');
  const calls = [];
  const execute = vm.runInNewContext(`(async () => { ${source}\n })`, {
    nextEnv: { loadEnvConfig: () => calls.push('environment') },
    prismaClientPkg: { PrismaClient: class { constructor() { calls.push('database'); } } },
    process: { argv: ['node', 'prisma/seed.mjs'], env: {} },
  });
  await assert.rejects(execute(), /--confirm-seed/);
  assert.deepEqual(calls, []);
});
