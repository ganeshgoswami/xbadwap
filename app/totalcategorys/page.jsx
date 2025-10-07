import TotalCategoriesClient from "./TotalCategoriesClient.jsx";

// Server-side metadata for SSR
export function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";
  const title = `XBadWap Free Sexy Picture Or Adult Videos And Free Porn Videos${pageSuffix}`;
  const description =
    "short video xx x hqpornee freeomovie 3gp king 69 adelt movies auntymaza badwap com xmilfnut bf full hd bf hd video bfxxx bigfucktv xxxhd spanbank borwap com x xx xx x position| XBadWap";
  const keywords = [
    "free sex",
    "best adult videos",
    "HD porn",
    "hot pussy",
    "sex videos",
  ];
  const canonical = page > 1 ? `/totalcategorys?page=${page}` : "/totalcategorys";
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

export default function TotalCategoriesPage() {
  return <TotalCategoriesClient />;
}
