"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AdminContext } from "../providers/AdminContext";

export default function NavbarAdmin() {
  const { setAdmin } = useContext(AdminContext);
  const router = useRouter();

  const logout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminlogin");
      }
      setAdmin?.(null);
      router.push("/");
    } catch (e) {
      router.push("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-2" data-bs-theme="dark">
      <div className="container-fluid">
        <div>
          <Link href="/admin/adminhub" className="nav-link text-warning me-3 fw-bold ">
            <b>Admin Panel</b>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link href="/admin/tabledata" className="nav-link">Video Table Store</Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/admin/addvideos" className="nav-link">Add Video</Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/admin/addpornstar" className="nav-link">Add Pornstar</Link>
            </li>
          </ul>
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm btn-danger" onClick={logout}>Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
