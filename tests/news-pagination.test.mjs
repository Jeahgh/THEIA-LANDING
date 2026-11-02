import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import * as newsImages from '../src/lib/news-images.ts';

const code = ts.transpileModule(await readFile(new URL('../src/lib/news.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup(total = 14) {
  const posts = Array.from({ length: total }, (_, i) => ({
    id: `post-${String(i).padStart(2, '0')}`, title: `Noticia ${i}`, excerpt: '',
    date: new Date(Date.UTC(2026, 0, 1 + Math.floor(i / 2))),
    createdAt: new Date(Date.UTC(2026, 0, 1)), updatedAt: new Date(Date.UTC(2026, 0, 1)),
    category: 'NOTICIAS', published: true, pinned: i === 0, sortOrder: -i, results: [],
  }));
  posts.push({ ...posts[0], id: 'draft', published: false, date: new Date('2027-01-01') });
  const calls = [];
  const matching = (where) => posts.filter((post) => Object.entries(where).every(([key, value]) => post[key] === value));
  const modules = {
    react: { cache: (query) => query },
    'next/cache': { unstable_cache: (query) => query },
    '@/lib/news-images': newsImages,
    '@/lib/cache-tags': { PUBLIC_CACHE_TAGS: { news: 'public-news' }, PUBLIC_CONTENT_REVALIDATE_SECONDS: 300 },
    '@/lib/prisma': { prisma: { newsPost: {
      count: async ({ where }) => matching(where).length,
      findMany: async (args) => {
        calls.push(args);
        const sorted = matching(args.where).sort((a, b) => {
          for (const order of args.orderBy) {
            const [key, direction] = Object.entries(order)[0];
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
        return sorted.slice(args.skip ?? 0, args.take === undefined ? undefined : (args.skip ?? 0) + args.take);
      },
    } } },
  };
  const exports = {};
  vm.runInNewContext(code, { exports, Date, Number, require: (name) => {
    assert.ok(name in modules, `Unexpected dependency: ${name}`);
    return modules[name];
  } });
  return { news: exports, calls };
}

test('news pages show six published posts newest first, ignoring pin and manual order', async () => {
  const { news, calls } = setup();
  const pages = await Promise.all(['1', '2', '3'].map((value) => news.getPublishedNewsPage(value)));
  assert.deepEqual(pages.map((page) => page.articles.length), [6, 6, 2]);
  const ids = pages.flatMap((page) => Array.from(page.articles, (article) => article.id));
  assert.deepEqual(ids, Array.from({ length: 14 }, (_, i) => `post-${String(13 - i).padStart(2, '0')}`));
  assert.equal(new Set(ids).size, 14);
  assert.ok(pages.every((page) => page.total === 14 && page.totalPages === 3));
  assert.deepEqual(calls.map((call) => [call.skip, call.take]), [[0, 6], [6, 6], [12, 6]]);
});

test('invalid page parameters use the first page and out-of-range pages use the last', async () => {
  const { news } = setup();
  for (const value of [undefined, '', '0', '-1', '1.5', 'abc', ['2', '3'], '9007199254740992']) {
    assert.equal((await news.getPublishedNewsPage(value)).page, 1);
  }
  const last = await news.getPublishedNewsPage('999');
  assert.equal(last.page, 3);
  assert.equal(last.articles.length, 2);
});

test('an empty or exact-size news listing has a single page', async () => {
  for (const total of [0, 6]) {
    const { news } = setup(total);
    const page = await news.getPublishedNewsPage('2');
    assert.equal(page.page, 1);
    assert.equal(page.totalPages, 1);
    assert.equal(page.articles.length, total);
  }
});
