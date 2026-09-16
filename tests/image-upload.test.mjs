import assert from 'node:assert/strict';
import test from 'node:test';

import {
  detectImageContentType,
  InvalidImageUploadError,
  validateImageUpload,
} from '../src/lib/image-upload.ts';

const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0x00]);
const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
const webp = Uint8Array.from([
  0x52, 0x49, 0x46, 0x46, 0x04, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
]);

test('image signature detection recognizes the three allowed formats', () => {
  assert.equal(detectImageContentType(jpeg), 'image/jpeg');
  assert.equal(detectImageContentType(png), 'image/png');
  assert.equal(detectImageContentType(webp), 'image/webp');
});

test('image validation rejects MIME spoofing, unknown and empty files', () => {
  assert.throws(() => validateImageUpload(jpeg, 'image/png', 100), InvalidImageUploadError);
  assert.throws(
    () => validateImageUpload(Uint8Array.from([1, 2, 3]), 'image/png', 100),
    InvalidImageUploadError,
  );
  assert.throws(() => validateImageUpload(new Uint8Array(), 'image/png', 100), InvalidImageUploadError);
});

test('image validation enforces the byte limit and returns a safe extension', () => {
  assert.throws(() => validateImageUpload(png, 'image/png', 4), InvalidImageUploadError);
  assert.equal(validateImageUpload(png, 'image/png', 100).extension, 'png');
});
