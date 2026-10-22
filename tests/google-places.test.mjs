import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { readLocationSuggestions, searchGoogleLocations } from '../src/lib/google-places.ts';
import * as httpBody from '../src/lib/http-body.ts';

test('Google results contain at most five distinct place suggestions with no query predictions', () => {
  const result = readLocationSuggestions({ suggestions: [
    null, { queryPrediction: { text: { text: 'a query' } } },
    ...Array.from({ length: 8 }, (_, i) => ({ placePrediction: { placeId: String(i), text: { text: ` Lugar ${i} ` } } })),
    { placePrediction: { placeId: '0', text: { text: 'duplicate' } } },
  ] });
  assert.equal(result.length, 5);
  assert.deepEqual(result[0], { id: '0', label: 'Lugar 0' });
  assert.deepEqual(readLocationSuggestions(null), []);
});

test('Places uses a fixed Google endpoint, a server header, limited fields and a timeout without caching', async () => {
  await searchGoogleLocations('Santiago', 'fake-unit-key', async (url, options) => {
    assert.equal(url, 'https://places.googleapis.com/v1/places:autocomplete');
    assert.equal(options.headers['X-Goog-Api-Key'], 'fake-unit-key');
    assert.equal(options.headers['X-Goog-FieldMask'], 'suggestions.placePrediction.placeId,suggestions.placePrediction.text.text');
    assert.deepEqual(JSON.parse(options.body), { input: 'Santiago', languageCode: 'es', regionCode: 'cl' });
    assert.equal(options.cache, 'no-store');
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ suggestions: [] });
  });
  await assert.rejects(searchGoogleLocations('Santiago', 'fake', async () => new Response('private upstream error', { status: 403 })), /google_places_unavailable/);
});

const source = await readFile(new URL('../src/app/api/admin/locations/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function load({ user = { id: 'unit-test', role: 'ADMIN' }, key = 'fake-key', limited = false, fails = false } = {}) {
  const calls = [];
  const modules = {
    '@/lib/authz': { getCurrentUser: async () => { calls.push('authorize'); return user; } },
    '@/lib/http-body': httpBody,
    '@/lib/rate-limit': { consumeRateLimit: () => ({ allowed: !limited, retryAfterSeconds: 20 }) },
    '@/lib/google-places': { searchGoogleLocations: async query => { calls.push(['google', query]); if (fails) throw new Error('private server error'); return [{ id: 'place-1', label: 'Santiago, Chile' }]; } },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, Response, process: { env: { GOOGLE_PLACES_API_KEY: key } }, require: name => { assert.ok(name in modules, name); return modules[name]; } });
  return { post: exports.POST, calls };
}
const request = (body, type = 'application/json') => new Request('http://localhost/api/admin/locations', { method: 'POST', headers: { 'Content-Type': type }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('Places endpoint denies anonymous users and non-admins before querying Google', async () => {
  for (const [user, status] of [[null, 401], [{ id: 'unit-test', role: 'MEMBER' }, 403], [{ id: 'unit-test', role: 'COACH' }, 403]]) {
    const action = load({ user });
    assert.equal((await action.post(request({ query: 'Santiago' }))).status, status);
    assert.deepEqual(action.calls, ['authorize']);
  }
});

test('missing configuration, short queries, invalid input and rate limits do not contact Google', async () => {
  const cases = [
    [{ key: null }, { query: 'Santiago' }, 503],
    [{ key: '' }, { query: 'Santiago' }, 503],
    [{}, { query: 'Sa' }, 200], [{}, { query: 'x'.repeat(201) }, 400],
    [{}, { query: 123 }, 400], [{}, '{invalid', 400], [{}, { query: 'x'.repeat(3000) }, 413],
    [{ limited: true }, { query: 'Santiago' }, 429],
  ];
  for (const [options, body, status] of cases) {
    const action = load(options);
    const response = await action.post(request(body));
    assert.equal(response.status, status);
    assert.equal(action.calls.some(call => Array.isArray(call) && call[0] === 'google'), false);
  }
});

test('Places responses are private, never expose the key and recover cleanly when Google fails', async () => {
  const action = load();
  const response = await action.post(request({ query: ' Santiago ' }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  const body = await response.text();
  assert.ok(body.includes('Santiago'));
  assert.ok(!body.includes('fake-key'));
  const failed = await load({ fails: true }).post(request({ query: 'Santiago' }));
  assert.equal(failed.status, 503);
  assert.ok(!(await failed.text()).includes('private server error'));
});
