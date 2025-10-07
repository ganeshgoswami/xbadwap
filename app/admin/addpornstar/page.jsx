"use client";
import React, { useContext, useMemo, useState } from "react";
import { AdminContext } from "../providers/AdminContext";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AddPornStar() {
  const { getPornStars } = useContext(AdminContext);
  const [form, setForm] = useState({ name: "", gender: "Female", pImage: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "/api", []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.name || !form.gender || !form.pImage) {
      setMessage("Please fill all fields.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/pornstar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && (data.statusCode === 202 || data.statusCode === 409)) {
        setMessage(data.message || "Saved");
        if (data.statusCode === 202) {
          setForm({ name: "", gender: "Female", pImage: "" });
          if (typeof getPornStars === "function") getPornStars();
        }
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error while saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-3 text-center card p-3 shadow-sm" style={{ maxWidth: 700 }}>
      <h3 className="mb-3">Add Pornstar</h3>
      {message && (
        <div className="alert alert-info py-2" role="alert">{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label w-100 text-center">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter pornstar name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label w-100 text-center">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Trans">Trans</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="pImage" className="form-label w-100 text-center">Image URL</label>
          <input
            type="url"
            className="form-control"
            id="pImage"
            name="pImage"
            placeholder="https://example.com/image.jpg"
            value={form.pImage}
            onChange={handleChange}
          />
          <div className="form-text">Provide a full image URL.</div>
        </div>

        <button type="submit" className="btn btn-primary d-block mx-auto" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
