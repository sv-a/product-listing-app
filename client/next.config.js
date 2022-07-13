/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'fakestoreapi.com',
      isDev ? 'http://localhost:8000' : 'https://product-listing-app-test.herokuapp.com',
    ],
  },
}

module.exports = nextConfig
