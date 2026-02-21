/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Enable static export for Cloudflare Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Disable server-side features
  distDir: 'out',
  
  // Trailing slash for better routing
  trailingSlash: true,
  
  // Enable compression
  compress: true,
  
  // Strict mode
  reactStrictMode: true,
  
  // SWC minification
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    NEXT_PUBLIC_TMDB_BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    NEXT_PUBLIC_TMDB_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  },
}

module.exports = nextConfig
