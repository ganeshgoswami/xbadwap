import HomeClient from "./HomeClient.jsx";

// Server-side metadata so extensions (and crawlers) see title/description in initial HTML
export function generateMetadata({ searchParams }) {
  const siteName = "XBadWap";
  const q = (searchParams?.Search || "").toString().trim();
  const page = Number(searchParams?.page || 1);
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";
  const title = q
    ? `Search results for "${q}"${pageSuffix} | ${siteName}`
    : `free sex videos and xx x porn clips | ${siteName}${pageSuffix}`;
  const description = q
    ? `Explore search results for "${q}" with HD porn videos on ${siteName}. Fresh XXX content, fast streaming, and daily updates.`
    : `anal 69 xx x movies xhumester xmilfnut bf cowgirl full hd bf hd video bfxxx xx xx x xxxhd uncut desi borwap com x xx xx x position| XBadWap.com`;
  const keywords = [
    "free sex",
    "latest adult videos",
    "free hd porn",
    "mating press",
    "sex videos",
  ];

  // Build canonical path (relative). For search pages, avoid canonicalizing the query; set noindex.
  const canonicalPath = q
    ? "/" // do not canonicalize search to avoid duplicate content
    : page > 1
      ? `/?page=${page}`
      : "/";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalPath },
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: q
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return <HomeClient />;
}

