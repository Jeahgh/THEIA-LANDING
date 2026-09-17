import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (relativePath) => readFile(new URL(relativePath, new URL('../', import.meta.url)), 'utf8');

test('public pages define canonicals and discovery endpoints', async () => {
  const [robots, sitemap, layout, home, nosotros, planes, competencias, contacto, noticias] = await Promise.all([
    readSource('src/app/robots.ts'),
    readSource('src/app/sitemap.ts'),
    readSource('src/app/layout.tsx'),
    readSource('src/app/page.tsx'),
    readSource('src/app/nosotros/page.tsx'),
    readSource('src/app/planes/page.tsx'),
    readSource('src/app/competencias/page.tsx'),
    readSource('src/app/contacto/page.tsx'),
    readSource('src/app/noticias/page.tsx'),
  ]);

  assert.match(layout, /metadataBase:\s*new URL\(SITE_URL\)/);
  assert.match(layout, /<JsonLd data=\{websiteStructuredData\}/);
  assert.match(robots, /sitemap:\s*`\$\{SITE_URL\}\/sitemap\.xml`/);
  assert.match(robots, /'\/admin\/'/);

  const canonicalSources = [
    [home, "path: '/'", "absoluteUrl('/')"],
    [nosotros, "path: '/nosotros'", "absoluteUrl('/nosotros')"],
    [planes, "path: '/planes'", "absoluteUrl('/planes')"],
    [competencias, "path: '/competencias'", "absoluteUrl('/competencias')"],
    [contacto, "path: '/contacto'", "absoluteUrl('/contacto')"],
    [noticias, "path: '/noticias'", "absoluteUrl('/noticias')"],
  ];

  for (const [source, expectedPath, expectedSitemapUrl] of canonicalSources) {
    assert.match(source, /createPageMetadata\(/);
    assert.ok(source.includes(expectedPath), `Missing canonical path ${expectedPath}`);
    assert.ok(sitemap.includes(expectedSitemapUrl), `Missing sitemap URL ${expectedSitemapUrl}`);
  }
});

test('private routes remain non-indexable and news links are crawlable', async () => {
  const privateRoutes = [
    'src/app/login/page.tsx',
    'src/app/registro/page.tsx',
    'src/app/recuperar-contrasena/page.tsx',
    'src/app/verificar-email/page.tsx',
    'src/app/perfil/page.tsx',
    'src/app/admin/layout.tsx',
  ];
  const sources = await Promise.all(privateRoutes.map(readSource));

  for (const source of sources) {
    assert.match(source, /robots:\s*PRIVATE_ROBOTS/);
  }

  const newsCards = await readSource('src/components/home/NewsCards.tsx');
  assert.doesNotMatch(newsCards, /['"]use client['"]/);
  assert.match(newsCards, /href=\{`\/noticias\/\$\{featured\.id\}`\}/);
});
