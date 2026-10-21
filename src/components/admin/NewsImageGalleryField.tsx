'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { MAX_NEWS_IMAGES } from '@/lib/news-images';
import { uploadNewsImages } from '@/lib/news-image-upload';
import { useAdminModal } from './AdminModal';
import { deleteIconButtonClass, TrashIcon } from './AdminActionIcons';

export default function NewsImageGalleryField({ defaultImages, onBusyChange }: {
  defaultImages: string[];
  onBusyChange: (busy: boolean) => void;
}) {
  const [images, setImages] = useState(defaultImages);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const modal = useAdminModal();
  useEffect(() => () => request.current?.abort(), []);

  async function upload(files: File[]) {
    if (!files.length || uploading) return;
    if (images.length + files.length > MAX_NEWS_IMAGES) {
      setMessage(`Puedes agregar hasta ${MAX_NEWS_IMAGES} fotos por noticia.`);
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setUploading(true);
    onBusyChange(true);
    modal?.setBusy(true);
    setMessage('');
    try {
      const result = await uploadNewsImages(files, {
        signal: controller.signal,
        onImage: (imageUrl) => setImages((current) => [...new Set([...current, imageUrl])]),
      });
      setMessage(result.errors.join(' '));
    } finally {
      setUploading(false);
      onBusyChange(false);
      modal?.setBusy(false);
    }
  }

  return (
    <section aria-label="Fotos de la noticia">
      <input type="hidden" name="_gallery" value="on" />
      {images.map((image) => <input key={image} type="hidden" name="imageUrls" value={image} />)}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <label htmlFor={inputId} className="block text-sm font-semibold text-text-primary">Fotos de la noticia</label>
          <p className="mt-1 text-xs text-text-secondary">La primera foto será la portada. Hasta {MAX_NEWS_IMAGES} fotos, de 4 MB cada una.</p>
        </div>
        <button type="button" disabled={uploading || images.length >= MAX_NEWS_IMAGES} onClick={() => input.current?.click()}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:opacity-50">
          {uploading ? 'Subiendo fotos…' : 'Agregar fotos'}
        </button>
      </div>
      <input ref={input} id={inputId} type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={uploading || images.length >= MAX_NEWS_IMAGES}
        onChange={(event) => { const files = Array.from(event.target.files ?? []); event.target.value = ''; void upload(files); }} />
      {images.length > 0 && <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => <li key={image} className="min-w-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image src={image} alt={`Foto ${index + 1} de la noticia`} fill sizes="(min-width: 640px) 220px, 45vw" className="object-cover" />
            <button type="button" disabled={uploading} aria-label={`Quitar foto ${index + 1}`} className={`${deleteIconButtonClass} absolute right-2 top-2 bg-white/95`} onClick={() => setImages((current) => current.filter((item) => item !== image))}><TrashIcon /></button>
          </div>
          {index === 0 ? <span className="mt-2 block text-center text-xs font-semibold text-text-secondary">Portada</span>
            : <button type="button" disabled={uploading} aria-label={`Usar foto ${index + 1} como portada`} onClick={() => setImages((current) => [image, ...current.filter((item) => item !== image)])} className="mt-2 w-full rounded py-1 text-center text-xs font-semibold text-text-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand-blue">Usar de portada</button>}
        </li>)}
      </ol>}
      {uploading && <p role="status" className="mt-3 text-sm text-text-secondary">Subiendo fotos…</p>}
      {message && <p role="alert" className="mt-3 text-sm text-red-700 [overflow-wrap:anywhere]">{message}</p>}
    </section>
  );
}
