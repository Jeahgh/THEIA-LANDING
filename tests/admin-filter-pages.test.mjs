import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import * as jsx from 'react/jsx-runtime';
import * as filters from '../src/lib/admin-filters.ts';
import { getRaceStatus } from '../src/lib/race-schedule.ts';

const date = new Date('2026-11-29T00:00:00Z');
const cases = [
  {
    section: 'competencias', model: 'race', params: { season: '2027', q: '70.3', status: 'upcoming' },
    records: [
      { id: '1', name: 'Valdivia', date, season: 2027, distance: '70.3', type: 'TRIATLON', isActive: true, status: 'UPCOMING' },
      { id: '2', name: 'Valdivia anterior', date, season: 2026, distance: '70.3', type: 'TRIATLON', isActive: true, status: 'UPCOMING' },
      { id: '3', name: 'Valdivia finalizada', date, season: 2027, distance: '70.3', type: 'TRIATLON', isActive: true, status: 'FINISHED' },
      { id: '4', name: 'Valdivia Full', date, season: 2027, distance: 'Full', type: 'TRIATLON', isActive: true, status: 'UPCOMING' },
    ], expected: ['Valdivia', 'Valdivia finalizada'],
  },
  {
    section: 'planes', model: 'plan', params: { category: 'RUNNING', q: 'base' },
    records: [
      { id: '1', name: 'Running Base', category: 'RUNNING', modality: 'Online', price: 75000, isActive: true },
      { id: '2', name: 'Triatlón Base', category: 'TRIATLON', modality: 'Online', price: 100000, isActive: true },
      { id: '3', name: 'Running oculto', category: 'RUNNING', modality: 'Online', price: 60000, isActive: false },
    ], expected: ['Running Base'],
  },
  {
    section: 'equipo', model: 'athlete', params: { role: 'Entrenador', q: 'miguel' },
    records: [
      { id: '1', name: 'Miguel Brito', role: 'Entrenador', isActive: true },
      { id: '2', name: 'Miguel Atleta', role: 'Atleta', isActive: true },
    ], expected: ['Miguel Brito'],
  },
  {
    section: 'testimonios', model: 'testimonial', params: { visibility: 'hidden', q: 'ana' },
    records: [{ id: '1', name: 'Ana', quote: 'Entrenamiento', isActive: false }, { id: '2', name: 'Ana María', quote: 'Equipo', isActive: true }], expected: ['Ana'],
  },
  {
    section: 'noticias', model: 'newsPost', params: { category: 'RESULTADOS', pinned: 'yes' },
    records: [
      { id: '1', title: 'Podio', excerpt: 'Gran carrera', date, category: 'RESULTADOS', pinned: true, published: true },
      { id: '2', title: 'Otro resultado', excerpt: 'Carrera', date, category: 'RESULTADOS', pinned: false, published: true },
      { id: '3', title: 'Borrador', excerpt: 'Carrera', date, category: 'RESULTADOS', pinned: true, published: false },
    ], expected: ['Podio', 'Borrador'],
  },
];

const ContentActions = () => null;
function actionNames(node) {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return Array.from(node).flatMap(actionNames);
  if (node.type === ContentActions) return [node.props.name];
  return actionNames(node.props?.children);
}

async function loadPage(section, model, records, denied = false) {
  const source = await readFile(new URL(`../src/app/admin/${section}/page.tsx`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const calls = [];
  const modules = {
    'react/jsx-runtime': jsx,
    '@/lib/admin-filters': filters,
    '@/lib/race-schedule': { getClubDate: () => '2026-10-21', getRaceStatus },
    '@/lib/authz': { requireAdmin: async () => { calls.push('authorize'); if (denied) throw new Error('Unauthorized'); } },
    '@/lib/prisma': { prisma: {
      athlete: { findMany: async () => [] },
      [model]: { findMany: async () => { calls.push('read'); return records; } },
    } },
    '@/components/admin/ContentActions': { default: ContentActions },
    './actions': Object.fromEntries(['createRace', 'deleteRace', 'updateRace', 'createPlan', 'deletePlan', 'updatePlan', 'createAthlete', 'deleteAthlete', 'updateAthlete', 'createTestimonial', 'deleteTestimonial', 'updateTestimonial', 'createNewsPost', 'deleteNewsPost', 'updateNewsPost', 'setNewsPostPinned'].map((name) => [name, () => {}])),
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (name) => {
    if (name in modules) return modules[name];
    if (name.startsWith('@/components/') || name === 'next/image') return { default: () => null };
    throw new Error(`Unexpected import: ${name}`);
  } });
  return { page: exports.default, calls };
}

for (const { section, model, records, params, expected } of cases) {
  test(`${section}: page combines its filters and clearing restores the existing list`, async () => {
    const { page, calls } = await loadPage(section, model, records);
    assert.deepEqual(actionNames(await page({ searchParams: Promise.resolve(params) })), expected);
    assert.equal(calls[0], 'authorize');
    assert.deepEqual(actionNames(await page({ searchParams: Promise.resolve({}) })), records.map((record) => record.name ?? record.title));
  });
  test(`${section}: filters do not allow database access without admin authorization`, async () => {
    const { page, calls } = await loadPage(section, model, records, true);
    await assert.rejects(page({ searchParams: Promise.resolve(params) }), /Unauthorized/);
    assert.deepEqual(calls, ['authorize']);
  });
}

test('competition season falls back to its date and past events count as finished', async () => {
  const records = [
    { id: '1', name: 'Anterior', date: new Date('2026-10-20T00:00:00Z'), season: null, status: 'UPCOMING', type: 'RUNNING', isActive: true },
    { id: '2', name: 'Hoy', date: new Date('2026-10-21T00:00:00Z'), season: null, status: 'FINISHED', type: 'RUNNING', isActive: true },
  ];
  const { page } = await loadPage('competencias', 'race', records);
  assert.deepEqual(actionNames(await page({ searchParams: Promise.resolve({ season: '2026', status: 'finished' }) })), ['Anterior']);
  assert.deepEqual(actionNames(await page({ searchParams: Promise.resolve({ status: 'upcoming' }) })), ['Hoy']);
});
