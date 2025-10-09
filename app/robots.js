// Next.js App Router robots configuration
// Ensures INDEX, FOLLOW for pornstar and category pages
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pornstar',
          '/pornstar/*',
          '/totalcategorys',
        ],
        disallow: [
          '/admin',
          '/admin/*',
        ],
      },
    ],
    sitemap: 'https://xbadwap.com/sitemap.xml',
  };
}
