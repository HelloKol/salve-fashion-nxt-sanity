/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'source.unsplash.com',
      'cdn.shopify.com',
      'scontent-iad3-2.cdninstagram.com',
      'scontent-iad3-1.cdninstagram.com'
    ]
  }
};

module.exports = nextConfig;
