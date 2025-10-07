import CategoryClient from "./CategoryClient.jsx";

// Server-side metadata for SSR
export function generateMetadata({ params, searchParams }) {
  const raw = params?.category ?? "Category";
  const category = decodeURIComponent(raw).replace(/-/g, " ");
  const page = Number(searchParams?.page || 1);
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";
  const title = `Best ${category} Sex Videos Free on XBadWap.com${pageSuffix}`;
  const description = `Now free ${category} porn videos in HD quality. Best ${category} sex videos with top performers. free free unlimited ${category} content on XBadWap.com`;
  const keywords = [
    `${category}`,
    `${category} porn`,
    `${category} sex videos`,
    `free ${category} videos`,
    `HD ${category}`,
    `XBadWap ${category} sex`,
  ];
  const canonical = page > 1 ? `/${raw}?page=${page}` : `/${raw}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: { index: true, follow: true },
    authors: [{ name: "XBadWap" }],
    creator: "XBadWap",
    publisher: "XBadWap",
    openGraph: { title, description, type: "website", siteName: "XBadWap" },
    twitter: { card: "summary", title, description },
  };
}

export default function SeparateCategoryPage() {
  return <CategoryClient />;
}

