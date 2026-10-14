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

const defaultTarget = { id: 'target', name: 'Atleta', email: 'athlete@example.test', role: 'MEMBER', isActive: true };

function userForm(values = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ role: 'MEMBER', isActive: 'on', ...values })) {
    if (value !== null) form.set(key, value);
  }
  return form;
}

function loadActions({ target = defaultTarget, admins = 2, denied = false, conflict = false, limited = false, delivery = true, deliveryError = false } = {}) {
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
      return callback({ user,
        verificationToken: { deleteMany: async () => calls.push(['clear-tokens']) },
        account: { deleteMany: async () => calls.push(['unlink-google']) },
      });
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
    '@/lib/email-verification': {
      getEmailVerificationIdentifier: (email) => `email-verification:${email}`,
      getPasswordResetIdentifier: (email) => `password-reset:${email}`,
    },
    '@/lib/rate-limit': { consumeRateLimit: () => ({ allowed: !limited }) },
    '@/lib/password-reset': { sendUserPasswordReset: async (user) => {
      calls.push(['send-recovery', user.email]);
      if (deliveryError) throw new Error('SMTP failed');
      return delivery;
    } },
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
  assert.ok((await actions.updateUser('target', {}, userForm({ isActive: null }))).success);
  const update = actions.calls.find(([type]) => type === 'update')[1];
  assert.equal(update.isActive, false);
  assert.equal(update.sessionVersion.increment, 1);
});

test('saving an unchanged enabled account keeps its session version', async () => {
  const actions = loadActions();
  assert.ok((await actions.updateUser('target', {}, userForm())).success);
  const update = actions.calls.find(([type]) => type === 'update')[1];
  assert.equal(update.isActive, true);
  assert.equal(update.sessionVersion, undefined);
});

test('editing and recovery actions authorize before touching any account', async () => {
  for (const run of [
    (actions) => actions.updateUser('target', {}, userForm()),
    (actions) => actions.sendUserRecoveryEmail('target', {}),
  ]) {
    const actions = loadActions({ denied: true });
    await assert.rejects(run(actions), /Unauthorized/);
    assert.deepEqual(actions.calls, [['authorize']]);
  }
});

test('invalid or missing roles leave the account unchanged', async () => {
  for (const values of [{ role: 'INVALID' }, { role: null }]) {
    const actions = loadActions();
    assert.ok((await actions.updateUser('target', {}, userForm(values))).error);
    assert.deepEqual(actions.calls, [['authorize']]);
  }
});

test('the last administrator cannot be disabled or demoted; administrators cannot demote themselves', async () => {
  for (const settings of [
    { target: { ...defaultTarget, role: 'ADMIN' }, admins: 1 },
    { target: { ...defaultTarget, id: 'actor', role: 'ADMIN' } },
  ]) {
    for (const changes of [{ role: 'MEMBER' }, { role: 'ADMIN', isActive: null }]) {
      const actions = loadActions(settings);
      assert.ok((await actions.updateUser(settings.target.id, {}, userForm(changes))).error);
      assert.equal(actions.calls.some(([type]) => type === 'update'), false);
    }
  }
});

test('profile fields submitted outside the permitted controls are ignored', async () => {
  const actions = loadActions();
  assert.ok((await actions.updateUser('target', {}, userForm({
    email: 'new@example.test', name: 'Nuevo nombre', phone: '123456789',
    image: '/changed-avatar.jpg', createdAt: '2000-01-01', passwordHash: 'forged', sessionVersion: '999',
  }))).success);
  const update = actions.calls.find(([type]) => type === 'update')[1];
  assert.deepEqual(Object.keys(update).sort(), ['isActive', 'role']);
  assert.equal(update.role, 'MEMBER');
  assert.equal(update.isActive, true);
  assert.equal(actions.calls.some(([type]) => type === 'clear-tokens' || type === 'unlink-google'), false);
});

test('a changed role revokes existing sessions', async () => {
  const actions = loadActions();
  assert.ok((await actions.updateUser('target', {}, userForm({ role: 'COACH' }))).success);
  const update = actions.calls.find(([type]) => type === 'update')[1];
  assert.equal(update.role, 'COACH');
  assert.equal(update.sessionVersion.increment, 1);
});

test('concurrent edits and missing accounts return an error without updating the account', async () => {
  for (const settings of [{ conflict: true }, { target: null }]) {
    const actions = loadActions(settings);
    assert.ok((await actions.updateUser('target', {}, userForm())).error);
    assert.equal(actions.calls.some(([type]) => type === 'update'), false);
  }
});

test('admin recovery sends the existing recovery flow to the saved account email', async () => {
  const actions = loadActions();
  assert.match((await actions.sendUserRecoveryEmail('target', {})).success, /athlete@example.test/);
  assert.deepEqual(actions.calls, [['authorize'], ['send-recovery', 'athlete@example.test']]);
});

test('recovery refuses missing, disabled or rate-limited accounts and reports failed delivery accurately', async () => {
  for (const settings of [{ target: null }, { target: { ...defaultTarget, isActive: false } }, { limited: true }, { delivery: false }, { deliveryError: true }]) {
    const actions = loadActions(settings);
    assert.ok((await actions.sendUserRecoveryEmail('target', {})).error);
    if (!('delivery' in settings) && !('deliveryError' in settings)) assert.equal(actions.calls.some(([type]) => type === 'send-recovery'), false);
  }
});
