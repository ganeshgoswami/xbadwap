import ModelClient from "../ModelClient.jsx";

export function generateMetadata({ params, searchParams }) {
  const raw = params?.model ?? "model";
  const model = decodeURIComponent(raw).replace(/-/g, " ");
  const page = Number(searchParams?.page || 1);
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";
  const title = `${model} porn videos and HD Sex Videos${pageSuffix}`;
  const description = `Watch the hottest ${model} in action with our free collection of top-rated adult videos. Enjoy high-quality streaming of sexy performances from ${model} and other popular stars in the industry. Latest videos added daily!`;
  const keywords = [
    `${model} sex clip`,
    `doggy style ${model}`,
    `${model} porn video`,
    `hot and sexy ${model}`,
  ];
  const canonical = page > 1 ? `/pornstar/${raw}?page=${page}` : `/pornstar/${raw}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    authors: [{ name: "XBadWap" }],
    creator: "XBadWap",
    publisher: "XBadWap",
    robots: { index: true, follow: true },
    openGraph: { title, description, type: "website", siteName: "XBadWap" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PornstarModelPage() {
  return <ModelClient />;
}

