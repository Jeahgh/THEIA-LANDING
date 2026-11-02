'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useId, useRef, useState } from 'react';
import { MAX_NEWS_IMAGES } from '@/lib/news-images';
import { uploadNewsImages } from '@/lib/news-image-upload';
import { useAdminModal } from './AdminModal';
import { deleteIconButtonClass, TrashIcon } from './AdminActionIcons';

const ImageCropper = dynamic(() => import('@/components/ui/SquareImageCropper'));

export default function NewsImageGalleryField({ defaultImages, onBusyChange }: {
  defaultImages: string[];
  onBusyChange: (busy: boolean) => void;
}) {
  const [images, setImages] = useState(defaultImages);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState<{ files: File[]; index: number; ready: File[] } | null>(null);
  const busy = uploading || pending !== null;
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const modal = useAdminModal();
  useEffect(() => () => request.current?.abort(), []);

  function selectPhotos(files: File[]) {
    if (!files.length || busy) return;
    if (images.length + files.length > MAX_NEWS_IMAGES) {
      setMessage(`Puedes agregar hasta ${MAX_NEWS_IMAGES} fotos por noticia.`);
      return;
    }
    const valid: File[] = [];
    const errors: string[] = [];
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) errors.push(`${file.name}: usa fotos JPG, PNG o WebP.`);
      else if (!file.size || file.size > 4 * 1024 * 1024) errors.push(`${file.name}: cada foto debe pesar como máximo 4 MB.`);
      else valid.push(file);
    }
    setMessage(errors.join(' '));
    if (!valid.length) return;
    onBusyChange(true);
    modal?.setBusy(true);
    setPending({ files: valid, index: 0, ready: [] });
  }

  function cancelAdjustment() {
    setPending(null);
    onBusyChange(false);
    modal?.setBusy(false);
  }

  function confirmPhoto(file: File) {
    if (!pending) return;
    const ready = [...pending.ready, file];
    if (pending.index + 1 < pending.files.length) {
      setPending({ ...pending, index: pending.index + 1, ready });
    } else {
      setPending(null);
      void upload(ready);
    }
  }

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
    try {
      const result = await uploadNewsImages(files, {
        signal: controller.signal,
        onImage: (imageUrl) => setImages((current) => [...new Set([...current, imageUrl])]),
      });
      if (result.errors.length) setMessage((current) => [current, ...result.errors].filter(Boolean).join(' '));
    } finally {
      setUploading(false);
      onBusyChange(false);
      modal?.setBusy(false);
    }
  }

  return (
    <section aria-label="Fotos de la noticia">
      {pending && <ImageCropper key={pending.index} file={pending.files[pending.index]} aspectRatio={16 / 10} onCancel={cancelAdjustment} onConfirm={confirmPhoto} />}
      <input type="hidden" name="_gallery" value="on" />
      {images.map((image) => <input key={image} type="hidden" name="imageUrls" value={image} />)}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <label htmlFor={inputId} className="block text-sm font-semibold text-text-primary">Fotos de la noticia</label>
          <p className="mt-1 text-xs text-text-secondary">Ajusta el encuadre de cada foto antes de subirla. La primera será la portada. Hasta {MAX_NEWS_IMAGES} fotos, de 4 MB cada una.</p>
        </div>
        <button type="button" disabled={busy || images.length >= MAX_NEWS_IMAGES} onClick={() => input.current?.click()}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:opacity-50">
          {uploading ? 'Subiendo fotos…' : 'Agregar fotos'}
        </button>
      </div>
      <input ref={input} id={inputId} type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={busy || images.length >= MAX_NEWS_IMAGES}
        onChange={(event) => { const files = Array.from(event.target.files ?? []); event.target.value = ''; selectPhotos(files); }} />
      {images.length > 0 && <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => <li key={image} className="min-w-0">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
            <Image src={image} alt={`Foto ${index + 1} de la noticia`} fill sizes="(min-width: 640px) 220px, 45vw" className="object-cover" />
            <button type="button" disabled={busy} aria-label={`Quitar foto ${index + 1}`} className={`${deleteIconButtonClass} absolute right-2 top-2 bg-white/95`} onClick={() => setImages((current) => current.filter((item) => item !== image))}><TrashIcon /></button>
          </div>
          {index === 0 ? <span className="mt-2 block text-center text-xs font-semibold text-text-secondary">Portada</span>
            : <button type="button" disabled={busy} aria-label={`Usar foto ${index + 1} como portada`} onClick={() => setImages((current) => [image, ...current.filter((item) => item !== image)])} className="mt-2 w-full rounded py-1 text-center text-xs font-semibold text-text-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand-blue">Usar de portada</button>}
        </li>)}
      </ol>}
      {uploading && <p role="status" className="mt-3 text-sm text-text-secondary">Subiendo fotos…</p>}
      {pending && <p role="status" className="mt-3 text-sm text-text-secondary">Ajustando foto {pending.index + 1} de {pending.files.length}…</p>}
      {message && <p role="alert" className="mt-3 text-sm text-red-700 [overflow-wrap:anywhere]">{message}</p>}
    </section>
  );
}
