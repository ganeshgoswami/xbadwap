/**** Next.js config: proxies API to backend ****/
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'https://api.badwap.fun/api/:path*' },
      { source: '/api/v1/:path*', destination: 'https://api.badwap.fun/api/v1/:path*' },
    ];
  },
};

module.exports = nextConfig;
