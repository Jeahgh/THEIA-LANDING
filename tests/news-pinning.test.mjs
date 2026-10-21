import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import * as newsImages from '../src/lib/news-images.ts';

async function compile(path) {
  return ts.transpileModule(await readFile(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

const actionsCode = await compile('../src/app/admin/noticias/actions.ts');
const newsCode = await compile('../src/lib/news.ts');

function load(code, modules) {
  const exports = {};
  vm.runInNewContext(code, { exports, Date, String, Set, require: (name) => {
    assert.ok(name in modules, `Unexpected dependency: ${name}`);
    return modules[name];
  } });
  return exports;
}

function setup({ denied = false } = {}) {
  const posts = [
    { id: 'pinned', pinned: true, published: true },
    { id: 'other', pinned: false, published: true },
    { id: 'draft', pinned: true, published: false },
  ].map((post) => ({ ...post, title: post.id, excerpt: '', date: new Date('2026-10-12'),
    updatedAt: new Date('2026-10-12'), category: 'NOTICIAS', imageUrl: null, results: [] }));
  const calls = [];
  const prisma = { newsPost: {
    findMany: async ({ where }) => posts.filter((post) =>
      Object.entries(where).every(([key, value]) => post[key] === value)),
    update: async ({ where, data }) => {
      calls.push('update');
      Object.assign(posts.find((post) => post.id === where.id), data);
    },
  } };
  const cache = {
    unstable_cache: (query) => query,
    revalidatePath: (path) => calls.push(`refresh:${path}`),
    updateTag: (tag) => calls.push(`invalidate:${tag}`),
  };
  const shared = {
    '@/lib/news-images': newsImages,
    'next/cache': cache,
    '@/lib/prisma': { prisma },
    '@/lib/cache-tags': { PUBLIC_CACHE_TAGS: { news: 'public-news' }, PUBLIC_CONTENT_REVALIDATE_SECONDS: 300 },
  };
  const actions = load(actionsCode, { ...shared,
    '@/lib/authz': { requireAdmin: async () => {
      calls.push('authorize');
      if (denied) throw new Error('Unauthorized');
    } },
    'next/navigation': { redirect: (path) => { throw new Error(`redirect:${path}`); } },
  });
  const news = load(newsCode, { ...shared, react: { cache: (query) => query } });
  return { actions, news, calls };
}

test('homepage excludes unpinned news and unpublished pinned news; news page keeps all published news', async () => {
  const { news } = setup();
  assert.deepEqual(Array.from(await news.getPinnedPublishedNews(), (post) => post.id), ['pinned']);
  assert.deepEqual(Array.from(await news.getAllPublishedNews(), (post) => post.id), ['pinned', 'other']);
});

test('unauthorized pin requests cannot change news or invalidate caches', async () => {
  const { actions, news, calls } = setup({ denied: true });
  await assert.rejects(actions.setNewsPostPinned('other', true), /Unauthorized/);
  assert.deepEqual(calls, ['authorize']);
  assert.deepEqual(Array.from(await news.getPinnedPublishedNews(), (post) => post.id), ['pinned']);
});

test('pinning and unpinning refresh Inicio without removing news from the public listing', async () => {
  const { actions, news, calls } = setup();
  await actions.setNewsPostPinned('other', true);
  assert.deepEqual(Array.from(await news.getPinnedPublishedNews(), (post) => post.id), ['pinned', 'other']);
  assert.deepEqual(calls, ['authorize', 'update', 'refresh:/', 'refresh:/admin/noticias', 'invalidate:public-news']);
  await actions.setNewsPostPinned('pinned', false);
  assert.deepEqual(Array.from(await news.getPinnedPublishedNews(), (post) => post.id), ['other']);
  assert.deepEqual(Array.from(await news.getAllPublishedNews(), (post) => post.id), ['pinned', 'other']);
});

test('repeated pin submissions preserve the intended state instead of toggling it twice', async () => {
  const { actions, news } = setup();
  for (let attempt = 0; attempt < 2; attempt++) {
    await actions.setNewsPostPinned('other', true);
  }
  assert.deepEqual(Array.from(await news.getPinnedPublishedNews(), (post) => post.id), ['pinned', 'other']);
});
