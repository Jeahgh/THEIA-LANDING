import assert from 'node:assert/strict';
import test from 'node:test';

import {
  InvalidJsonBodyError,
  InvalidFormDataBodyError,
  readFormDataWithLimit,
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

test('bounded multipart reader preserves files and fields without Content-Length', async () => {
  const form = new FormData();
  form.set('file', new File(['image-bytes'], 'photo.jpg', { type: 'image/jpeg' }));
  form.set('folder', 'news');
  const request = new Request('http://localhost/api/admin/uploads', { method: 'POST', body: form });
  assert.equal(request.headers.get('content-length'), null);
  const result = await readFormDataWithLimit(request, 2048);
  assert.equal(result.get('folder'), 'news');
  assert.equal(result.get('file').name, 'photo.jpg');
  assert.equal(await result.get('file').text(), 'image-bytes');
});

test('multipart limit cannot be bypassed with absent or false Content-Length and cancels the stream', async () => {
  for (const declared of [undefined, '1']) {
    let cancelled = false;
    const request = new Request('http://localhost/upload', {
      method: 'POST', duplex: 'half',
      headers: { 'Content-Type': 'multipart/form-data; boundary=test', ...(declared ? { 'Content-Length': declared } : {}) },
      body: new ReadableStream({
        pull(controller) { controller.enqueue(new Uint8Array(512)); },
        cancel() { cancelled = true; },
      }),
    });
    await assert.rejects(() => readFormDataWithLimit(request, 1024), RequestBodyTooLargeError);
    assert.equal(cancelled, true);
  }
});

test('multipart reader rejects invalid content types and malformed boundaries', async () => {
  for (const type of ['application/json', 'multipart/form-data', 'multipart/form-data; boundary=missing']) {
    const request = new Request('http://localhost/upload', { method: 'POST', headers: { 'Content-Type': type }, body: '{"file":"fake"}' });
    await assert.rejects(() => readFormDataWithLimit(request, 1024), InvalidFormDataBodyError);
  }
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
