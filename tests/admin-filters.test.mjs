import assert from 'node:assert/strict';
import test from 'node:test';
import { filterAdminItems, normalizeAdminText, readAdminFilters, visibilityFilter } from '../src/lib/admin-filters.ts';

const fields = [
  { name: 'season', options: [{ value: '2026' }, { value: '2027' }] },
  { name: 'distance', options: [{ value: '70.3' }, { value: '10k' }] },
  visibilityFilter,
];
const records = [
  { id: 'a', text: 'Triatlón Valdivia', values: { season: '2026', distance: '70.3', visibility: 'visible' } },
  { id: 'b', text: 'Triatlón Valdivia', values: { season: '2027', distance: '70.3', visibility: 'hidden' } },
  { id: 'c', text: 'Running Santiago', values: { season: '2026', distance: '10k', visibility: 'visible' } },
];
const find = (params) => filterAdminItems(records, readAdminFilters(params, fields), (record) => record).map((record) => record.id);

test('combined admin filters narrow results without changing original order or content', () => {
  assert.deepEqual(find({ season: '2026', visibility: 'visible' }), ['a', 'c']);
  assert.deepEqual(find({ season: '2026', distance: '70.3', q: 'valdivia' }), ['a']);
  assert.deepEqual(find({ season: '2027', visibility: 'visible' }), []);
  assert.deepEqual(records.map((record) => record.id), ['a', 'b', 'c']);
});

test('Spanish searches ignore accents, capitalization, extra spaces and word order', () => {
  assert.deepEqual(find({ q: ' VALDIVIA  triatlon ' }), ['a', 'b']);
  assert.deepEqual(find({ q: 'santiago running' }), ['c']);
  assert.deepEqual(find({ q: 'valdivia running' }), []);
});

test('missing and cleared filters restore every record, including hidden ones', () => {
  assert.deepEqual(find(undefined), ['a', 'b', 'c']);
  assert.deepEqual(find({ q: ' ', season: '', distance: '', visibility: '' }), ['a', 'b', 'c']);
});

test('unknown parameters and unsupported options do not hide all content', () => {
  assert.deepEqual(find({ season: 'invalid', distance: '999', visibility: 'anything', role: 'ADMIN' }), ['a', 'b', 'c']);
  assert.deepEqual(readAdminFilters({ q: ['Valdivia', 'Santiago'], season: ['2027', '2026'] }, fields), {
    query: 'Valdivia', values: { season: '2027', distance: '', visibility: '' },
  });
});

test('distance keys are consistent across text case and spacing', () => {
  assert.equal(normalizeAdminText('  10K  /   21K '), normalizeAdminText('10k / 21k'));
});
