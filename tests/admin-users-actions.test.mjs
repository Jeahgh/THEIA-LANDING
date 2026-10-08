import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/app/admin/usuarios/actions.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

class Redirect extends Error {}
class DatabaseConflict extends Error {
  code = 'P2034';
}

function loadActions({ target = { id: 'target', role: 'MEMBER', isActive: true }, admins = 2, denied = false, conflict = false } = {}) {
  const calls = [];
  const user = {
    findUnique: async () => target,
    count: async () => admins,
    delete: async ({ where }) => calls.push(['delete', where.id]),
    update: async ({ data }) => calls.push(['update', data]),
  };
  const prisma = {
    user,
    $transaction: async (callback, options) => {
      calls.push(['isolation', options.isolationLevel]);
      if (conflict) throw new DatabaseConflict();
      return callback({ user });
    },
  };
  const modules = {
    'next/cache': { revalidatePath: (path) => calls.push(['revalidate', path]) },
    'next/navigation': { redirect: (path) => { throw new Redirect(path); } },
    '@/generated/prisma': {
      Role: { ADMIN: 'ADMIN', COACH: 'COACH', MEMBER: 'MEMBER' },
      Prisma: { TransactionIsolationLevel: { Serializable: 'Serializable' }, PrismaClientKnownRequestError: DatabaseConflict },
    },
    '@/lib/authz': { requireAdmin: async () => {
      calls.push(['authorize']);
      if (denied) throw new Error('Unauthorized');
      return { id: 'actor' };
    } },
    '@/lib/prisma': { prisma },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (name) => {
    assert.ok(name in modules, `Unexpected dependency: ${name}`);
    return modules[name];
  } });
  return { ...exports, calls };
}

test('user deletion requires administrator authorization before database access', async () => {
  const actions = loadActions({ denied: true });
  await assert.rejects(actions.deleteUser('target'), /Unauthorized/);
  assert.deepEqual(actions.calls, [['authorize']]);
});

test('an administrator cannot delete their own account', async () => {
  const actions = loadActions();
  await assert.rejects(actions.deleteUser('actor'), /error=self-delete/);
  assert.deepEqual(actions.calls, [['authorize']]);
});

test('a missing user is reported without deleting or revalidating', async () => {
  const actions = loadActions({ target: null });
  await assert.rejects(actions.deleteUser('target'), /error=not-found/);
  assert.deepEqual(actions.calls, [['authorize'], ['isolation', 'Serializable']]);
});

test('the last active administrator cannot be deleted', async () => {
  const actions = loadActions({ target: { id: 'target', role: 'ADMIN', isActive: true }, admins: 1 });
  await assert.rejects(actions.deleteUser('target'), /error=last-admin/);
  assert.deepEqual(actions.calls, [['authorize'], ['isolation', 'Serializable']]);
});

test('eligible users are deleted and the list is refreshed', async () => {
  for (const target of [
    { id: 'target', role: 'MEMBER', isActive: true },
    { id: 'target', role: 'COACH', isActive: true },
    { id: 'target', role: 'ADMIN', isActive: true },
    { id: 'target', role: 'ADMIN', isActive: false },
  ]) {
    const actions = loadActions({ target });
    await assert.rejects(actions.deleteUser('target'), /eliminado=1/);
    assert.deepEqual(actions.calls, [
      ['authorize'], ['isolation', 'Serializable'], ['delete', 'target'], ['revalidate', '/admin/usuarios'],
    ]);
  }
});

test('a transaction conflict reports a retry message without deleting a user', async () => {
  const actions = loadActions({ conflict: true });
  await assert.rejects(actions.deleteUser('target'), /error=conflict/);
  assert.deepEqual(actions.calls, [['authorize'], ['isolation', 'Serializable']]);
});

test('disabling an account through the switch revokes its existing sessions', async () => {
  const actions = loadActions();
  const form = new FormData();
  form.set('role', 'MEMBER');
  await assert.rejects(actions.updateUserRole('target', form), /guardado=actualizado/);
  const update = actions.calls.find(([type]) => type === 'update')[1];
  assert.equal(update.isActive, false);
  assert.equal(update.sessionVersion.increment, 1);
});

test('saving an unchanged enabled account keeps its session version', async () => {
  const actions = loadActions();
  const form = new FormData();
  form.set('role', 'MEMBER');
  form.set('isActive', 'on');
  await assert.rejects(actions.updateUserRole('target', form), /guardado=actualizado/);
  const update = actions.calls.find(([type]) => type === 'update')[1];
  assert.equal(update.isActive, true);
  assert.equal(update.sessionVersion, undefined);
});
