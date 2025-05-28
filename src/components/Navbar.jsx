import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-himpunan.png";

const Navbar = ({ onToggleSidebar }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md text-gray-900 flex items-center justify-between px-4 py-4 md:py-5 h-16 md:h-20">
      <div className="flex items-center gap-2">
        {/* Tombol toggle sidebar di mobile */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-900 text-2xl focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>

        {/* Logo HIMAKOM */}
        <Link to="/" className="text-xl font-bold flex items-center">
          <img src={logo} alt="HIMAKOM" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Pesan di pojok kanan atas dengan margin kanan */}
      <div className="text-gray-700 font-semibold text-sm md:text-base mr-6 select-none">
        {isAdmin ? "👋 Halo, admin" : "👋 Selamat datang Palkomers"}
      </div>
    </nav>
  );
};

export default Navbar;
