import { readFile } from 'node:fs/promises';
import path from 'node:path';

const contentTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export function uploadPublicUrl(folder: string, fileName: string) {
  // La API valida el nombre y sirve los archivos desde el volumen persistente.
  return `/api/uploads/${folder}/${fileName}`;
}

export async function readUploadedImage(parts: string[]) {
  if (parts.length !== 2 || parts.some((part) => !/^[a-z0-9][a-z0-9._-]*$/i.test(part))) {
    return null;
  }

  const [folder, fileName] = parts;
  const contentType = contentTypes[path.extname(fileName).toLowerCase()];

  if (!contentType) {
    return null;
  }

  try {
    const file = await readFile(path.join(process.cwd(), 'public', 'uploads', folder, fileName));
    return { contentType, file };
  } catch {
    return null;
  }
}
