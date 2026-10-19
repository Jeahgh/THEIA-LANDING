export type CropPoint = { x: number; y: number };
export type CropTransform = { zoom: number; offset: CropPoint };
export type CropGeometry = { width: number; height: number; size: number };

export function constrainCrop(transform: CropTransform, geometry: CropGeometry): CropTransform {
  const zoom = Math.max(1, Math.min(3, transform.zoom));
  const scale = geometry.width && geometry.height
    ? geometry.size / Math.min(geometry.width, geometry.height) * zoom
    : 1;
  const maxX = Math.max(0, (geometry.width * scale - geometry.size) / 2);
  const maxY = Math.max(0, (geometry.height * scale - geometry.size) / 2);
  return {
    zoom,
    offset: {
      x: Math.max(-maxX, Math.min(maxX, transform.offset.x)),
      y: Math.max(-maxY, Math.min(maxY, transform.offset.y)),
    },
  };
}

// Los puntos se expresan respecto al centro del recorte. Al pellizcar se
// conserva bajo los dedos el mismo punto de la foto, sin saltos al soltar uno.
export function moveCrop(
  transform: CropTransform,
  previous: CropPoint[],
  next: CropPoint[],
  geometry: CropGeometry,
): CropTransform {
  if (!previous.length || previous.length !== next.length) return transform;
  const center = (points: CropPoint[]) => points.length > 1
    ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
    : points[0];
  const before = center(previous);
  const after = center(next);
  const distance = (points: CropPoint[]) => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  const oldDistance = previous.length > 1 ? distance(previous) : 0;
  const zoom = oldDistance > 0
    ? Math.max(1, Math.min(3, transform.zoom * distance(next) / oldDistance))
    : transform.zoom;
  const ratio = zoom / transform.zoom;
  return constrainCrop({
    zoom,
    offset: {
      x: after.x - (before.x - transform.offset.x) * ratio,
      y: after.y - (before.y - transform.offset.y) * ratio,
    },
  }, geometry);
}
