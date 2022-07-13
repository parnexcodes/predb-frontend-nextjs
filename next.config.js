/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cable.ayra.ch'],
  },
}

module.exports = nextConfig
