import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import * as newsImages from '../src/lib/news-images.ts';

const sections = [
  ['competencias', 'Race', 'race'], ['equipo', 'Athlete', 'athlete'],
  ['planes', 'Plan', 'plan'], ['testimonios', 'Testimonial', 'testimonial'],
  ['noticias', 'NewsPost', 'newsPost'],
];

async function loadActions(section, { denied = false } = {}) {
  const source = await readFile(new URL(`../src/app/admin/${section}/actions.ts`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const calls = [];
  const model = {
    findFirst: async () => { calls.push(['read']); return null; },
    findMany: async () => [{ name: 'Atleta de prueba' }],
    create: async ({ data }) => calls.push(['create', data]),
    update: async ({ data }) => calls.push(['update', data]),
  };
  const prisma = Object.fromEntries(sections.map(([, , name]) => [name, model]));
  prisma.planFeature = { deleteMany: async () => {}, createMany: async () => {} };
  prisma.$transaction = async (callback) => callback(prisma);
  const modules = {
    'next/cache': { revalidatePath: (path) => calls.push(['refresh', path]), updateTag: (tag) => calls.push(['invalidate', tag]) },
    'next/navigation': { redirect: (path) => { throw new Error(`redirect:${path}`); } },
    '@/lib/authz': { requireAdmin: async () => { calls.push(['authorize']); if (denied) throw new Error('Unauthorized'); } },
    '@/lib/prisma': { prisma },
    '@/lib/cache-tags': { PUBLIC_CACHE_TAGS: { races: 'races', team: 'team', plans: 'plans', testimonials: 'testimonials', news: 'news' } },
    '@/lib/external-url': { getSafeExternalHttpsUrl: () => null },
    '@/lib/news-images': newsImages,
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (name) => { assert.ok(name in modules); return modules[name]; } });
  return { actions: exports, calls };
}

function contentForm(dialog = true) {
  const form = new FormData();
  const values = { name: 'Prueba', title: 'Prueba', date: '2026-11-29', category: 'NOTICIAS', isActive: 'on', price: '40.000', features: 'Seguimiento', pinned: 'on' };
  for (const [name, value] of Object.entries(values)) form.set(name, value);
  if (dialog) form.set('_dialog', 'on');
  return form;
}

for (const [section, suffix] of sections) {
  test(`${section}: modal creation and editing still authorize before database access`, async () => {
    for (const operation of ['create', 'update']) {
      const { actions, calls } = await loadActions(section, { denied: true });
      await assert.rejects(operation === 'create' ? actions[`create${suffix}`](contentForm()) : actions[`update${suffix}`]('test-id', contentForm()), /Unauthorized/);
      assert.deepEqual(calls, [['authorize']]);
    }
  });

  test(`${section}: modal saves complete and refresh the list, while standalone saves still redirect`, async () => {
    for (const operation of ['create', 'update']) {
      for (const dialog of [true, false]) {
        const { actions, calls } = await loadActions(section);
        const promise = operation === 'create' ? actions[`create${suffix}`](contentForm(dialog)) : actions[`update${suffix}`]('test-id', contentForm(dialog));
        if (dialog) await promise;
        else await assert.rejects(promise, new RegExp(`redirect:/admin/${section}\\?guardado=`));
        assert.ok(calls.some(([type]) => type === operation));
        assert.ok(calls.some(([type, path]) => type === 'refresh' && path === `/admin/${section}`));
        assert.ok(calls.some(([type]) => type === 'invalidate'));
      }
    }
  });
}

test('editing news saves results without overwriting its pin, even with a forged pin field', async () => {
  const { actions, calls } = await loadActions('noticias');
  const form = contentForm();
  form.set('category', 'RESULTADOS');
  for (const [name, value] of Object.entries({ resultAthlete: 'Atleta de prueba', resultPosition: '1°', resultDistance: '10 km', resultTime: '00:45:12' })) form.append(name, value);
  await actions.updateNewsPost('test-id', form);
  const data = calls.find(([type]) => type === 'update')[1];
  assert.equal(data.pinned, undefined);
  assert.equal(data.results.create.length, 1);
  assert.equal(data.results.create[0].athleteName, 'Atleta de prueba');
  assert.equal(data.results.create[0].time, '00:45:12');
});

test('plan creation and editing save the visibility switch in both positions', async () => {
  for (const operation of ['create', 'update']) {
    for (const enabled of [true, false]) {
      const { actions, calls } = await loadActions('planes');
      const form = contentForm();
      if (!enabled) form.delete('isActive');
      if (operation === 'create') await actions.createPlan(form);
      else await actions.updatePlan('test-id', form);
      assert.equal(calls.find(([type]) => type === operation)[1].isActive, enabled);
    }
  }
});

test('race creation and editing persist an uploaded image and the selected season independently of the date', async () => {
  for (const operation of ['create', 'update']) {
    const { actions, calls } = await loadActions('competencias');
    const form = contentForm();
    form.set('type', 'TRIATLON');
    form.set('season', '2027');
    form.set('imageUrl', '/api/uploads/competitions/coquimbo-123.webp');
    if (operation === 'create') await actions.createRace(form);
    else await actions.updateRace('test-id', form);
    const data = calls.find(([type]) => type === operation)[1];
    assert.equal(data.season, 2027);
    assert.equal(data.date.getFullYear(), 2026);
    assert.equal(data.imageUrl, '/api/uploads/competitions/coquimbo-123.webp');
  }
});

test('race validation rejects invalid seasons and image paths before writing', async () => {
  for (const [field, value] of [
    ['season', '2026.5'], ['season', 'abc'], ['season', '99'],
    ['imageUrl', 'https://example.com/photo.webp'],
    ['imageUrl', '/api/uploads/competitions/../../private.webp'],
  ]) {
    const { actions, calls } = await loadActions('competencias');
    const form = contentForm();
    form.set(field, value);
    await assert.rejects(actions.updateRace('test-id', form));
    assert.ok(!calls.some(([type]) => type === 'update'));
  }
});

test('legacy race submissions derive the season from the event date when no season is supplied', async () => {
  const { actions, calls } = await loadActions('competencias');
  await actions.createRace(contentForm());
  assert.equal(calls.find(([type]) => type === 'create')[1].season, 2026);
});

test('news galleries save their order and cover on creation and editing, and can be cleared', async () => {
  for (const operation of ['create', 'update']) {
    for (const urls of [['/api/uploads/news/running-1.jpg', '/images/hero-bike-team.jpg'], []]) {
      const { actions, calls } = await loadActions('noticias');
      const form = contentForm();
      form.set('_gallery', 'on');
      for (const url of urls) form.append('imageUrls', url);
      if (operation === 'create') await actions.createNewsPost(form);
      else await actions.updateNewsPost('test-id', form);
      const data = calls.find(([type]) => type === operation)[1];
      assert.deepEqual(data.imageUrls, urls);
      assert.equal(data.imageUrl, urls[0] ?? null);
      assert.equal(data.pinned, undefined);
    }
  }
});

test('invalid gallery paths are rejected before writing', async () => {
  const { actions, calls } = await loadActions('noticias');
  const form = contentForm();
  form.set('_gallery', 'on');
  form.set('imageUrls', 'https://example.com/image.jpg');
  await assert.rejects(actions.updateNewsPost('test-id', form));
  assert.ok(!calls.some(([type]) => type === 'update'));
});

test('competition creation and editing ignore manual state submissions', async () => {
  for (const operation of ['create', 'update']) {
    const { actions, calls } = await loadActions('competencias');
    const form = contentForm();
    form.set('status', 'FINISHED');
    if (operation === 'create') await actions.createRace(form);
    else await actions.updateRace('test-id', form);
    const data = calls.find(([type]) => type === operation)[1];
    assert.equal(Object.hasOwn(data, 'status'), false);
  }
});
