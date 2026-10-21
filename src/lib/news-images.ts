export const MAX_NEWS_IMAGES = 10;

export function getNewsImages(post: { imageUrl?: string | null; imageUrls?: string[] }) {
  return [...new Set([post.imageUrl, ...(post.imageUrls ?? [])].filter((image): image is string => Boolean(image)))];
}

export function readNewsImages(formData: FormData) {
  // Older forms still submit only a cover. Do not erase their existing gallery.
  if (formData.get('_gallery') !== 'on') {
    return { imageUrl: String(formData.get('imageUrl') ?? '').trim() || null };
  }
  const submitted = formData.getAll('imageUrls');
  if (submitted.some((value) => typeof value !== 'string')) throw new Error('Selecciona imágenes válidas.');
  const imageUrls = [...new Set(submitted.map((value) => String(value).trim()).filter(Boolean))];
  if (imageUrls.length > MAX_NEWS_IMAGES) throw new Error(`Puedes agregar hasta ${MAX_NEWS_IMAGES} fotos por noticia.`);
  const validPath = /^(?:\/(?:api\/)?uploads\/news\/|\/images\/)[a-z0-9][a-z0-9._-]*\.(?:jpe?g|png|webp)$/i;
  if (imageUrls.some((value) => !validPath.test(value))) throw new Error('Selecciona imágenes de noticia válidas.');
  return { imageUrl: imageUrls[0] ?? null, imageUrls };
}
