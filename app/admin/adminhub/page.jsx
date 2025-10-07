"use client";
import React, { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminHub() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    totals: { views: 0, users: 0, sessions: 0, bounceRate: 0 },
    sources: [],
    timeseries: [],
  });

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/analytics/summary", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load analytics");
        setData(json);
      } catch (e) {
        setError(e.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const fmt = (n) => new Intl.NumberFormat().format(Number(n || 0));
  const fmtPct = (n) => `${(Number(n || 0)).toFixed(1)}%`;

  return (
    <div className="container-fluid my-3">
      <h2 className="mb-3">AdminHub • Site Analytics</h2>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary">Views (7d)</h6>
            <div className="display-6">{loading ? "–" : fmt(data.totals.views)}</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary">Users (7d)</h6>
            <div className="display-6">{loading ? "–" : fmt(data.totals.users)}</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary">Sessions (7d)</h6>
            <div className="display-6">{loading ? "–" : fmt(data.totals.sessions)}</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary">Bounce Rate (7d)</h6>
            <div className="display-6">{loading ? "–" : fmtPct(data.totals.bounceRate)}</div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm p-3">
            <h5>Top Traffic Sources (7d)</h5>
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th className="text-end">Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.sources || []).map((s, i) => (
                    <tr key={i}>
                      <td>{s.source}</td>
                      <td className="text-end">{fmt(s.sessions)}</td>
                    </tr>
                  ))}
                  {!loading && (!data.sources || data.sources.length === 0) && (
                    <tr>
                      <td colSpan={2} className="text-secondary">No data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm p-3">
            <h5>Last 7 Days Trend</h5>
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th className="text-end">Views</th>
                    <th className="text-end">Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.timeseries || []).map((d, i) => (
                    <tr key={i}>
                      <td>{d.date}</td>
                      <td className="text-end">{fmt(d.views)}</td>
                      <td className="text-end">{fmt(d.sessions)}</td>
                    </tr>
                  ))}
                  {!loading && (!data.timeseries || data.timeseries.length === 0) && (
                    <tr>
                      <td colSpan={3} className="text-secondary">No data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-3" role="alert">
        To connect Google Analytics, provide an API that returns GA metrics at <code>/api/analytics/summary</code>.
      </div>
    </div>
  );
}
