import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profiles from "./pages/Profiles.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx";
import Search from "./pages/Search.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profiles/:id" element={<ProfileDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Layout>
  );
}
