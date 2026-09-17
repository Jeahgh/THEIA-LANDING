import type { Metadata } from 'next';
import { CLUB_INFO, SOCIAL_LINKS } from '@/lib/constants';

export const SITE_URL = 'https://theiasport.cl';
export const SITE_NAME = 'Theia Triathlon Performance';
export const SITE_LOCALE = 'es_CL';
export const SITE_LANGUAGE = 'es-CL';
export const DEFAULT_DESCRIPTION =
  'Equipo y plataforma de entrenamiento de triatlón y running en Chile para deportistas de distintos niveles y objetivos.';
export const DEFAULT_OG_IMAGE = '/images/og-theia.jpg';

export const PRIVATE_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const socialTitle = title.includes('Theia') ? title : `${title} | Theia`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'Equipo Theia de triatlón y running en Chile',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SportsOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: CLUB_INFO.name,
      alternateName: CLUB_INFO.shortName,
      url: SITE_URL,
      logo: absoluteUrl('/images/logo-theia.png'),
      description: CLUB_INFO.description,
      foundingDate: String(CLUB_INFO.foundedYear),
      email: CLUB_INFO.email,
      telephone: CLUB_INFO.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santiago',
        addressCountry: 'CL',
      },
      sameAs: SOCIAL_LINKS.filter((social) => social.platform === 'instagram').map((social) => social.url),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: CLUB_INFO.shortName,
      description: DEFAULT_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  ],
};

