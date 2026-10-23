import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/location-search-budget.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function loadBudget(rows = new Map()) {
  const queries = [];
  const exports = {};
  vm.runInNewContext(compiled, { exports, Date, require: (name) => {
    assert.equal(name, '@/lib/prisma');
    return { prisma: { locationSearchUsage: { upsert: async (query) => {
      queries.push(query);
      const key = query.where.day.toISOString();
      assert.equal(query.create.day.toISOString(), key);
      assert.equal(query.create.requests, 1);
      assert.equal(query.update.requests.increment, 1);
      const requests = (rows.get(key) ?? 0) + 1;
      rows.set(key, requests);
      return { requests };
    } } } };
  } });
  return { ...exports, queries };
}

test('all admins share a persistent daily allowance and parallel reservations stop at 500 external calls', async () => {
  const rows = new Map();
  const budget = loadBudget(rows);
  const now = new Date('2026-10-23T15:00:00Z');
  const results = await Promise.all(Array.from({ length: 510 }, () => budget.reserveLocationSearch(now)));
  assert.equal(results.filter((result) => result.allowed).length, 500);
  assert.equal(budget.queries[0].where.day.toISOString(), '2026-10-23T00:00:00.000Z');
  assert.equal((await loadBudget(rows).reserveLocationSearch(now)).allowed, false);
});

test('the allowance resets on the next UTC date and reports the remaining wait', async () => {
  const budget = loadBudget();
  const result = await budget.reserveLocationSearch(new Date('2026-10-23T23:59:30Z'));
  assert.equal(result.retryAfterSeconds, 30);
  assert.equal((await budget.reserveLocationSearch(new Date('2026-10-24T00:00:00Z'))).allowed, true);
  assert.notEqual(budget.queries[0].where.day.toISOString(), budget.queries[1].where.day.toISOString());
});
