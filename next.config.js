/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Suppress eslint errors on build if needed, but we keep it clean.
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
