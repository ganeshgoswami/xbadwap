import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// URL sitemap for static important pages
export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xbadwap.com";
  const now = new Date().toISOString();

  const urls = [
    { loc: `${BASE_URL}/totalcategorys`, lastmod: now, changefreq: "weekly", priority: 0.7 },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => (
      `  <url>\n` +
      `    <loc>${u.loc}</loc>\n` +
      `    <lastmod>${u.lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`
    )).join("\n") +
    `\n</urlset>`;

  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
