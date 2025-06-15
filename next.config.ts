import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
    ],
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
