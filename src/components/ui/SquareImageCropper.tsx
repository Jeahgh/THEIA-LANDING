'use client';

import { useEffect, useRef, useState } from 'react';
import { constrainCrop, moveCrop, type CropPoint, type CropTransform } from '@/lib/image-crop';

interface SquareImageCropperProps {
  file: File;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

const outputSize = 1000;

export default function SquareImageCropper({ file, onCancel, onConfirm }: SquareImageCropperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, CropPoint>());
  const backdropPointerRef = useRef(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState<CropTransform>({ zoom: 1, offset: { x: 0, y: 0 } });
  const [cropSize, setCropSize] = useState(320);
  const geometry = { ...dimensions, size: cropSize };
  const { zoom, offset } = constrainCrop(transform, geometry);

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setPreviewUrl(String(reader.result ?? '')));
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
    ? cropSize / Math.min(dimensions.width, dimensions.height)
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
        { ...dimensions, size: cropSize },
      ));
    };
    cropArea.addEventListener('wheel', wheel, { passive: false });
    return () => cropArea.removeEventListener('wheel', wheel);
  }, [cropSize, dimensions]);

  function changeZoom(nextZoom: number) {
    setTransform((current) => constrainCrop({ ...current, zoom: nextZoom }, geometry));
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
    <dialog
      ref={dialogRef}
      onCancel={(event) => { event.preventDefault(); onCancel(); }}
      onPointerDown={(event) => { backdropPointerRef.current = event.target === event.currentTarget; }}
      onClick={(event) => {
        if (event.target === event.currentTarget && backdropPointerRef.current) onCancel();
        backdropPointerRef.current = false;
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain rounded-2xl border-0 bg-transparent p-0 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
      aria-label="Ajustar foto"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <h2 className="text-xl font-bold text-text-primary">Ajustar foto</h2>

        <div
          ref={cropAreaRef}
          className="relative mx-auto mt-5 aspect-square w-full max-w-80 touch-none cursor-grab overflow-hidden rounded-xl bg-slate-900 active:cursor-grabbing"
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

        <input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => changeZoom(Number(event.target.value))} aria-label="Zoom de la foto" className="mt-4 w-full accent-brand-blue" />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-border-subtle px-4 py-3 font-semibold text-text-secondary transition-colors hover:bg-slate-50">
            Cancelar
          </button>
          <button type="button" onClick={() => void confirmCrop()} disabled={!dimensions.width} className="rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-vivid disabled:opacity-50">
            Usar esta foto
          </button>
        </div>
      </div>
    </dialog>
  );
}
