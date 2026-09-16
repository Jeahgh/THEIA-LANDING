import assert from 'node:assert/strict';
import test from 'node:test';

import nextConfig from '../next.config.ts';

test('Next.js emits the baseline security headers and hides its banner', async () => {
  assert.equal(nextConfig.poweredByHeader, false);
  assert.equal(typeof nextConfig.headers, 'function');

  const rules = await nextConfig.headers();
  const catchAll = rules.find((rule) => rule.source === '/:path*');
  assert.ok(catchAll, 'A catch-all security header rule is required.');

  const headers = new Map(catchAll.headers.map(({ key, value }) => [key.toLowerCase(), value]));
  assert.equal(headers.get('x-frame-options'), 'DENY');
  assert.equal(headers.get('x-content-type-options'), 'nosniff');
  assert.equal(headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.match(headers.get('permissions-policy') ?? '', /camera=\(\)/);
  assert.match(headers.get('content-security-policy') ?? '', /frame-ancestors 'none'/);
  assert.match(headers.get('content-security-policy') ?? '', /object-src 'none'/);
  assert.deepEqual(nextConfig.images?.localPatterns, [
    { pathname: '/**', search: '' },
    { pathname: '/api/uploads/profiles/**' },
  ]);
});
