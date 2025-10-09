"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AuthAdminProvider, { AdminContext } from "./providers/AdminContext";


export default function HomeClient() {
  const {
    alldata,
    getalldata,
    handleViewsCount,
    categorys,
    totalPages,
    currentPage,
    createSlug,
    searchData,
    inputValue,
    setCurrentPage,
    seprateCategory,
    pornstarName,
  } = useContext(AdminContext);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [isSearchPage, setIsSearchPage] = useState(false);
  const siteName = "XBadWap";

  useEffect(() => {
    try {
      const origin = window.location.origin;
      const urlSearch = new URLSearchParams(searchParams.toString());
      const hasSearch = urlSearch.has("Search") && (urlSearch.get("Search") || "").trim() !== "";
      setIsSearchPage(!!hasSearch);

      let canonical = origin + pathname;
      if (!hasSearch) {
        if (currentPage && Number(currentPage) > 1) {
          const cParams = new URLSearchParams();
          cParams.set("page", String(currentPage));
          canonical = `${origin}${pathname}?${cParams.toString()}`;
        }
      }
      setCanonicalUrl(canonical);
    } catch {}
  }, [pathname, searchParams, currentPage]);

  const buildPageUrl = (page) => {
    try {
      const origin = window.location.origin;
      const params = new URLSearchParams();
      params.set("page", String(page));
      return `${origin}${pathname}?${params.toString()}`;
    } catch {
      return "";
    }
  };

  const buildTitle = () => {
    const urlSearch = new URLSearchParams(searchParams.toString());
    const q = (urlSearch.get("Search") || "").trim();
    const pageSuffix = currentPage && currentPage > 1 ? ` - Page ${currentPage}` : "";
    if (q) return `Search results for "${q}"${pageSuffix} | ${siteName}`;
    return `Free Sex Videos - XXX Porn Videos | ${siteName}${pageSuffix}`;
  };

  const buildDescription = () => {
    const urlSearch = new URLSearchParams(searchParams.toString());
    const q = (urlSearch.get("Search") || "").trim();
    const pageText = currentPage && currentPage > 1 ? ` Page ${currentPage}.` : "";
    if (q)
      return `Explore search results for "${q}" with HD porn videos on ${siteName}. Fresh XXX content, fast streaming, and daily updates.${pageText}`;
    return `Watch free HD porn videos on ${siteName}. Fresh XXX content with top stars and amateurs, updated daily. Stream fast across popular categories and trending pornstars.${pageText}`;
  };

  useEffect(() => {
    getalldata(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const isSmall = typeof window !== 'undefined' ? window.innerWidth <= 576 : false;
    const maxPageButtons = isSmall ? 3 : 4;
    let startPage = Math.max((currentPage || 1) - 2, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages || 1);
    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (totalPages || 1)) {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue) {
        searchData(inputValue, newPage);
        params.set("Search", inputValue);
        params.set("page", String(newPage));
      } else {
        getalldata(newPage);
        params.set("page", String(newPage));
      }
      router.push(`?${params.toString()}`);
    }
  };

  const handleCategoryClick = (category) => {
    const lowerCategory = category.toLowerCase();
    setCurrentPage(1);
    seprateCategory(lowerCategory, 1);
  };

  return (
    <>
      <div className="container-fluid my-2" style={{ width: "96%" }}>
        <div className="row">
          <div className="col-12">
            <h1 className="text-dark text-center mt-2 mb-3" style={{ fontFamily: "emoji" }}>
              Free Porn Videos – XBadWap
            </h1>
          </div>
        </div>

        <div className="row d-flex justify-content-center ">
          {alldata.length > 0 ? (
            alldata.map((vd, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center p-0" key={index}>
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

        <hr />

        <div className="text-dark d-flex justify-content-center mt-3">
          <h2 style={{ fontFamily: "emoji" }}>
            <b>Best Porn Categories </b>{" "}
          </h2>
        </div>
        <hr className="text-dark" />
        <div className="d-flex m-1 d-flex flex-wrap justify-content-center">
          {categorys.slice(0).map((category, index) => (
            <Link
              href={`/${createSlug(category.toLowerCase())}`}
              className="text-decoration-none"
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="badge text-bg-secondary d-flex align-items-center m-1 badge-size rounded-pill">{category}</span>
            </Link>
          ))}
        </div>

        <hr />
        <div className="text-dark d-flex justify-content-center mt-3">
          <h2 style={{ fontFamily: "emoji" }}>
            <b>Hottest And Sexy Pornstars </b>{" "}
          </h2>
        </div>
        <hr className="text-dark" />

        <div className="d-flex m-1 d-flex flex-wrap justify-content-center">
          {pornstarName.slice(0).map((pname, index) => (
            <Link
              href={`/pornstar/${createSlug(pname.toLowerCase())}`}
              className="text-decoration-none"
              key={index}
              onClick={() => {
                handleScrollToTop();
              }}
            >
              <span className="badge text-bg-secondary d-flex align-items-center m-1 badge-size rounded-pill">{pname}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
