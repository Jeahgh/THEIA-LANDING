// =============================================================================
// Root Layout — THEIA Triathlon Performance
// =============================================================================
// Tipografía:
// - Montserrat: headings — deportiva, geométrica, con personalidad y fuerza
// - Nunito: body text — redondeada, cálida, amigable y legible
// =============================================================================

import type { Metadata } from 'next';
import { Montserrat, Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ---------------------------------------------------------------------------
// Fuentes — elegidas para transmitir calidez y energía deportiva
// ---------------------------------------------------------------------------

/** Montserrat: Para headings. Geométrica, deportiva, con carácter fuerte. */
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

/** Nunito: Para body text. Redondeada, cálida, transmite cercanía. */
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

// ---------------------------------------------------------------------------
// Metadata SEO global
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: 'Theia Triathlon Performance | Supera tus límites',
    template: '%s | Theia Triathlon Performance',
  },
  description:
    'Theia Triathlon Performance: entrenamiento profesional de natación, ciclismo y running para todos los niveles. Únete a nuestra comunidad deportiva en Chile.',
  keywords: [
    'triatlón', 'club de triatlón', 'theia', 'triathlon performance',
    'natación', 'ciclismo', 'running', 'entrenamiento', 'competencias',
    'ironman', 'sprint', 'chile',
  ],
  openGraph: {
    title: 'Theia Triathlon Performance',
    description: 'Supera tus límites. Nada. Pedalea. Corre.',
    type: 'website',
    locale: 'es_CL',
  },
};

// ---------------------------------------------------------------------------
// Root Layout Component
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
