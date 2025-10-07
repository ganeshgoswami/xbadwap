"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminContext } from "../providers/AdminContext";
import "./userNavbar.css";

export default function UserNavbar() {
  const router = useRouter();
  const params = useParams();

  const {
    modelSearch,
    setCurrentPage,
    setSearchCountry,
    categorys,
    currentPage,
    seprateCategory,
    createSlug,
    searchData,
    inputValue,
    setInputValue,
  } = useContext(AdminContext);

  const [visibleItems, setVisibleItems] = useState(6);

  const pornStar = [
    { name: "Dillion Harper", pImage: "https://zazzybabes.com/girls/dillion-harper/dillion-harper-pornstar-4214.jpg" },
    { name: "Dani Daniels", pImage: "https://www.babepedia.com/galleries/Twisty-DaniDanielsStrippingSexyPinkLingerie/01.jpg" },
    { name: "Angelica Heaven", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyiFxgZOb3GsauAARoDbSUnB1oW7WQH7mhQ&s" },
    { name: "Alecia Fox", pImage: "https://www.babepedia.com/user-uploads/Alecia%20Fox8.jpg" },
    { name: "Hailey Rose", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfcy44EqQ3N13ZYzRHIvjwUasL_uMbbDDzDQ&s" },
    { name: "Kathryn Mae", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoZUJPB0DYG3m6WCq9WnLoohBng66mwccJwA&s" },
    { name: "Mia Khalifa", pImage: "https://imgs1cdn.adultempire.com/actors/665051h.jpg" },
    { name: "Nicole Aniston", pImage: "https://xxxbios.com/wp-content/uploads/2017/07/1-6-e1558025812617.jpg" },
    { name: "Juniper Ren", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0calPqKni2-IhSzS5IdnBlNP4I_0gTYuoHA&s" },
    { name: "Valentina Nappi", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZs8xrW7flGthGIvCgoAPIjRpo2cwO121Zyg&s" },
    { name: "Amarna Miller", pImage: "https://www.babepedia.com/pics/Amarna%20Miller4.jpg" },
    { name: "Karla Kush", pImage: "https://img2.badoink.com/content/casts/48123/karla-kush-48123.jpg?q=80&w=720" },
    { name: "Samantha Sin", pImage: "https://images.pornmaki.com/actress_img/model3941.jpg" },
    { name: "Freya Dee", pImage: "https://s1.milffox.com/p/1/19/33388/pic4.jpg" },
    { name: "Janice Griffith", pImage: "https://zazzybabes.com/girls/janice-griffith/janice-griffith-babe-77716.jpg" },
    { name: "Adriana Chechik", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDXYnnx_ujvhqWW2t0f7hs6RdCrW8wopDqA&s" },
    { name: "Sonya Blaze", pImage: "https://www.babepedia.com/user-uploads/Sonya%20Blaze12.jpg" },
    { name: "Alyx Star", pImage: "https://www.babepedia.com/pics/Alyx%20Star.jpg" },
    { name: "Angela White", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5wHVuCUHYT8ddxrJW4hFYPnN2Si1jjDW8Tg&s" },
    { name: "Cory Chase", pImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1gjLbuAOEkp4M73yDl0G5xGzdVRtbrX2ug&s" },
    { name: "Elsa Jean", pImage: "https://s1.milffox.com/p/1/25/43940/pic1.jpg" },
  ];

  const model = params?.model;
  useEffect(() => {
    if (model) modelSearch(model, currentPage || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = (inputValue || "").trim();
    setCurrentPage(1);
    if (q) {
      searchData(q, 1);
      router.push(`/?Search=${encodeURIComponent(q)}&page=1`);
    } else {
      router.push(`/`);
    }
  };

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
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-dark-subtle">
        <div className="container-xxl p-2 position-relative">
          <div className="col-2 d-flex align-items-center">
            <i
              className="bi bi-list navbar-toggler d-lg-none"
              aria-expanded="false"
              aria-label="Toggle navigation"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
              style={{ fontSize: '1.5rem' }}
            ></i>
            <div className="ms-2 d-flex align-middle">
              <Link href="/" className="nav-link text-dark fw-bold" onClick={() => showAlldata()}>
                <span className="brandText">XBadWap</span>
              </Link>
            </div>
          </div>

          <div className="searchBarHide col-8">
            <form className="input-group" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control p-2 border-1"
                placeholder={"Search Videos ..."}
                aria-label="Search Videos"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className="input-group-text bg-white border-0">
                <i type="submit" className="bi bi-search" onClick={handleSearch}></i>
              </span>
            </form>
          </div>

          <div className="col-2 m-10 text-white"></div>
        </div>

        {/* Mobile search */}
        <form className="input-group downShowSearchBar m-2" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder={"Search  Videos ..."}
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span className="input-group-text bg-white border-0">
            <i type="submit" className="bi bi-search" onClick={handleSearch}></i>
          </span>
        </form>
      </nav>
      {/* Navbar Finish */}

      {/* side navbar start */}
      <div
        className="offcanvas offcanvas-start bg-dark-subtle"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header container">
          <div className="col-2">
            <i className="bi bi-x-lg text-dark" data-bs-dismiss="offcanvas" aria-label="Close"></i>
          </div>
          <div className="col-8 d-flex justify-content-center">
            <div className="ms-1" data-bs-dismiss="offcanvas" aria-label="Close">
              <Link className="nav-link text-dark me-3 fw-bold" href="/" onClick={() => showAlldata()}>
                <h3 className="text-dark m-2">XBadWap</h3>
              </Link>
            </div>
          </div>
          <div className="col-2"></div>
        </div>

        <div className="offcanvas-body bg-secondary-subtle">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <i className="bi bi-camera-reels text-dark me-2"></i> Videos
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul style={{ listStyle: "None" }}>
                    <li className="dropdown-item " aria-label="Close" data-bs-dismiss="offcanvas">
                      <Link className="text-decoration-none text-black" href={`/${createSlug("Popular Video".toLowerCase())}`} onClick={() => { showAlldata("Popular Video", currentPage); handleCategoryClick("Popular Video"); }}>
                        Popular Video
                      </Link>
                      <hr className="text-dark" />
                    </li>
                    <li className="dropdown-item " aria-label="Close" data-bs-dismiss="offcanvas">
                      <Link className="text-decoration-none text-black" href={`/${createSlug("Letest Video".toLowerCase())}`} onClick={() => { showAlldata("Letest Video", currentPage); handleCategoryClick("Letest Video"); }}>
                        Latest Video
                      </Link>
                      <hr className="text-dark" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <i className="bi bi-bezier2 text-dark me-2"></i> Category
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul style={{ listStyle: "None" }}>
                    <hr className="text-dark" />
                    {categorys.map((n) => (
                      <li
                        key={n}
                        onClick={() => {
                          router.push(`/${createSlug(n.toLowerCase())}`);
                          handleCategoryClick(n);
                          showAlldata();
                        }}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        {n}
                        <hr className="text-dark" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <i className="bi bi-plus-lg text-dark me-2"></i> New Addition
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul style={{ listStyle: "None" }}>
                    <li data-bs-dismiss="offcanvas" aria-label="Close">
                      <Link href="/ournetwork" className="text-dark text-decoration-none"> Our Network</Link>
                      <hr />
                    </li>
                    <li>
                      Update Soon
                      <hr />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  <i className="fa-solid fa-ribbon me-2"></i> Porn Stars
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul style={{ listStyle: "None" }}>
                    <hr className="text-dark" />
                    {pornStar.map((n) => (
                      <li
                        key={n.name}
                        onClick={() => {
                          router.push(`/pornstar/${createSlug(n.name.toLowerCase())}`);
                          modelSearch(n.name, 1);
                        }}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        {n.name}
                        <hr className="text-dark" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* side navbar finish */}

      {/*navbar with dropdown start */}
      <div className="navbar navbar-expand-lg bg-dark-subtle p-0 dropDownHide">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Videos
                </span>

                <ul className="dropdown-menu dropdown-content" style={{ maxHeight: "190px", overflowY: "auto" }}>
                  <li>
                    <Link className="dropdown-item" href={`/${createSlug("Popular Video".toLowerCase())}`} onClick={() => showAlldata("Popular Video", currentPage)}>
                      Popular Video
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" href={`/${createSlug("Letest Video".toLowerCase())}`} onClick={() => showAlldata("Letest Video", currentPage)}>
                      Latest Video
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" href="/">Red Alert</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </span>
                <ul className="dropdown-menu dropdown-content" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {categorys.slice(0, visibleItems).map((n, index) => (
                    <>
                      <li key={`${n}-${index}`}><hr className="dropdown-divider" /></li>
                      <li onClick={() => { router.push(`/${createSlug(n.toLowerCase())}`); showAlldata(n); }}>
                        <span className="dropdown-item">{n}</span>
                      </li>
                    </>
                  ))}
                  {visibleItems < categorys.length && (
                    <li className="d-flex justify-content-center bg-secondary text-center">
                      <button className="btn text-white me-2" onClick={() => router.push("/totalcategorys")}>Show More...</button>
                    </li>
                  )}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#">
                  New Addition
                </span>
                <ul className="dropdown-menu dropdown-content" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <li>
                    <Link className="dropdown-item" href="/">Update soon</Link>
                  </li>
                </ul>
              </li>

              <div className="d-flex align-items-center ms-3">
                <p className="text-black m-0" onClick={() => { router.push("/pornstar"); showAlldata(); }} style={{ cursor: "pointer" }}>
                
                  Porn Star
                </p>
              </div>
            </ul>
          </div>
        </div>
      </div>
      {/* dropdown with navbar Finish */}
    </>
  );
}
