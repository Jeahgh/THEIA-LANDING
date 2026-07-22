import assert from 'node:assert/strict';
import test from 'node:test';

import {
  markSessionRevoked,
  refreshSessionFromLookup,
} from '../src/lib/auth-session-state.ts';
import { getSafeCallbackUrl } from '../src/lib/safe-callback-url.ts';
import {
  clearRateLimit,
  consumeRateLimit,
  getClientAddress,
} from '../src/lib/rate-limit.ts';

const activeUser = {
  id: 'user-1',
  role: 'ADMIN',
  isActive: true,
  sessionVersion: 4,
};

test('a lookup error closes access without permanently revoking the token', async () => {
  const lookupError = new Error('database temporarily unavailable');
  let reportedError;

  const token = await refreshSessionFromLookup(
    {
      id: 'user-1',
      userId: 'user-1',
      email: 'admin@example.com',
      role: 'ADMIN',
      isActive: true,
      sessionVersion: 4,
      revoked: false,
    },
    async () => {
      throw lookupError;
    },
    (error) => {
      reportedError = error;
    },
  );

  assert.equal(reportedError, lookupError);
  assert.deepEqual(token, {
    id: '',
    userId: 'user-1',
    email: 'admin@example.com',
    role: 'MEMBER',
    isActive: false,
    sessionVersion: 4,
    revoked: false,
  });
});

test('a temporarily unavailable token recovers after a successful lookup', async () => {
  const token = await refreshSessionFromLookup(
    {
      id: '',
      userId: 'user-1',
      email: 'admin@example.com',
      role: 'MEMBER',
      isActive: false,
      sessionVersion: 4,
      revoked: false,
    },
    async () => activeUser,
  );

  assert.deepEqual(token, {
    id: 'user-1',
    userId: 'user-1',
    email: 'admin@example.com',
    role: 'ADMIN',
    isActive: true,
    sessionVersion: 4,
    revoked: false,
  });
});

test('a missing user permanently revokes the token', async () => {
  const token = await refreshSessionFromLookup(
    { id: 'user-1', role: 'ADMIN', isActive: true, sessionVersion: 4, revoked: false },
    async () => null,
  );

  assert.deepEqual(token, {
    id: '',
    role: 'MEMBER',
    isActive: false,
    sessionVersion: 4,
    revoked: true,
  });
});

test('an inactive user permanently revokes the token', async () => {
  const token = await refreshSessionFromLookup(
    { id: 'user-1', role: 'ADMIN', isActive: true, sessionVersion: 4, revoked: false },
    async () => ({ ...activeUser, isActive: false }),
  );

  assert.equal(token.revoked, true);
  assert.equal(token.id, '');
  assert.equal(token.role, 'MEMBER');
  assert.equal(token.isActive, false);
});

test('a session version mismatch permanently revokes the token', async () => {
  const token = await refreshSessionFromLookup(
    { id: 'user-1', role: 'ADMIN', isActive: true, sessionVersion: 3, revoked: false },
    async () => activeUser,
  );

  assert.equal(token.revoked, true);
  assert.equal(token.id, '');
  assert.equal(token.role, 'MEMBER');
  assert.equal(token.isActive, false);
});

test('a revoked token remains fail-closed', () => {
  const token = markSessionRevoked({
    id: 'user-1',
    role: 'ADMIN',
    isActive: true,
    sessionVersion: 4,
    revoked: true,
  });

  assert.deepEqual(token, {
    id: '',
    role: 'MEMBER',
    isActive: false,
    sessionVersion: 4,
    revoked: true,
  });
});

test('callback URLs only allow internal application paths', () => {
  assert.equal(getSafeCallbackUrl('/admin?tab=users'), '/admin?tab=users');
  assert.equal(getSafeCallbackUrl('https://evil.example'), '/planes');
  assert.equal(getSafeCallbackUrl('//evil.example'), '/planes');
  assert.equal(getSafeCallbackUrl('/\\evil.example'), '/planes');
  assert.equal(getSafeCallbackUrl('javascript:alert(1)'), '/planes');
});

test('rate limits block excess attempts and reopen after their window', () => {
  const scope = `test-${Date.now()}`;
  const identifiers = ['person@example.com', '127.0.0.1'];
  const first = consumeRateLimit({ scope, identifiers, limit: 2, windowMs: 60_000, now: 1_000 });
  const second = consumeRateLimit({ scope, identifiers, limit: 2, windowMs: 60_000, now: 2_000 });
  const blocked = consumeRateLimit({ scope, identifiers, limit: 2, windowMs: 60_000, now: 3_000 });
  const reopened = consumeRateLimit({ scope, identifiers, limit: 2, windowMs: 60_000, now: 61_001 });

  assert.equal(first.allowed, true);
  assert.equal(second.allowed, true);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 58);
  assert.equal(reopened.allowed, true);
  clearRateLimit(scope, identifiers);
});

test('client address prefers the proxy-provided direct address', () => {
  const requestHeaders = new Headers({
    'x-forwarded-for': '198.51.100.10, 203.0.113.20',
    'x-real-ip': '192.0.2.30',
  });

  assert.equal(getClientAddress(requestHeaders), '192.0.2.30');
});
