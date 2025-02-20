import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Add any other domains you're loading images from
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ""
      },
    ],
  }
};

export default nextConfig;
