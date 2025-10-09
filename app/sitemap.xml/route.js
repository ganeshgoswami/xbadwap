import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Sitemap index that points to child sitemaps
export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xbadwap.com";
  const now = new Date().toISOString();

  const sitemaps = [
    { loc: `${BASE_URL}/sitemap-categories.xml`, lastmod: now },
    { loc: `${BASE_URL}/sitemap-pornstars.xml`, lastmod: now },
    { loc: `${BASE_URL}/sitemap-static.xml`, lastmod: now },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps
    .map(
      (s) => `  <sitemap>\n    <loc>${s.loc}</loc>\n    <lastmod>${s.lastmod}</lastmod>\n  </sitemap>`
    )
    .join("\n")}\n</sitemapindex>`;

  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
