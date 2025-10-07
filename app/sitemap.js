// Next.js App Router sitemap configuration
// Generates a basic sitemap including home, totalcategorys, and pornstar routes.
// To include dynamic categories and pornstar profiles, set NEXT_PUBLIC_SITE_URL
// and extend this file to fetch and append those URLs from your backend.

export default function sitemap() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xbadwap.com";
  const now = new Date();

  const urls = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/totalcategorys`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pornstar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return urls;
}
