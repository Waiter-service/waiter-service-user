import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["digital-waiter-service.s3.eu-north-1.amazonaws.com"],
  },
  webpack(config: {
    module: { rules: { test: RegExp; use: string[] }[] };
    resolve: { fallback: Record<string, boolean> };
  }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};

export default nextConfig;
