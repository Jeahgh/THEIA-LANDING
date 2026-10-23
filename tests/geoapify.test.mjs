import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { readLocationSuggestions, searchGeoapifyLocations } from '../src/lib/geoapify.ts';
import * as httpBody from '../src/lib/http-body.ts';

test('Geoapify results contain at most five distinct valid location suggestions', () => {
  const result = readLocationSuggestions({ results: [
    null, { formatted: 'missing identifier' }, { place_id: 'empty', formatted: ' ' },
    { place_id: '0', formatted: ' Lugar 0 ' }, { place_id: '0', formatted: 'duplicate' },
    ...Array.from({ length: 8 }, (_, i) => ({ place_id: String(i + 1), formatted: ` Lugar ${i + 1} ` })),
  ] });
  assert.equal(result.length, 5);
  assert.deepEqual(result[0], { id: '0', label: 'Lugar 0' });
  assert.deepEqual(readLocationSuggestions(null), []);
  assert.deepEqual(readLocationSuggestions({ results: 'invalid' }), []);
});

test('Geoapify uses its fixed endpoint, encodes text and key, limits results and prioritizes Chile without excluding other countries', async () => {
  await searchGeoapifyLocations('Santiago & apiKey=forged', 'fake-unit-key', async (url, options) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin + parsed.pathname, 'https://api.geoapify.com/v1/geocode/autocomplete');
    assert.deepEqual(Object.fromEntries(parsed.searchParams), {
      text: 'Santiago & apiKey=forged', lang: 'es', bias: 'countrycode:cl', format: 'json', limit: '5', apiKey: 'fake-unit-key',
    });
    assert.equal(options.redirect, 'error');
    assert.equal(options.cache, 'no-store');
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ results: [] });
  });
  await assert.rejects(searchGeoapifyLocations('Santiago', 'fake', async () => new Response('private upstream error', { status: 403 })), /geoapify_unavailable/);
});

const source = await readFile(new URL('../src/app/api/admin/locations/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function load({ user = { id: 'unit-test', role: 'ADMIN' }, key = 'fake-key', limited = false, burstLimited = false, budgetAllowed = true, budgetFails = false, fails = false } = {}) {
  const calls = [];
  const modules = {
    '@/lib/authz': { getCurrentUser: async () => { calls.push('authorize'); return user; } },
    '@/lib/http-body': httpBody,
    '@/lib/rate-limit': { consumeRateLimit: ({ scope }) => ({ allowed: scope === 'geoapify-search-burst' ? !burstLimited : !limited, retryAfterSeconds: 20 }) },
    '@/lib/location-search-budget': { reserveLocationSearch: async () => { calls.push('budget'); if (budgetFails) throw new Error('private DB error'); return { allowed: budgetAllowed, retryAfterSeconds: 3600 }; } },
    '@/lib/geoapify': { searchGeoapifyLocations: async query => { calls.push(['geoapify', query]); if (fails) throw new Error('private server error'); return [{ id: 'place-1', label: 'Santiago, Chile' }]; } },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, Response, process: { env: { GEOAPIFY_API_KEY: key } }, require: name => { assert.ok(name in modules, name); return modules[name]; } });
  return { post: exports.POST, calls };
}
const request = (body, type = 'application/json') => new Request('http://localhost/api/admin/locations', { method: 'POST', headers: { 'Content-Type': type }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('location endpoint denies anonymous users and non-admins before using quota or querying Geoapify', async () => {
  for (const [user, status] of [[null, 401], [{ id: 'unit-test', role: 'MEMBER' }, 403], [{ id: 'unit-test', role: 'COACH' }, 403]]) {
    const action = load({ user });
    assert.equal((await action.post(request({ query: 'Santiago' }))).status, status);
    assert.deepEqual(action.calls, ['authorize']);
  }
});

test('missing configuration, short queries, invalid input and rate limits do not consume the daily allowance or contact Geoapify', async () => {
  const cases = [
    [{ key: null }, { query: 'Santiago' }, 503],
    [{ key: '' }, { query: 'Santiago' }, 503],
    [{}, { query: 'Sa' }, 200], [{}, { query: 'x'.repeat(201) }, 400],
    [{}, { query: 123 }, 400], [{}, '{invalid', 400], [{}, { query: 'x'.repeat(3000) }, 413],
    [{ limited: true }, { query: 'Santiago' }, 429],
    [{ burstLimited: true }, { query: 'Santiago' }, 429],
  ];
  for (const [options, body, status] of cases) {
    const action = load(options);
    const response = await action.post(request(body));
    assert.equal(response.status, status);
    assert.equal(action.calls.includes('budget'), false);
    assert.equal(action.calls.some(call => Array.isArray(call) && call[0] === 'geoapify'), false);
  }
});

test('Geoapify responses are private, never expose the key and recover cleanly when the provider fails', async () => {
  const action = load();
  const response = await action.post(request({ query: ' Santiago ' }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  const body = await response.text();
  assert.ok(body.includes('Santiago'));
  assert.ok(!body.includes('fake-key'));
  assert.deepEqual(action.calls, ['authorize', 'budget', ['geoapify', 'Santiago']]);
  const failed = await load({ fails: true }).post(request({ query: 'Santiago' }));
  assert.equal(failed.status, 503);
  assert.ok(!(await failed.text()).includes('private server error'));
});

test('the daily limit and a failed quota store stop external calls and leave manual entry available', async () => {
  const limited = load({ budgetAllowed: false });
  const response = await limited.post(request({ query: 'Santiago' }));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '3600');
  assert.equal((await response.json()).dailyLimitReached, true);
  assert.deepEqual(limited.calls, ['authorize', 'budget']);
  const unavailable = load({ budgetFails: true });
  const failed = await unavailable.post(request({ query: 'Santiago' }));
  assert.equal(failed.status, 503);
  assert.ok(!(await failed.text()).includes('private DB error'));
  assert.deepEqual(unavailable.calls, ['authorize', 'budget']);
});
