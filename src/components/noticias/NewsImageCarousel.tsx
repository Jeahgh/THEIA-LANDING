'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function NewsImageCarousel({ images, title, variant = 'article', href }: {
  images: string[];
  title: string;
  variant?: 'article' | 'featured' | 'compact';
  href?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;
  const active = count ? index % count : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || !visible || hovered || focused) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setInterval> | undefined;
    function configure() {
      clearInterval(timer);
      if (!motion.matches && !document.hidden) timer = setInterval(() => setIndex((current) => (current + 1) % count), 3500);
    }
    configure();
    motion.addEventListener('change', configure);
    document.addEventListener('visibilitychange', configure);
    return () => { clearInterval(timer); motion.removeEventListener('change', configure); document.removeEventListener('visibilitychange', configure); };
  }, [count, visible, hovered, focused, active]);

  function move(delta: number) {
    setIndex((current) => (current + delta + count) % count);
  }

  if (!count) return null;
  const compact = variant === 'compact';
  const article = variant === 'article';
  const showControls = article && count > 1;
  const buttonClass = 'flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42627b]';
  const slides = images.map((image, item) => <div key={`${image}-${item}`} role="group" aria-roledescription="diapositiva" aria-label={`Foto ${item + 1} de ${count}`} aria-hidden={item !== active} aria-live={focused ? 'polite' : 'off'}
    className={`pointer-events-none absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${item === active ? 'opacity-100' : 'opacity-0'}`}>
    {(item === active || (visible && (item === (active + 1) % count || item === (active + count - 1) % count))) && <Image src={image} alt={count > 1 ? `${title}, foto ${item + 1} de ${count}` : title} fill
      sizes={variant === 'article' ? '(max-width: 896px) 100vw, 896px' : compact ? '(max-width: 640px) 100vw, 160px' : '(max-width: 1024px) 100vw, 50vw'}
      className={article ? 'object-contain' : 'object-cover'} preload={article && item === 0} />}
  </div>);
  return (
    <section ref={container} aria-label={`Fotos de ${title}`} aria-roledescription="carrusel"
      className={`min-w-0 ${article ? 'mb-8' : compact ? 'sm:absolute sm:inset-0' : ''}`}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHovered(false); }}
      onFocusCapture={(event) => { if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) setFocused(true); }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className={`relative w-full touch-pan-y overflow-hidden ${article ? 'aspect-video rounded-2xl' : compact ? 'aspect-video sm:aspect-auto sm:h-full' : 'aspect-[16/10]'}`}
        onTouchStart={(event) => { const point = event.touches[0]; touch.current = point ? { x: point.clientX, y: point.clientY } : null; }}
        onTouchEnd={(event) => {
          const start = touch.current;
          touch.current = null;
          const end = event.changedTouches[0];
          if (!article || !start || !end || count < 2) return;
          const dx = end.clientX - start.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(end.clientY - start.y)) { event.preventDefault(); move(dx < 0 ? 1 : -1); }
        }}>
        {href ? <Link href={href} aria-label={`Leer ${title}`} className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#42627b]">{slides}</Link> : slides}
        {showControls && <>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white tabular-nums">{active + 1} / {count}</span>
          <button type="button" aria-label="Foto anterior" onClick={() => move(-1)} className={`${buttonClass} absolute left-3 top-1/2 -translate-y-1/2`}><svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="m12 5-5 5 5 5" /></svg></button>
          <button type="button" aria-label="Foto siguiente" onClick={() => move(1)} className={`${buttonClass} absolute right-3 top-1/2 -translate-y-1/2`}><svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="m8 5 5 5-5 5" /></svg></button>
        </>}
      </div>
      {showControls && <div className="mt-1 flex justify-center">
        <div className="flex flex-wrap justify-center" aria-label="Seleccionar foto">
          {images.map((image, item) => <button key={`${image}-${item}`} type="button" aria-label={`Mostrar foto ${item + 1}`} aria-current={item === active ? 'true' : undefined} onClick={() => setIndex(item)} className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#42627b]"><span className={`h-1.5 rounded-full ${item === active ? 'w-5 bg-slate-600' : 'w-1.5 bg-slate-300'}`} /></button>)}
        </div>
      </div>}
    </section>
  );
}
