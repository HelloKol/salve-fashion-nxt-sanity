/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  // Redirects
  async redirects() {
    return [
      {
        source: '/account',
        destination: '/account/profile',
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
