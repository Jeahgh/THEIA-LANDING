import assert from 'node:assert/strict';
import test from 'node:test';

import {
  InvalidJsonBodyError,
  readJsonBodyWithLimit,
  RequestBodyTooLargeError,
} from '../src/lib/http-body.ts';

test('bounded JSON reader accepts a small object', async () => {
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'hello' }),
  });

  assert.deepEqual(await readJsonBodyWithLimit(request, 1_024), { message: 'hello' });
});

test('bounded JSON reader rejects a streamed body after the byte limit', async () => {
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'x'.repeat(2_000) }),
  });

  await assert.rejects(() => readJsonBodyWithLimit(request, 256), RequestBodyTooLargeError);
});

test('bounded JSON reader rejects invalid JSON and non-object JSON', async () => {
  const invalid = new Request('http://localhost/api/contact', {
    method: 'POST',
    body: '{not-json',
  });
  const array = new Request('http://localhost/api/contact', {
    method: 'POST',
    body: '[]',
  });

  await assert.rejects(() => readJsonBodyWithLimit(invalid, 1_024), InvalidJsonBodyError);
  await assert.rejects(() => readJsonBodyWithLimit(array, 1_024), InvalidJsonBodyError);
});
