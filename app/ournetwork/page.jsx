"use client";
import Head from "next/head";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function OurNetworkPage() {
  return (
    <>
      <Head>
        <title>Our Network - XBadWap</title>
        <meta name="description" content="Explore the XBadWap network and partner sites." />
      </Head>

      <div className="container my-4">
        <h1 className="mb-3">Our Network</h1>
        <p className="text-muted">This is a placeholder page. Add your partner links or network description here.</p>
        <ul>
          <li><a href="#" className="link-primary">Partner Site 1</a></li>
          <li><a href="#" className="link-primary">Partner Site 2</a></li>
          <li><a href="#" className="link-primary">Partner Site 3</a></li>
        </ul>
      </div>
    </>
  );
}
