import { useEffect, useState } from "react";
import { fetchProfiles, createProfile } from "../api.js";

const emptyFilters = {
  gender: "",
  country_id: "",
  age_group: "",
  min_age: "",
  max_age: "",
  sort_by: "created_at",
  order: "desc",
  page: 1,
  limit: 10
};

export default function Profiles() {
  const [filters, setFilters] = useState(emptyFilters);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const loadProfiles = (nextFilters) => {
    fetchProfiles(nextFilters)
      .then((payload) => {
        setData(payload);
        setError("");
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      });
  };

  useEffect(() => {
    loadProfiles(filters);
  }, []);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadProfiles({ ...filters, page: 1 });
  };

  const handleCreate = async () => {
    try {
      await createProfile({ name });
      setName("");
      loadProfiles(filters);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const nextPage = () => {
    const next = { ...filters, page: filters.page + 1 };
    setFilters(next);
    loadProfiles(next);
  };

  const prevPage = () => {
    const next = { ...filters, page: Math.max(1, filters.page - 1) };
    setFilters(next);
    loadProfiles(next);
  };

  return (
    <section>
      <h2 className="section-title">Profiles</h2>
      <form className="grid" onSubmit={handleSubmit}>
        <label>
          Gender
          <select name="gender" value={filters.gender} onChange={handleChange}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Country
          <input
            name="country_id"
            placeholder="NG"
            value={filters.country_id}
            onChange={handleChange}
          />
        </label>
        <label>
          Age group
          <select
            name="age_group"
            value={filters.age_group}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="child">Child</option>
            <option value="teenager">Teenager</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </label>
        <label>
          Min age
          <input
            name="min_age"
            type="number"
            value={filters.min_age}
            onChange={handleChange}
          />
        </label>
        <label>
          Max age
          <input
            name="max_age"
            type="number"
            value={filters.max_age}
            onChange={handleChange}
          />
        </label>
        <label>
          Sort by
          <select
            name="sort_by"
            value={filters.sort_by}
            onChange={handleChange}
          >
            <option value="created_at">Created</option>
            <option value="age">Age</option>
            <option value="gender_probability">Gender confidence</option>
          </select>
        </label>
        <label>
          Order
          <select name="order" value={filters.order} onChange={handleChange}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </label>
        <label>
          Limit
          <input
            name="limit"
            type="number"
            value={filters.limit}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Apply filters</button>
      </form>

      <div style={{ marginTop: "18px" }}>
        <label>
          Create profile (admin only)
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Harriet Tubman"
            />
            <button type="button" onClick={handleCreate}>
              Create
            </button>
          </div>
        </label>
      </div>

      {error && <p style={{ marginTop: "16px" }}>{error}</p>}

      {data && (
        <div>
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
              {data.data.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.name}</td>
                  <td>{profile.age}</td>
                  <td>{profile.gender}</td>
                  <td>{profile.country_name || profile.country_id}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button type="button" className="secondary" onClick={prevPage}>
              Prev
            </button>
            <button type="button" className="secondary" onClick={nextPage}>
              Next
            </button>
            <span className="badge">
              Page {filters.page} of {data.total_pages}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
