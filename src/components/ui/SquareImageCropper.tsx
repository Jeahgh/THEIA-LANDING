'use client';

import { useEffect, useRef, useState } from 'react';

interface SquareImageCropperProps {
  file: File;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

const outputSize = 1000;

export default function SquareImageCropper({ file, onCancel, onConfirm }: SquareImageCropperProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState(320);

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setPreviewUrl(String(reader.result ?? '')));
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file]);
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
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
    ? cropSize / Math.min(dimensions.width, dimensions.height)
    : 1;
  const renderedWidth = dimensions.width * baseScale * zoom;
  const renderedHeight = dimensions.height * baseScale * zoom;
  const maxX = Math.max(0, (renderedWidth - cropSize) / 2);
  const maxY = Math.max(0, (renderedHeight - cropSize) / 2);

  function clampOffset(next: { x: number; y: number }) {
    return {
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
  }

  function changeZoom(nextZoom: number) {
    const safeZoom = Math.max(1, Math.min(3, nextZoom));
    const nextRenderedWidth = dimensions.width * baseScale * safeZoom;
    const nextRenderedHeight = dimensions.height * baseScale * safeZoom;
    const nextMaxX = Math.max(0, (nextRenderedWidth - cropSize) / 2);
    const nextMaxY = Math.max(0, (nextRenderedHeight - cropSize) / 2);

    setZoom(safeZoom);
    setOffset((current) => ({
      x: Math.max(-nextMaxX, Math.min(nextMaxX, current.x)),
      y: Math.max(-nextMaxY, Math.min(nextMaxY, current.y)),
    }));
  }

  async function confirmCrop() {
    const image = imageRef.current;
    if (!image || !dimensions.width || !dimensions.height) return;

    const scale = baseScale * zoom;
    const sourceSize = cropSize / scale;
    const sourceX = (dimensions.width - sourceSize) / 2 - offset.x / scale;
    const sourceY = (dimensions.height - sourceSize) / 2 - offset.y / scale;
    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const context = canvas.getContext('2d');

    if (!context) return;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, outputSize, outputSize);

    const outputType = 'image/webp';
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputType, 0.9));
    if (!blob) return;

    const baseName = file.name.replace(/\.[^/.]+$/, '') || 'imagen';
    onConfirm(new File([blob], `${baseName}-recortada.webp`, { type: outputType }));
  }

  return (
    <div className="fixed inset-0 z-[100] flex overscroll-none items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Ajustar imagen">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <h2 className="text-xl font-bold text-text-primary">Ajusta la foto</h2>
        <p className="mt-1 text-sm text-text-secondary">Arrastra la foto para moverla y usa la rueda del mouse para acercar o alejar.</p>

        <div
          ref={cropAreaRef}
          className="relative mx-auto mt-5 aspect-square w-full max-w-80 touch-none cursor-grab overflow-hidden rounded-xl bg-slate-900 active:cursor-grabbing"
          onPointerDown={(event) => {
            dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            const deltaX = event.clientX - drag.x;
            const deltaY = event.clientY - drag.y;
            dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
            setOffset((current) => clampOffset({ x: current.x + deltaX, y: current.y + deltaY }));
          }}
          onPointerUp={(event) => {
            if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
          }}
          onPointerCancel={() => { dragRef.current = null; }}
          onWheel={(event) => {
            event.preventDefault();
            changeZoom(zoom - event.deltaY * 0.002);
          }}
          onDoubleClick={() => {
            setZoom(1);
            setOffset({ x: 0, y: 0 });
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
                setOffset({ x: 0, y: 0 });
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
              style={{
                width: renderedWidth || 'auto',
                height: renderedHeight || 'auto',
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-white/90 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.35)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Arrastra · Rueda para ajustar
            </span>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-text-muted">Doble clic para volver a centrar</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-border-subtle px-4 py-3 font-semibold text-text-secondary transition-colors hover:bg-slate-50">
            Cancelar
          </button>
          <button type="button" onClick={() => void confirmCrop()} disabled={!dimensions.width} className="rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-vivid disabled:opacity-50">
            Usar esta foto
          </button>
        </div>
      </div>
    </div>
  );
}
