import Image from 'next/image';
import Link from 'next/link';

export default function HeroCarousel() {
  return (
    <section id="hero" className="bg-brand-navy pt-16 lg:pt-20" aria-label="Hero principal de Theia">
      <div className="relative min-h-[560px] overflow-hidden border-b border-white/10 sm:min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)]">
        <div className="absolute inset-x-0 top-0 h-[58%] bg-brand-navy sm:inset-0 sm:h-auto">
          <Image
            src="/images/theia-hero-collage.jpeg"
            alt="Atletas Theia en triatlón"
            fill
            preload
            sizes="100vw"
            className="object-contain object-center sm:object-cover"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-brand-navy sm:hidden" />
        <div className="absolute inset-x-0 top-0 h-[64%] bg-[linear-gradient(180deg,rgba(7,20,38,0.04)_0%,rgba(7,20,38,0.18)_48%,rgba(7,20,38,0.94)_100%)] sm:hidden" />
        <div className="absolute inset-0 hidden bg-brand-navy/55 backdrop-blur-[2px] sm:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(7,20,38,0.32)_0%,rgba(7,20,38,0.48)_50%,rgba(7,20,38,0.98)_100%)] sm:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(7,20,38,0.32)_0%,transparent_28%,transparent_72%,rgba(7,20,38,0.32)_100%)] sm:block" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-10 text-center sm:bottom-[5%] sm:pb-0">
          <h1 className="select-none text-7xl font-bold uppercase leading-[0.82] tracking-[0.05em] text-white drop-shadow-[0_14px_30px_rgba(7,20,38,0.95)] sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem]">
            THEIA
          </h1>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/75 sm:mt-5 sm:text-sm md:text-base lg:text-lg">
            Triathlon Performance
          </p>
          <Link
            href="/planes"
            className="mt-7 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-brand-blue px-6 py-3.5 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-brand-blue/35 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-vivid hover:shadow-xl hover:shadow-brand-blue/40 sm:mt-8 sm:min-w-60 sm:w-auto sm:px-8"
          >
            Ver planes de entrenamiento
          </Link>
        </div>
      </div>
    </section>
  );
}
