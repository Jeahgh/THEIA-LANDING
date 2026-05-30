'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AvatarUpload({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(image ?? '');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const initial = (name ?? 'A').charAt(0).toUpperCase();

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch('/api/profile/avatar', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    setIsUploading(false);

    if (!response.ok) {
      setMessage(data.message ?? 'No pudimos subir la imagen.');
      return;
    }

    setPreview(data.imageUrl);
    setMessage('Foto actualizada.');
    router.refresh();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary">Foto de perfil</h2>
      <p className="mt-1 text-sm text-text-secondary">Pasa el mouse por la foto y haz click para cambiarla.</p>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-brand-blue-pale text-3xl font-bold text-brand-blue ring-4 ring-brand-blue-pale ring-offset-4 ring-offset-white transition-transform hover:scale-[1.02] disabled:cursor-wait"
          aria-label="Cambiar foto de perfil"
        >
          {preview ? (
            <Image src={preview} alt={name ?? 'Perfil'} fill className="object-cover" sizes="112px" />
          ) : (
            initial
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-slate-950/45 px-3 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
            {isUploading ? 'Subiendo...' : 'Cambiar foto'}
          </span>
        </button>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file);
            }}
          />
          <p className="text-sm text-text-secondary">Formatos JPG, PNG o WebP. Maximo 2 MB.</p>
          {message && <p className="mt-3 text-sm text-text-secondary">{message}</p>}
        </div>
      </div>
    </div>
  );
}
