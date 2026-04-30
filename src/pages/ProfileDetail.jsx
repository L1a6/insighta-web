import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../api.js";

export default function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile(id)
      .then((payload) => setProfile(payload.data))
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, [id]);

  return (
    <section>
      <h2 className="section-title">Profile Detail</h2>
      {error && <p>{error}</p>}
      {!error && !profile && <p>Loading profile...</p>}
      {profile && (
        <div className="grid">
          <div className="card">
            <h3>{profile.name}</h3>
            <p className="badge">{profile.gender}</p>
          </div>
          <div className="card">
            <h4>Age</h4>
            <p>{profile.age}</p>
          </div>
          <div className="card">
            <h4>Country</h4>
            <p>{profile.country_name || profile.country_id}</p>
          </div>
          <div className="card">
            <h4>Created at</h4>
            <p>{profile.created_at}</p>
          </div>
        </div>
      )}
    </section>
  );
}
