/** @type {import('next').NextConfig} */
import path from 'path';
import dotenv from 'dotenv';


const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const { parsed: localEnv } = dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    // Enable static images in the public directory
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost'],
    path: '/_next/image',
    loader: 'default',
  },
  env: {
    NEXT_PUBLIC_API_URL: localEnv.NEXT_PUBLIC_API_URL,
    // Add other variables from .env file as needed
  },
};


export default nextConfig;
