import PlayClient from "./PlayClient.jsx";
// Server-side metadata for SSR
export async function generateMetadata({ params, searchParams }) {
  const rawSlug = params?.slug ?? "";
  const query = decodeURIComponent(rawSlug).replace(/-/g, " ");
  const id = searchParams?.id ? String(searchParams.id) : undefined;
  // Normalize API base same as client: include '/api' exactly once
  const apiBase = (() => {
    const raw = (process.env.NEXT_PUBLIC_API_URL || "").trim();
    if (!raw) return "/api"; // use Next.js rewrites locally
    const hasApiSegment = /\/api(\/?$|\/)/.test(raw);
    if (hasApiSegment) return raw.replace(/\/$/, "");
    return raw.replace(/\/$/, "") + "/api";
  })();
  let first = null;
  try {
    const res = await fetch(`${apiBase}/searchData?query=${encodeURIComponent(query)}&page=1`, { next: { revalidate: 300 } });
    if (res.ok) {
      const json = await res.json();
      const list = (json && json.data) || [];
      if (id) {
        first = list.find((v) => String(v?._id) === id) || list[0] || null;
      } else {
        const slugify = (s = "") => s
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        first = list.find((v) => slugify(v?.Titel || "") === rawSlug) || list[0] || null;
      }
    }
  } catch (_) {}
  const videoTitle = first?.Titel || query || "Play";
  const title = `${videoTitle} - XBadWap`;
  const description = first?.Description || `Watch ${videoTitle} in HD on XBadWap . HD Hole, xx videos, wwwxxx, blue film . XBadWap is the best place to watch free HD videos online.`;
  const model = (first?.Models || "").toString().trim();
  const modelDisplay = model ? model : "pornstar";
  const keywords = [
    `${modelDisplay}`,
    `${modelDisplay} porn`,
    `${modelDisplay} sex videos`,
    `free ${modelDisplay} videos`,
    `hot ${modelDisplay}`,
    `XBadWap`,
    `${modelDisplay} HD Hole`,
    `${modelDisplay} xx videos`,
    `${modelDisplay} wwwxxx`,
    `${modelDisplay} blue film`,
  ];
  const canonical = `/viewplayvideo/${rawSlug}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: { index: true, follow: true },
    authors: [{ name: "XBadWap" }],
    creator: "XBadWap",
    publisher: "XBadWap",
    openGraph: { title, description, type: "video.other", siteName: "XBadWap" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PlayVideoSeprate() {
  return <PlayClient />;
}

