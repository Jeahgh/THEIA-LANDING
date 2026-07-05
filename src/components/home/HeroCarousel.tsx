import Image from 'next/image';
import Link from 'next/link';

export default function HeroCarousel() {
  return (
    <section id="hero" className="bg-brand-navy pt-16 lg:pt-20" aria-label="Hero principal de Theia">
      <div className="relative min-h-[calc(100svh-4rem)] overflow-hidden border-b border-white/10 lg:min-h-[calc(100svh-5rem)]">
        <Image
          src="/images/theia-hero-collage.jpeg"
          alt="Atletas Theia en triatlón"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-brand-navy/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,38,0.32)_0%,rgba(7,20,38,0.48)_50%,rgba(7,20,38,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.32)_0%,transparent_28%,transparent_72%,rgba(7,20,38,0.32)_100%)]" />

        <div className="absolute inset-x-0 bottom-[6%] z-10 flex flex-col items-center px-4 text-center sm:bottom-[5%]">
          <h1 className="select-none text-[clamp(4rem,13vw,12rem)] font-bold uppercase leading-[0.82] tracking-[0.05em] text-white drop-shadow-[0_14px_30px_rgba(7,20,38,0.95)]">
            THEIA
          </h1>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/75 sm:mt-5 sm:text-sm md:text-base lg:text-lg">
            Triathlon Performance
          </p>
          <Link
            href="/planes"
            className="mt-7 inline-flex min-w-60 items-center justify-center rounded-full bg-brand-blue px-8 py-3.5 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-brand-blue/35 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-vivid hover:shadow-xl hover:shadow-brand-blue/40 sm:mt-8"
          >
            Ver planes de entrenamiento
          </Link>
        </div>
      </div>
    </section>
  );
}
