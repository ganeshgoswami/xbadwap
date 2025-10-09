import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Build an XML sitemap for all categories
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

  let categories = [];
  try {
    const res = await fetch(`${apiBase}/allCategorys`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      categories = Array.isArray(data?.data) ? data.data : [];
    }
  } catch {}
  // Secondary attempt: hit the public API host directly if configured in rewrites
  if (!categories.length) {
    try {
      const resAlt = await fetch(`https://api.badwap.fun/api/allCategorys`, { cache: "no-store" });
      if (resAlt.ok) {
        const dataAlt = await resAlt.json();
        categories = Array.isArray(dataAlt?.data) ? dataAlt.data : [];
      }
    } catch {}
  }

  // Fallback: derive unique categories from categorysection if allCategorys is empty
  if (!categories.length) {
    try {
      const res2 = await fetch(`${apiBase}/categorysection`, { cache: "no-store" });
      if (res2.ok) {
        const data2 = await res2.json();
        const recs = Array.isArray(data2?.data) ? data2.data : [];
        const set = new Set();
        for (const r of recs) {
          if (r && r.Category) set.add(String(r.Category));
        }
        categories = Array.from(set);
      }
    } catch {}
  }

  // Final fallback: derive from allData (collect unique Category fields)
  if (!categories.length) {
    try {
      const res3 = await fetch(`${apiBase}/allData?page=1&limit=1000`, { cache: "no-store" });
      if (res3.ok) {
        const data3 = await res3.json();
        const items = Array.isArray(data3?.data) ? data3.data : [];
        const set = new Set();
        for (const it of items) {
          if (it && it.Category) set.add(String(it.Category));
        }
        categories = Array.from(set);
      }
    } catch {}
  }

  const now = new Date().toISOString();

  const urls = categories
    .map((c) => slugify(String(c || "")))
    .filter(Boolean)
    .map(
      (slug) => `  <url>\n    <loc>${BASE_URL}/${slug}</loc>\n    <lastmod>${now}</lastmod>\n    <priority>0.80</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${`  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${now}</lastmod>\n    <priority>1.00</priority>\n  </url>`}\n${urls}\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
