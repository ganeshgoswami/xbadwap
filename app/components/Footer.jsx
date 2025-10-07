"use client";
import Link from "next/link";
import { useContext } from "react";
import { AdminContext } from "../providers/AdminContext";

export default function Footer() {
  const {
    setCurrentPage,
    setSearchCountry,
    currentPage,
    seprateCategory,
    createSlug,
    searchData,
    setInputValue,
  } = useContext(AdminContext);

  const showAlldata = (cate, page) => {
    seprateCategory(cate, page);
    setSearchCountry(null);
    searchData("", currentPage);
    setInputValue("");
  };

  const handleCategoryClick = (category) => {
    const lowerCategory = category.toLowerCase();
    setCurrentPage(1);
    seprateCategory(lowerCategory, 1);
  };

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer text-dark py-4 bg-dark-subtle mt-auto">
      <div className="container">
        <div className="row text-center d-flex justify-content-around">
          <div className="text-center text-md-start p-2">
            <h3>
              <b className="text-dark fs-3">X</b>BadWap{" "}
              <span className="fw-light f-size-20">
                delivers the best HD adult videos with fast streaming and
                daily updates. Explore trending categories in a safe, smooth
                experience trusted by millions. Your one-stop destination for
                nonstop fun, fresh content, and total satisfaction — only on
                XBadWap.
              </span>
            </h3>
          </div>

          <div className="d-flex justify-content-around p-1 flex-wrap gap-4">
            <div>
              <h6>TOP PORN VIDEOS</h6>
              <div className="d-flex justify-content-center f-size-12">
                <ul className="list-unstyled footer-links mb-2">
                  <li className="mb-2">
                    <Link
                      className="d-flex align-items-center text-decoration-none text-dark"
                      href={`/${createSlug("xmilfnut")}`}
                      onClick={() => {
                        showAlldata("Xmilfnut", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("xmilfnut");
                      }}
                    >
                      <i className="bi bi-asterisk me-2 fs-6"></i>
                      Xmilfnut
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("hd porn")}`}
                      onClick={() => {
                        showAlldata("Hd Porn", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("hd porn");
                      }}
                    >
                      <i className="bi bi-badge-4k me-2 fs-6"></i>
                      Hd Porn
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("love sex")}`}
                      onClick={() => {
                        showAlldata("Love Sex", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("love sex");
                      }}
                    >
                      <i className="bi bi-heart-half me-2 fs-6"></i>
                      Love Sex
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("hot mom")}`}
                      onClick={() => {
                        showAlldata("Hot Mom", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("hot mom");
                      }}
                    >
                      <i className="bi bi-xbox me-2 fs-6"></i>
                      Hot Mom
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h6>FUN SEX VIDEOS</h6>
              <div className="d-flex justify-content-center f-size-12">
                <ul className="footer-links list-unstyled">
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("amateur")}`}
                      onClick={() => {
                        showAlldata("Amateur", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("amateur");
                      }}
                    >
                      <i className="bi bi-tsunami me-2 fs-6"></i>
                      Amateur
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("anal")}`}
                      onClick={() => {
                        showAlldata("Anal", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("anal");
                      }}
                    >
                      <i className="bi bi-headset-vr me-2 fs-6"></i>
                      Anal
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("big buddy")}`}
                      onClick={() => {
                        showAlldata("Big Buddy", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("big buddy");
                      }}
                    >
                      <i className="bi bi-cone me-2 fs-6"></i>
                      Big Buddy
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("daddy")}`}
                      onClick={() => {
                        showAlldata("Daddy", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("daddy");
                      }}
                    >
                      <i className="bi bi-binoculars me-2 fs-6"></i>
                      Daddy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h6>TOP PERFECT GIRL</h6>
              <div className="d-flex justify-content-center f-size-12">
                <ul className="footer-links list-unstyled">
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("sister")}`}
                      onClick={() => {
                        showAlldata("Sister", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("sister");
                      }}
                    >
                      <i className="bi bi-hypnotize me-2 fs-6"></i>
                      Sister
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("pussy")}`}
                      onClick={() => {
                        showAlldata("Pussy", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("pussy");
                      }}
                    >
                      <i className="bi bi-emoji-smile me-2 fs-6"></i>
                      Pussy
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("hard fuck")}`}
                      onClick={() => {
                        showAlldata("Hard Fuck", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("hard fuck");
                      }}
                    >
                      <i className="bi bi-star me-2 fs-6"></i>
                      Hard Fuck
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-dark d-flex align-items-center text-decoration-none"
                      href={`/${createSlug("big boobs")}`}
                      onClick={() => {
                        showAlldata("Big Boobs", currentPage);
                        handleScrollToTop();
                        handleCategoryClick("big boobs");
                      }}
                    >
                      <i className="bi bi-emoji-laughing me-2 fs-6"></i>
                      Big Boobs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </footer>
  );
}
