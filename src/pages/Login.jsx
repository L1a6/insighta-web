const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Login() {
  const loginUrl = `${apiBaseUrl}/auth/github`;

  return (
    <section className="card">
      <h2 className="section-title">Welcome back</h2>
      <p>Sign in with GitHub to access Insighta Labs+.</p>
      <div style={{ marginTop: "20px" }}>
        <a href={loginUrl}>
          <button type="button">Continue with GitHub</button>
        </a>
      </div>
    </section>
  );
}
