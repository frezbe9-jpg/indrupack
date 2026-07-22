import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar, { Footer } from "./components/Navigation";
import HomePage from "./pages/HomePage";
import FaqPage from "./pages/FaqPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";

function Layout() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === "/login" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/admin";

  return (
    <div className="bg-gray-950 min-h-screen">
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
