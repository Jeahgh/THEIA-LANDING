import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const adminRoot = path.join(repositoryRoot, 'src', 'app', 'admin');

async function findAdminPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) return findAdminPages(target);
      return entry.name === 'page.tsx' ? [target] : [];
    }),
  );

  return nested.flat();
}

test('every admin page reauthorizes before reading data or redirecting', async () => {
  const pages = await findAdminPages(adminRoot);
  assert.equal(pages.length, 13, 'Update this test when an admin page is added or removed.');

  for (const page of pages) {
    const source = await readFile(page, 'utf8');
    const relativePath = path.relative(repositoryRoot, page);
    const guardIndex = source.indexOf('await requireAdmin(');
    const prismaIndex = source.indexOf('prisma.');
    const redirectIndex = source.indexOf('\n  redirect(');

    assert.match(
      source,
      /import\s+\{\s*requireAdmin\s*\}\s+from\s+['"]@\/lib\/authz['"]/,
      `${relativePath} must import requireAdmin`,
    );
    assert.notEqual(guardIndex, -1, `${relativePath} must call requireAdmin`);

    if (prismaIndex !== -1) {
      assert.ok(guardIndex < prismaIndex, `${relativePath} must authorize before Prisma access`);
    }

    if (redirectIndex !== -1) {
      assert.ok(guardIndex < redirectIndex, `${relativePath} must authorize before redirecting`);
    }
  }
});
