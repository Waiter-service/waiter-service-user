import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["digital-waiter-service.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
