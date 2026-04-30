import { useState } from "react";
import { searchProfiles } from "../api.js";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    searchProfiles({ q: query })
      .then((payload) => {
        setResults(payload.data);
        setError("");
      })
      .catch((err) => setError(err.response?.data?.message || err.message));
  };

  return (
    <section>
      <h2 className="section-title">Search</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Query
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="young males from nigeria"
          />
        </label>
        <div style={{ marginTop: "12px" }}>
          <button type="submit">Search</button>
        </div>
      </form>

      {error && <p style={{ marginTop: "16px" }}>{error}</p>}

      {results && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {results.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.age}</td>
                <td>{profile.gender}</td>
                <td>{profile.country_name || profile.country_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
