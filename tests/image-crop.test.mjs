import assert from 'node:assert/strict';
import test from 'node:test';
import { constrainCrop, moveCrop } from '../src/lib/image-crop.ts';

const geometry = { width: 1200, height: 800, size: 320 };
const initial = { zoom: 1, offset: { x: 0, y: 0 } };

test('one finger pans while keeping the crop entirely covered', () => {
  const next = moveCrop(initial, [{ x: 0, y: 0 }], [{ x: 200, y: 100 }], geometry);
  assert.equal(next.offset.x, 80);
  assert.equal(next.offset.y, 0);
  assert.equal(next.zoom, 1);
});

test('pinch zooms around the fingers and supports two-finger panning', () => {
  const next = moveCrop(initial, [{ x: -50, y: 0 }, { x: 50, y: 0 }], [{ x: -80, y: 20 }, { x: 120, y: 20 }], geometry);
  assert.deepEqual(next, { zoom: 2, offset: { x: 20, y: 20 } });
  const pan = moveCrop(next, [{ x: -80, y: 20 }, { x: 120, y: 20 }], [{ x: -70, y: 30 }, { x: 130, y: 30 }], geometry);
  assert.deepEqual(pan, { zoom: 2, offset: { x: 30, y: 30 } });
});

test('lifting one finger continues panning without a jump', () => {
  const pinched = { zoom: 2, offset: { x: 20, y: 20 } };
  const next = moveCrop(pinched, [{ x: 120, y: 20 }], [{ x: 125, y: 22 }], geometry);
  assert.deepEqual(next, { zoom: 2, offset: { x: 25, y: 22 } });
});

test('zoom limits and portrait/square bounds prevent empty crop areas', () => {
  assert.deepEqual(constrainCrop({ zoom: 0.2, offset: { x: 500, y: 500 } }, { width: 800, height: 1200, size: 320 }), { zoom: 1, offset: { x: 0, y: 80 } });
  const enlarged = constrainCrop({ zoom: 8, offset: { x: -5000, y: 5000 } }, { width: 800, height: 800, size: 320 });
  assert.equal(enlarged.zoom, 3);
  assert.ok(Math.abs(enlarged.offset.x + 320) < 1e-9);
  assert.ok(Math.abs(enlarged.offset.y - 320) < 1e-9);
  assert.deepEqual(moveCrop(initial, [{ x: 0, y: 0 }, { x: 0, y: 0 }], [{ x: 0, y: 0 }, { x: 0, y: 0 }], geometry), initial);
});
