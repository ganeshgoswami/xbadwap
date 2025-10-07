"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { AdminContext } from "../../providers/AdminContext";
import "./play.css";

export default function PlayClient() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const idFromQuery = searchParams?.get("id") || "";
  const {
    handleViewsCount,
    showResultData,
    viewBigVideo, // Video Data
    getbigVideo,  // get Video Function
    createSlug,
    getreletedData,
    currentPage,
  } = useContext(AdminContext);

  const [frameLoaded, setFrameLoaded] = useState(false);

  // API base (proxied by rewrites unless NEXT_PUBLIC_API_URL is set)
  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "/api", []);

  // Helper: convert durations to minutes integer
  const getMinutes = (duration) => {
    if (!duration || typeof duration !== "string") return 0;
    const trimmed = duration.trim();
    const numMatch = trimmed.match(/^(\d+)\s*min/i);
    if (numMatch) return parseInt(numMatch[1], 10) || 0;
    const parts = trimmed.split(":").map((p) => parseInt(p, 10));
    if (parts.every((n) => !isNaN(n))) {
      if (parts.length === 3) {
        const [hh, mm] = parts;
        return (hh || 0) * 60 + (mm || 0);
      }
      if (parts.length === 2) {
        const [mm] = parts;
        return mm || 0;
      }
    }
    const anyNum = trimmed.match(/(\d+)/);
    return anyNum ? parseInt(anyNum[1], 10) || 0 : 0;
  };

  // Load video: prefer direct id from query, otherwise resolve slug via search
  useEffect(() => {
    const resolveAndFetch = async () => {
      try {
        if (idFromQuery) {
          await getbigVideo(idFromQuery);
        } else {
          const query = (slug || "").toString().replace(/-/g, " ");
          const res = await fetch(`${apiBase}/searchData?query=${encodeURIComponent(query)}&page=1`);
          const json = await res.json();
          const first = (json && json.data && json.data[0]) || null;
          if (first && first._id) {
            await getbigVideo(first._id);
          }
        }
      } catch (_) {
        // ignore
      } finally {
        setFrameLoaded(false);
      }
    };
    resolveAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, idFromQuery]);

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container-fluid my-4 text-center">
        {viewBigVideo ? (
          <>
            {viewBigVideo.EmbedVideo ? (
              <div>
                <div className="embed-video-container mb-4">
                  {!frameLoaded && (
                    <div className="iframe-skeleton">
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={viewBigVideo.EmbedVideo}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    title={viewBigVideo.Titel}
                    onLoad={() => setFrameLoaded(true)}
                    style={{ borderRadius: "8px", visibility: frameLoaded ? "visible" : "hidden" }}
                  ></iframe>
                </div>

                <div className="m-3">
                  <h1 className="text-dark">{viewBigVideo.Titel}</h1>
                </div>

                <div>
                  <span className="m-2">
                    <i className="bi bi-eye m-1 text-primary"></i>
                    <span className="text-secondary">{viewBigVideo.Views} views</span>
                  </span>
                  <span className="m-2">
                    <i className="bi bi-clock m-1 text-warning"></i>
                    <span className="text-secondary">{getMinutes(viewBigVideo.Duration)} min</span>
                  </span>
                </div>
                <hr className="text-dark" />
                {viewBigVideo?.Models && (
                  <div>
                    <h5>
                      <i className="bi bi-star-fill text-danger"></i> <b className="text-dark">Pornstars</b>
                    </h5>
                    <Link href={`/pornstar/${createSlug(viewBigVideo.Models.toLowerCase())}`} className="badge rounded-pill p-3 text-decoration-none text-bg-danger">
                      <i className="bi bi-gender-female"></i> {viewBigVideo.Models.toLowerCase()}
                    </Link>
                  </div>
                )}
                <hr className="text-dark" />
              </div>
            ) : (
              <Link href={viewBigVideo.Videourl} className="text-decoration-none">
                <div className="image-container">
                  <img
                    loading="lazy"
                    src={viewBigVideo.ImgUrl}
                    alt={viewBigVideo.Titel}
                    onError={(e) => {
                      const img = e.target;
                      if (!img.dataset.fallback) {
                        img.dataset.fallback = "1";
                        img.alt = "";
                        img.src =
                          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='black'/></svg>";
                        img.style.objectFit = "cover";
                        img.style.backgroundColor = "black";
                      }
                    }}
                    className="image"
                  />
                  <div className="play-icon">
                    <i className="bi bi-play text-white"></i>
                  </div>
                </div>
                <div className="m-3">
                  <h1 className="text-dark fs-4">{viewBigVideo.Titel}</h1>
                </div>
                <div>
                  <span className="m-2">
                    <i className="bi bi-eye m-1 text-primary"></i>
                    <span className="text-secondary">{viewBigVideo.Views} views</span>
                  </span>
                  <span className="m-2">
                    <i className="bi bi-clock m-1 text-warning"></i>
                    <span className="text-secondary">{getMinutes(viewBigVideo.Duration)} min</span>
                  </span>
                </div>
                <hr className="text-dark" />
                {viewBigVideo?.Models && (
                  <div>
                    <h5>
                      <i className="bi bi-star-fill text-danger"></i> <b className="text-dark">Pornstars</b>
                    </h5>
                    <Link href={`/pornstar/${createSlug(viewBigVideo.Models.toLowerCase())}`} className="badge rounded-pill p-3 text-decoration-none text-bg-danger">
                      <i className="bi bi-gender-female"></i> {viewBigVideo.Models.toLowerCase()}
                    </Link>
                  </div>
                )}
                <hr className="text-dark" />
              </Link>
            )}

            <div className="row justify-content-center g-3">
              <h2 className="text-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                <u>Releted Videos</u>
              </h2>
              {showResultData.length > 0 ? (
                showResultData.map((vd, index) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center"
                    key={index}
                  >
                    <Link
                      href={{ pathname: `/viewplayvideo/${createSlug(vd.Titel?.toLowerCase())}`, query: { id: vd._id } }}
                      style={{ width: "92%", textDecoration: "none" }}
                      onClick={() => {
                        handleViewsCount(vd._id);
                        handleScrollToTop();
                      }}
                    >
                      <div className="card shadow-sm bg-body-tertiary rounded position-relative object-fit-none border-0">
                        <img
                          loading="lazy"
                          src={vd.ImgUrl}
                          alt={vd.Titel}
                          onError={(e) => {
                            const img = e.target;
                            if (!img.dataset.fallback) {
                              img.dataset.fallback = "1";
                              img.alt = "";
                              img.src =
                                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='black'/></svg>";
                              img.style.objectFit = "cover";
                              img.style.backgroundColor = "black";
                            }
                          }}
                          className="rounded w-100 imageSize"
                        />
                        <span className="views-overonImg">
                          <i className="bi bi-eye"></i> {vd.Views}
                        </span>
                        <span className="time-overlay">{getMinutes(vd.Duration)} min</span>
                      </div>
                      <h2 className="text-decoration-none text-center text-dark mt-2 item-title">{vd.Titel}</h2>
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
          </>
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
