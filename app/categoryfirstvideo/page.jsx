"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { AdminContext } from "../providers/AdminContext";

export const dynamic = 'force-dynamic';

export default function CategoryFirstVideoPage() {
  const { categoriesFirstData, allCategoriesFirstData, createSlug, handleViewsCount } = useContext(AdminContext);

  useEffect(() => {
    if (!categoriesFirstData?.length) allCategoriesFirstData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Category First Videos - XBadWap</title>
        <meta name="description" content="Browse first videos per category on XBadWap" />
      </Head>

      <div className="container my-3" style={{ width: "96%" }}>
        <h2 className="mb-3">Category First Videos</h2>
        <div className="row g-3">
          {(categoriesFirstData || []).map((vd, idx) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center" key={vd._id || idx}>
              <Link
                href={{ pathname: `/viewplayvideo/${createSlug(vd.Titel?.toLowerCase())}`, query: { id: vd._id } }}
                className="text-decoration-none w-100"
                onClick={() => handleViewsCount?.(vd._id)}
              >
                <div className="card shadow-sm bg-body-tertiary rounded position-relative object-fit-none border-0">
                  <img loading="lazy" src={vd.ImgUrl} alt={vd.Titel} className="rounded w-100 imageSize" />
                  <span className="views-overonImg"><i className="bi bi-eye"></i> {vd.Views}</span>
                  <span className="time-overlay">{vd.Duration || "00:00"}</span>
                </div>
                <h2 className="text-center text-dark mt-2 item-title">{vd.Titel}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
