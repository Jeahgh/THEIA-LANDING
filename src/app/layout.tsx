import type { Metadata } from 'next';
import { Montserrat, Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/auth/AuthProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Inicio | Theia',
    template: '%s | Theia',
  },
  description:
    'Theia Triathlon Performance: entrenamiento profesional de natacion, ciclismo y running para todos los niveles.',
  keywords: [
    'triatlon',
    'club de triatlon',
    'theia',
    'triathlon performance',
    'natacion',
    'ciclismo',
    'running',
    'entrenamiento',
    'competencias',
    'chile',
  ],
  openGraph: {
    title: 'Theia Triathlon Performance',
    description: 'Nada. Pedalea. Corre.',
    type: 'website',
    locale: 'es_CL',
  },
  icons: {
    icon: '/images/logo-theia-blanco.png',
    shortcut: '/images/logo-theia-blanco.png',
    apple: '/images/logo-theia-blanco.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${montserrat.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
