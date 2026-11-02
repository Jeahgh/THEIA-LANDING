import Image from 'next/image';
import Link from 'next/link';

export default function HeroCarousel() {
  return (
    <section id="hero" className="bg-brand-navy pt-16 lg:pt-20" aria-label="Hero principal de Theia">
      <div className="relative min-h-[560px] overflow-hidden border-b border-white/10 sm:min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)]">
        <div className="absolute inset-0 bg-brand-navy">
          <Image
            src="/images/theia-hero-collage.webp"
            alt="Equipo Theia entrenando triatlón y running en Chile"
            fill
            preload
            sizes="(max-width: 639px) 1000px, 100vw"
            className="object-cover object-[52%_center] sm:object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,38,0.08)_0%,rgba(7,20,38,0.12)_35%,rgba(7,20,38,0.55)_62%,rgba(7,20,38,0.96)_100%)] sm:hidden" />
        <div className="absolute inset-0 hidden bg-brand-navy/55 backdrop-blur-[2px] sm:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(7,20,38,0.32)_0%,rgba(7,20,38,0.48)_50%,rgba(7,20,38,0.98)_100%)] sm:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(7,20,38,0.32)_0%,transparent_28%,transparent_72%,rgba(7,20,38,0.32)_100%)] sm:block" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-10 text-center sm:bottom-[5%] sm:pb-0">
          <h1 className="w-fit select-none text-white drop-shadow-[0_14px_30px_rgba(7,20,38,0.95)]">
            <span className="block text-7xl font-bold uppercase leading-[0.82] tracking-[0.05em] sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem]">
              THEIA
            </span>
            <span aria-label="Triatlón Performance" className="mt-4 flex w-full justify-between text-xs font-bold uppercase text-white/85 sm:mt-5 sm:text-sm md:text-base lg:text-lg">
              {Array.from('Triatlón Performance').map((letter, index) => (
                <span key={index} aria-hidden="true">{letter === ' ' ? '\u00a0' : letter}</span>
              ))}
            </span>
          </h1>
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
