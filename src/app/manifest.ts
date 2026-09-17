import type { MetadataRoute } from 'next';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Theia',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F9FF',
    theme_color: '#071426',
    lang: 'es-CL',
    icons: [
      {
        src: '/images/site-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
