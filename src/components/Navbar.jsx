import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-himpunan.png";

const Navbar = ({ onToggleSidebar }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md text-gray-900 flex items-center justify-between px-4 py-4 md:py-5 h-16 md:h-20">
      {/* Kiri: Logo & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        {isHome && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden text-2xl text-gray-700 hover:text-blue-600"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={logo} alt="HIMAKOM" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Kanan: Menu lengkap di Home, Sapaan saja di halaman lain */}
      {isHome ? (
        <div className="flex items-center gap-4 mr-4 text-sm md:text-base font-medium">
          <Link
            to="/event"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Event
          </Link>
          <Link
            to="/members"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Anggota
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                Logout
              </button>
            </>
          )}

          {!isAdmin && (
            <Link
              to="/admin-login"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
            >
              Admin Login
            </Link>
          )}
        </div>
      ) : (
        <div className="text-gray-700 font-semibold text-sm md:text-base mr-6 select-none">
          {isAdmin ? "👋 Halo, admin" : "👋 Selamat datang Palkomers"}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
