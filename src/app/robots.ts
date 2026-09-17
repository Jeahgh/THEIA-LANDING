import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/uploads/'],
      disallow: [
        '/admin/',
        '/perfil',
        '/api/admin/',
        '/api/auth/',
        '/api/contact',
        '/api/profile/',
        '/api/session/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

