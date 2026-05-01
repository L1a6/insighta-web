const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api-backend-tan-iota.vercel.app";

const normalizedApiBaseUrl = apiBaseUrl.replace(/\/+$/, "");

export default function Login() {
  const loginUrl = `${normalizedApiBaseUrl}/auth/github`;

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
