import assert from 'node:assert/strict';
import test from 'node:test';
import { getNewsImages, MAX_NEWS_IMAGES, readNewsImages } from '../src/lib/news-images.ts';

function gallery(urls) {
  const form = new FormData();
  form.set('_gallery', 'on');
  for (const url of urls) form.append('imageUrls', url);
  return form;
}

test('existing single-photo news keeps its cover without a gallery backfill', () => {
  assert.deepEqual(getNewsImages({ imageUrl: '/images/hero-bike-team.jpg' }), ['/images/hero-bike-team.jpg']);
  assert.deepEqual(getNewsImages({}), []);
});

test('cover appears first, duplicates disappear and the remaining photo order is preserved', () => {
  assert.deepEqual(getNewsImages({ imageUrl: '/images/a.jpg', imageUrls: ['/images/b.jpg', '/images/a.jpg', '/images/c.jpg'] }), ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg']);
  assert.deepEqual(readNewsImages(gallery(['/images/b.jpg', '', '/images/a.jpg', '/images/b.jpg'])), {
    imageUrl: '/images/b.jpg', imageUrls: ['/images/b.jpg', '/images/a.jpg'],
  });
});

test('clearing a gallery clears its cover; legacy forms do not erase an existing gallery', () => {
  assert.deepEqual(readNewsImages(gallery([])), { imageUrl: null, imageUrls: [] });
  const form = new FormData();
  form.set('imageUrl', '/images/hero-bike-team.jpg');
  assert.deepEqual(readNewsImages(form), { imageUrl: '/images/hero-bike-team.jpg' });
});

test('gallery limits and local news image paths are validated', () => {
  assert.throws(() => readNewsImages(gallery(Array.from({ length: MAX_NEWS_IMAGES + 1 }, (_, i) => `/images/a-${i}.jpg`))));
  for (const url of ['javascript:alert(1)', 'https://example.com/a.jpg', '/api/uploads/news/../secret.jpg', '/api/uploads/profiles/avatar.jpg', '/images/a.jpg?x=1', '/images/a.svg']) {
    assert.throws(() => readNewsImages(gallery([url])));
  }
  const form = gallery([]);
  form.append('imageUrls', new Blob(['invalid']), 'photo.png');
  assert.throws(() => readNewsImages(form));
  assert.equal(readNewsImages(gallery(['/uploads/news/old.jpg', '/api/uploads/news/new.webp'])).imageUrls.length, 2);
});
