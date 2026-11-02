'use client';

import { useEffect, useRef, useState } from 'react';
import { constrainCrop, moveCrop, type CropPoint, type CropTransform } from '@/lib/image-crop';

interface SquareImageCropperProps {
  file: File;
  onCancel: () => void;
  onConfirm: (file: File) => void;
  aspectRatio?: number;
}

const outputSize = 1000;

export default function SquareImageCropper({ file, onCancel, onConfirm, aspectRatio = 1 }: SquareImageCropperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, CropPoint>());
  const backdropPointerRef = useRef(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState<CropTransform>({ zoom: 1, offset: { x: 0, y: 0 } });
  const [cropSize, setCropSize] = useState(320);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const cropHeight = cropSize / aspectRatio;
  const geometry = { ...dimensions, size: cropSize, aspectRatio };
  const { zoom, offset } = constrainCrop(transform, geometry);

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setPreviewUrl(String(reader.result ?? '')));
    reader.addEventListener('error', () => setError('No se pudo leer esta foto. Selecciona otra imagen.'));
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    dialog?.showModal();

    return () => {
      dialog?.close();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);
  useEffect(() => {
    const cropArea = cropAreaRef.current;
    if (!cropArea) return;

    const updateSize = () => setCropSize(cropArea.clientWidth);
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(cropArea);
    return () => observer.disconnect();
  }, []);

  const baseScale = dimensions.width && dimensions.height
    ? Math.max(cropSize / dimensions.width, cropHeight / dimensions.height)
    : 1;
  const renderedWidth = dimensions.width * baseScale * zoom;
  const renderedHeight = dimensions.height * baseScale * zoom;

  useEffect(() => {
    const cropArea = cropAreaRef.current;
    if (!cropArea) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      setTransform((current) => constrainCrop(
        { ...current, zoom: current.zoom - event.deltaY * 0.002 },
        { ...dimensions, size: cropSize, aspectRatio },
      ));
    };
    cropArea.addEventListener('wheel', wheel, { passive: false });
    return () => cropArea.removeEventListener('wheel', wheel);
  }, [cropSize, dimensions, aspectRatio]);

  async function confirmCrop() {
    const image = imageRef.current;
    if (!image || !dimensions.width || !dimensions.height || saving) return;
    setSaving(true);
    setError('');
    try {
      const scale = baseScale * zoom;
      const sourceWidth = cropSize / scale;
      const sourceHeight = cropHeight / scale;
      const sourceX = (dimensions.width - sourceWidth) / 2 - offset.x / scale;
      const sourceY = (dimensions.height - sourceHeight) / 2 - offset.y / scale;
      const canvas = document.createElement('canvas');
      canvas.width = outputSize;
      canvas.height = Math.round(outputSize / aspectRatio);
      const context = canvas.getContext('2d');

      if (!context) throw new Error('No se pudo ajustar esta foto. Inténtalo de nuevo.');

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

      const outputType = 'image/webp';
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputType, 0.9));
      if (!blob) throw new Error('No se pudo preparar esta foto. Inténtalo de nuevo.');

      const baseName = file.name.replace(/\.[^/.]+$/, '') || 'imagen';
      onConfirm(new File([blob], `${baseName}-recortada.webp`, { type: outputType }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo ajustar esta foto.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => { event.preventDefault(); if (!saving) onCancel(); }}
      onPointerDown={(event) => { backdropPointerRef.current = event.target === event.currentTarget; }}
      onClick={(event) => {
        if (event.target === event.currentTarget && backdropPointerRef.current && !saving) onCancel();
        backdropPointerRef.current = false;
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain rounded-2xl border-0 bg-transparent p-0 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
      aria-label="Ajustar foto"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <h2 className="text-xl font-bold text-text-primary">Ajustar foto</h2>
        <p className="mt-2 text-sm text-text-secondary">Arrastra la foto para encuadrarla y usa la rueda del mouse para acercar o alejar. En el celular puedes usar dos dedos.</p>

        <div
          ref={cropAreaRef}
          className="relative mx-auto mt-5 w-full max-w-80 touch-none cursor-grab overflow-hidden rounded-xl bg-slate-900 outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-blue active:cursor-grabbing"
          style={{ aspectRatio }}
          tabIndex={0}
          role="group"
          aria-label="Encuadre de la foto. Usa las flechas para moverla."
          onKeyDown={(event) => {
            const movement = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[event.key];
            if (!movement) return;
            event.preventDefault();
            setTransform((current) => constrainCrop({ ...current, offset: { x: current.offset.x + movement[0], y: current.offset.y + movement[1] } }, geometry));
          }}
          onPointerDown={(event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            const rect = event.currentTarget.getBoundingClientRect();
            pointersRef.current.set(event.pointerId, { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 });
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!pointersRef.current.has(event.pointerId)) return;
            const previous = [...pointersRef.current.values()].slice(0, 2);
            const rect = event.currentTarget.getBoundingClientRect();
            pointersRef.current.set(event.pointerId, { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 });
            const next = [...pointersRef.current.values()].slice(0, 2);
            setTransform((current) => moveCrop(current, previous, next, geometry));
          }}
          onPointerUp={(event) => {
            pointersRef.current.delete(event.pointerId);
          }}
          onPointerCancel={(event) => { pointersRef.current.delete(event.pointerId); }}
          onLostPointerCapture={(event) => { pointersRef.current.delete(event.pointerId); }}
          onDoubleClick={() => {
            setTransform({ zoom: 1, offset: { x: 0, y: 0 } });
          }}
        >
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imageRef}
              src={previewUrl}
              alt="Vista previa para recortar"
              draggable={false}
              onLoad={(event) => {
                setDimensions({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight });
                setTransform({ zoom: 1, offset: { x: 0, y: 0 } });
              }}
              onError={() => setError('No se pudo abrir esta foto. Selecciona otra imagen.')}
              className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
              style={{
                width: renderedWidth || 'auto',
                height: renderedHeight || 'auto',
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-white/90 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.35)]" />
        </div>

        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={onCancel} disabled={saving} className="rounded-xl border border-border-subtle px-4 py-3 font-semibold text-text-secondary transition-colors hover:bg-slate-50">
            Cancelar
          </button>
          <button type="button" onClick={() => void confirmCrop()} disabled={!dimensions.width || saving} className="rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-vivid disabled:opacity-50">
            {saving ? 'Preparando…' : 'Usar esta foto'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
