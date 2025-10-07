"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { AdminContext } from "../providers/AdminContext";

export default function PornstarListClient() {
  const { getPornStars, pornStars, pornStarsLoading, pornStarsError, createSlug } = useContext(AdminContext);

  useEffect(() => {
    if (!pornStars || pornStars.length === 0) {
      getPornStars?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pornStars?.length]);

  return (
    <>
      <div className="container-fluid my-2" style={{ width: "96%" }}>
        <div className="row">
          <div className="col-12">
            <h1 className="text-dark text-center mt-2 mb-3" style={{ fontFamily: "emoji" }}>
              Adult Pornstars or xx x Pornstar and hot 🌶️ Pornstars Videos
            </h1>
          </div>
        </div>
        <div className="row justify-content-center m-1 g-2">
          {pornStarsLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : pornStarsError ? (
            <div className="alert alert-danger" role="alert">{pornStarsError}</div>
          ) : (pornStars || []).length > 0 ? (
            pornStars.map((vd, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center p-0"
                key={vd._id || index}
              >
                <Link
                  href={`/pornstar/${createSlug((vd.Name || "").toLowerCase())}`}
                  style={{ width: "92%", textDecoration: "none" }}
                >
                  <div className="card shadow-sm bg-body-tertiary rounded position-relative object-fit-none border-0">
                    <img
                      loading="lazy"
                      src={vd.PImage}
                      alt={vd.Name}
                      onError={(e) => {
                        const img = e.target;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = '1';
                          img.alt = '';
                          img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='black'/></svg>";
                          img.style.objectFit = 'cover';
                          img.style.backgroundColor = 'black';
                        }
                      }}
                      className="rounded w-100 object-fit-cover img-responsive"
                    />
                  </div>
                  <p className="text-dark">
                    {vd.Name} {vd.Gender ? <span className="text-info">({vd.Gender})</span> : ""}
                  </p>
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
    </>
  );
}
