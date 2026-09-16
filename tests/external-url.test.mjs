import assert from 'node:assert/strict';
import test from 'node:test';

import { getSafeExternalHttpsUrl } from '../src/lib/external-url.ts';

test('external registration URLs only allow absolute HTTPS without credentials', () => {
  assert.equal(getSafeExternalHttpsUrl('https://example.com/register?id=1'), 'https://example.com/register?id=1');
  assert.equal(getSafeExternalHttpsUrl('http://example.com/register'), null);
  assert.equal(getSafeExternalHttpsUrl('javascript:alert(1)'), null);
  assert.equal(getSafeExternalHttpsUrl('data:text/html,hello'), null);
  assert.equal(getSafeExternalHttpsUrl('/relative'), null);
  assert.equal(getSafeExternalHttpsUrl('https://user:pass@example.com/'), null);
  assert.equal(getSafeExternalHttpsUrl(''), null);
});
