import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
