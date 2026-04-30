import { useEffect, useState } from "react";
import { fetchDashboardMetrics } from "../api.js";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardMetrics()
      .then((data) => setMetrics(data))
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, []);

  return (
    <section>
      <h2 className="section-title">Dashboard</h2>
      {error && <p>{error}</p>}
      {!error && !metrics && <p>Loading metrics...</p>}
      {metrics && (
        <div className="grid">
          <div className="card">
            <h3>Total Profiles</h3>
            <p style={{ fontSize: "2rem", margin: 0 }}>{metrics.total}</p>
          </div>
          <div className="card">
            <h3>Pages</h3>
            <p style={{ fontSize: "2rem", margin: 0 }}>{metrics.total_pages}</p>
          </div>
          <div className="card">
            <h3>Latest Snapshot</h3>
            <p className="badge">Updated moments ago</p>
          </div>
        </div>
      )}
    </section>
  );
}
