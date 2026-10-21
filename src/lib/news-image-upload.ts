export async function uploadNewsImages(files: File[], {
  signal,
  onImage,
  fetcher = fetch,
}: {
  signal?: AbortSignal;
  onImage?: (url: string) => void;
  fetcher?: typeof fetch;
} = {}) {
  const images: string[] = [];
  const errors: string[] = [];
  for (const file of files) {
    if (signal?.aborted) break;
    try {
      if (!file.size || file.size > 4 * 1024 * 1024) throw new Error('Cada foto debe pesar como máximo 4 MB.');
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Usa fotos JPG, PNG o WebP.');
      const body = new FormData();
      body.set('file', file);
      body.set('folder', 'news');
      const response = await fetcher('/api/admin/uploads', { method: 'POST', body, signal });
      const data = await response.json() as { success?: boolean; imageUrl?: string; message?: string };
      if (!response.ok || !data.success || typeof data.imageUrl !== 'string' || !data.imageUrl) throw new Error(data.message ?? 'No se pudo subir la foto.');
      images.push(data.imageUrl);
      onImage?.(data.imageUrl);
    } catch (error) {
      if (signal?.aborted) break;
      errors.push(`${file.name}: ${error instanceof Error ? error.message : 'No se pudo subir la foto.'}`);
    }
  }
  return { images, errors };
}
