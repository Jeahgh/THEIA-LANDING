'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProfileAvatar({ image, name, sizes }: {
  image?: string | null;
  name?: string | null;
  sizes: string;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const source = image?.trim();
  const label = name?.trim() || 'Perfil';

  if (!source || source === failedImage) {
    return <span role="img" aria-label={label}>{name?.trim().charAt(0).toLocaleUpperCase('es') || 'A'}</span>;
  }

  return (
    <Image
      src={source}
      alt={label}
      fill
      sizes={sizes}
      className="object-cover"
      // Los uploads cambian de versión al guardarse. Las fotos de Google usan
      // el optimizador para evitar solicitudes directas desde cada navegador.
      unoptimized={/^\/(?:api\/)?uploads\/profiles\//.test(source)}
      onError={() => setFailedImage(source)}
    />
  );
}
