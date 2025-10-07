"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import { AdminContext } from "../../providers/AdminContext";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function LoginPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  const { setAdmin } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/adminlogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data?.status === 202 && data?.data?.Email) {
        if (typeof window !== "undefined") {
          localStorage.setItem("adminlogin", data.data.Email);
        }
        setAdmin?.(data.data.Email);
        router.push("/admin/adminhub");
      } else {
        setError(data?.message || "Wrong password or email");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center m-2">
        <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 shadow p-4 mb-5 bg-body-tertiary rounded">
          <h2 className="text-center">Login</h2>
          {error && (
            <div className="alert alert-danger py-2 my-3" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-center">
              <label className="m-1"><b>Email</b></label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3 text-center">
              <label className="m-1"><b>Password</b></label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success btn-sm btn-block w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
