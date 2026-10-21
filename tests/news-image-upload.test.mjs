import assert from 'node:assert/strict';
import test from 'node:test';
import { uploadNewsImages } from '../src/lib/news-image-upload.ts';

const photo = (name) => new File(['photo'], name, { type: 'image/jpeg' });
const success = (imageUrl) => Response.json({ success: true, imageUrl });

test('multiple selected photos upload to the existing admin endpoint in order', async () => {
  const files = [photo('one.jpg'), photo('two.jpg')];
  const requests = [];
  const displayed = [];
  const result = await uploadNewsImages(files, {
    onImage: (image) => displayed.push(image),
    fetcher: async (url, options) => {
      requests.push({ url, method: options.method, file: options.body.get('file').name, folder: options.body.get('folder') });
      return success(`/api/uploads/news/${options.body.get('file').name}`);
    },
  });
  assert.deepEqual(requests, files.map((file) => ({ url: '/api/admin/uploads', method: 'POST', file: file.name, folder: 'news' })));
  assert.deepEqual(result, { images: ['/api/uploads/news/one.jpg', '/api/uploads/news/two.jpg'], errors: [] });
  assert.deepEqual(displayed, result.images);
});

test('a failed upload does not discard successful photos or stop the rest of the batch', async () => {
  let call = 0;
  const result = await uploadNewsImages([photo('one.jpg'), photo('two.jpg'), photo('three.jpg')], {
    fetcher: async () => {
      call++;
      if (call === 2) throw new Error('Sin conexión');
      return success(`/api/uploads/news/${call}.jpg`);
    },
  });
  assert.deepEqual(result.images, ['/api/uploads/news/1.jpg', '/api/uploads/news/3.jpg']);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /two.jpg: Sin conexión/);
});

test('oversized and unsupported files never reach the upload endpoint', async () => {
  let requests = 0;
  const files = [new File([new Uint8Array(4 * 1024 * 1024 + 1)], 'large.jpg', { type: 'image/jpeg' }), new File(['svg'], 'bad.svg', { type: 'image/svg+xml' })];
  const result = await uploadNewsImages(files, { fetcher: async () => { requests++; return success('/images/test.jpg'); } });
  assert.equal(requests, 0);
  assert.equal(result.errors.length, 2);
  assert.deepEqual(result.images, []);
});

test('API rejections are shown and aborting a closed editor stops the remaining queue', async () => {
  const result = await uploadNewsImages([photo('one.jpg')], { fetcher: async () => Response.json({ success: false, message: 'No autorizado.' }, { status: 403 }) });
  assert.match(result.errors[0], /No autorizado/);
  const controller = new AbortController();
  let requests = 0;
  const aborted = await uploadNewsImages([photo('one.jpg'), photo('two.jpg')], {
    signal: controller.signal,
    fetcher: async () => { requests++; controller.abort(); throw new DOMException('Aborted', 'AbortError'); },
  });
  assert.equal(requests, 1);
  assert.deepEqual(aborted, { images: [], errors: [] });
});
