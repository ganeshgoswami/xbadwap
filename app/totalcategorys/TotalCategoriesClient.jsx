"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { AdminContext } from "../providers/AdminContext";

export default function TotalCategoriesClient() {
  const { categoryVideo, categorySection, createSlug } = useContext(AdminContext);

  useEffect(() => {
    if (!categoryVideo?.length) categorySection?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toTitleCase = (str = "") =>
    String(str)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="container-fluid my-2" style={{ width: "96%" }}>
      <div className="row">
        <div className="col-12">
          <h1 className="text-dark text-center mt-2 mb-3" style={{ fontFamily: "emoji" }}>
            Hard Fucking category
          </h1>
        </div>
      </div>
      <div className="row justify-content-center m-1 g-2">
        {(categoryVideo || []).length > 0 ? (
          categoryVideo.map((n, index) => (
            <div className="col-md-3" key={index}>
              <Link href={`/${createSlug(n.Category)}`} className="text-decoration-none">
                <div className="card shadow-sm bg-body-tertiary rounded object-fit-none border-0">
                  <img
                    loading="lazy"
                    src={n.ImgUrl}
                    alt={n.Titel}
                    className="rounded w-100 categoryimagesize"
                  />
                </div>
                <h2 className="text-decoration-none text-center text-dark mt-2 item-title">
                  {toTitleCase(n.Category)}
                </h2>
              </Link>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
