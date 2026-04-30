import { NavLink, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="layout">
      <header className="header">
        <div className="brand">
          <h1>Insighta Labs+</h1>
          <span>Secure profile intelligence for real teams</span>
        </div>
        <nav className="nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profiles">Profiles</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>
      <main className="main">
        {isLogin ? children : <div className="card">{children}</div>}
      </main>
    </div>
  );
}
