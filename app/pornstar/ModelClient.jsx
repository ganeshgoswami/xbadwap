"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AdminContext } from "../providers/AdminContext";

export default function ModelClient() {
  const { model } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    showResultData,
    totalPages,
    currentPage,
    modelSearch,
    handleViewsCount,
    createSlug,
    setCurrentPage,
  } = useContext(AdminContext);

  const lowerCaseModel = decodeURIComponent(model || "").toLowerCase();
  const displayModel = lowerCaseModel.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    if (!model) return;
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
    modelSearch(lowerCaseModel.replace(/-/g, " "), page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, searchParams]);

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= (totalPages || 1)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`/pornstar/${model}?${params.toString()}`);
      await modelSearch(lowerCaseModel.replace(/-/g, " "), newPage);
      setCurrentPage(newPage);
      handleScrollToTop();
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;
    let startPage = Math.max((currentPage || 1) - 2, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages || 1);
    if (endPage - startPage < maxPageButtons - 1) startPage = Math.max(endPage - maxPageButtons + 1, 1);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  const pretty = decodeURIComponent(model || "").replace(/-/g, " ");

  return (
    <>
      <div className="container-fluid my-2" style={{ width: "96%" }}>
        <h1 className="text-dark text-center mt-2 mb-3" style={{ fontFamily: "emoji" }}>
          {displayModel} All sex Videos On XBadWap
        </h1>
        <div className="row d-flex justify-content-center ">
          {(showResultData || []).length > 0 ? (
            showResultData.map((vd, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center p-0" key={vd._id || index}>
                <Link
                  href={`/viewplayvideo/${createSlug(vd.Titel?.toLowerCase())}`}
                  style={{ width: "92%", textDecoration: "none" }}
                  onClick={() => {
                    try { if (typeof window !== 'undefined') sessionStorage.setItem('lastVideoId', String(vd._id)); } catch {}
                    handleViewsCount(vd._id);
                    handleScrollToTop();
                  }}
                >
                  <div className="card shadow-sm bg-body-tertiary rounded position-relative object-fit-none border-dark border-0">
                    <img
                      loading="lazy"
                      src={vd.ImgUrl}
                      alt={vd.Titel}
                      onError={(e) => {
                        const t = e.target;
                        if (!t.dataset.fallback) {
                          t.dataset.fallback = '1';
                          t.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='black'/></svg>";
                        }
                      }}
                      className="rounded w-100 imageSize"
                    />
                    <div className="">
                      <span className="views-overonImg">
                        <i className="bi bi-eye"></i> {vd.Views}
                      </span>
                      <span className="time-overlay">{vd.Duration || "00:00"}</span>
                    </div>
                  </div>
                  <h2 className="text-decoration-none text-center text-dark mt-2 mb-2 item-title">{vd.Titel}</h2>
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

        {/* Pagination */}
        <div className="pagination-controls mt-4">
          <button className="btn text-white button-size bg-dark" onClick={() => handlePageChange((currentPage || 1) - 1)} disabled={(currentPage || 1) === 1}>
            Previous
          </button>
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              className={`btn mx-1 ${page === (currentPage || 1) ? "btn-danger" : "btn-light"} midel-btn-size`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button className="btn text-white button-size bg-dark" onClick={() => handlePageChange((currentPage || 1) + 1)} disabled={(currentPage || 1) === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
