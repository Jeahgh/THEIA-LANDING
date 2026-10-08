import type { Metadata } from 'next';
import { Montserrat, Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/auth/AuthProvider';
import JsonLd from '@/components/seo/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  websiteStructuredData,
} from '@/lib/seo';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Theia | Entrenamiento de triatlón y running en Chile',
    template: '%s | Theia',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'sports',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Theia | Entrenamiento de triatlón y running en Chile',
    description: DEFAULT_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    locale: SITE_LOCALE,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Equipo Theia de triatlón y running en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theia | Entrenamiento de triatlón y running en Chile',
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
    <html lang="es-CL" data-scroll-behavior="smooth" className={`${montserrat.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={websiteStructuredData} />
        <AuthProvider>
          <Navbar />
        </AuthProvider>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
