import PornstarListClient from "./PornstarListClient.jsx";

// Server-side metadata for SSR
export function generateMetadata() {
  const title = "Porn Stars - Free HD Videos - XBadWap";
  const description =
    "Watch the hottest pornstars in action with our free collection of top-rated adult videos. Enjoy high-quality streaming of sexy performances from the most popular stars in the industry. New videos added daily!";
  return {
    title,
    description,
    alternates: { canonical: "/pornstar" },
    robots: { index: true, follow: true },
    authors: [{ name: "XBadWap" }],
    creator: "XBadWap",
    publisher: "XBadWap",
    openGraph: { title, description, type: "website", siteName: "XBadWap" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PornstarListPage() {
  return <PornstarListClient />;
}
