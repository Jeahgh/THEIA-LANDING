import Image from 'next/image';
import { CLUB_INFO } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function AboutPreview() {
  return (
    <section id="about-preview" className="w-full px-6 sm:px-8 lg:px-12 py-16 sm:py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image side */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <Image
            src="/images/equipo-running.jpg"
            alt="Equipo Theia celebrando después de una competencia"
            width={800}
            height={600}
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-4 bg-accent-warm/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-semibold">
            Maratón de Santiago 2026
          </div>
        </div>

        {/* Text side */}
        <div>
          <div className="accent-line mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Somos <span className="text-gradient">Theia</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            {CLUB_INFO.description}
          </p>
          <p className="text-text-secondary leading-relaxed mb-8">
            Desde principiantes que dan sus primeros pasos hasta atletas que compiten en circuitos internacionales como Ironman, en Theia encontrarás un espacio para crecer y superarte.
          </p>
          <Button variant="primary" href="/nosotros">
            Conoce nuestra historia
          </Button>
        </div>
      </div>
    </section>
  );
}
