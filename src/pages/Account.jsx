import { useEffect, useState } from "react";
import { fetchAccount, logout } from "../api.js";

export default function Account() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAccount()
      .then((payload) => setAccount(payload.data))
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setMessage("Logged out. Redirect to login.");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <section>
      <h2 className="section-title">Account</h2>
      {error && <p>{error}</p>}
      {!error && !account && <p>Loading account...</p>}
      {account && (
        <div className="grid">
          <div className="card">
            <h3>@{account.username}</h3>
            <p className="badge">{account.role}</p>
            <p>{account.email || "No email available"}</p>
          </div>
          <div className="card">
            <h4>Access</h4>
            <p>{account.role === "admin" ? "Full access" : "Read-only"}</p>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
