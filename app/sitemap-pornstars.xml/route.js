import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Build an XML sitemap for all pornstars
export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xbadwap.com";
  // Normalize API base like the rest of the app
  const apiBase = (() => {
    const raw = (process.env.NEXT_PUBLIC_API_URL || "").trim();
    if (!raw) return "/api"; // use Next.js rewrites
    const hasApiSegment = /\/api(\/?$|\/)/.test(raw);
    if (hasApiSegment) return raw.replace(/\/$/, "");
    return raw.replace(/\/$/, "") + "/api";
  })();

  const slugify = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  let names = [];
  // Primary: distinct names from StoreData
  try {
    const res = await fetch(`${apiBase}/allPornstarName`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      names = Array.isArray(data?.data) ? data.data : [];
    }
  } catch {}
  // Secondary: hit the public API host directly
  if (!names.length) {
    try {
      const resAlt = await fetch(`https://api.badwap.fun/api/allPornstarName`, { cache: "no-store" });
      if (resAlt.ok) {
        const dataAlt = await resAlt.json();
        names = Array.isArray(dataAlt?.data) ? dataAlt.data : [];
      }
    } catch {}
  }
  // Fallback: use paginated /pornstars and collect Name fields
  if (!names.length) {
    try {
      const res2 = await fetch(`${apiBase}/pornstars?limit=1000&page=1`, { cache: "no-store" });
      if (res2.ok) {
        const data2 = await res2.json();
        const items = Array.isArray(data2?.data) ? data2.data : [];
        names = items.map((it) => it?.Name).filter(Boolean);
      }
    } catch {}
  }
  // Final fallback: derive names from allData's Models
  if (!names.length) {
    try {
      const res3 = await fetch(`${apiBase}/allData?page=1&limit=1000`, { cache: "no-store" });
      if (res3.ok) {
        const data3 = await res3.json();
        const items = Array.isArray(data3?.data) ? data3.data : [];
        const set = new Set();
        for (const it of items) if (it && it.Models) set.add(String(it.Models));
        names = Array.from(set);
      }
    } catch {}
  }

  const now = new Date().toISOString();

  const indexUrl = `  <url>\n    <loc>${BASE_URL}/pornstar</loc>\n    <lastmod>${now}</lastmod>\n    <priority>0.90</priority>\n  </url>`;

  const urls = names
    .map((n) => slugify(String(n || "")))
    .filter(Boolean)
    .map(
      (slug) => `  <url>\n    <loc>${BASE_URL}/pornstar/${slug}</loc>\n    <lastmod>${now}</lastmod>\n    <priority>0.80</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">\n${indexUrl}\n${urls}\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
