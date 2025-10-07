"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="fs-4 mt-2">
        <b>Oops! The page you're looking for doesn't exist.</b>
      </p>
      <Link href="/" className="btn btn-primary mt-3 px-4 py-2">Go Home</Link>
    </div>
  );
}
