import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/images/theia-hero-collage.jpeg',
        destination: '/images/theia-hero-collage.webp',
        permanent: true,
      },
      {
        source: '/images/equipo-noticias.jpg',
        destination: '/images/equipo-noticias.webp',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Conserva las URLs guardadas antes de usar /api/uploads. Tambien evita
        // que Next intente tratarlas como archivos estaticos en un despliegue
        // donde Apache tenga un public_html distinto al artefacto standalone.
        {
          source: '/uploads/:folder/:fileName',
          destination: '/api/uploads/:folder/:fileName',
        },
      ],
    };
  },
  images: {
    minimumCacheTTL: 86400,
    qualities: [75, 90],
    localPatterns: [
      // Los assets locales normales no aceptan query strings. Los avatares
      // administrados usan ?v= para invalidar la vista al reemplazar el archivo.
      { pathname: '/**', search: '' },
      { pathname: '/api/uploads/profiles/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
