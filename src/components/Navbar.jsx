import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-himpunan.png";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md text-gray-900 px-4 md:px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="HIMAKOM" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Hamburger menu (mobile) */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Menu untuk desktop */}
      <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/event" className="hover:text-blue-600">
          Event
        </Link>
        <Link to="/members" className="hover:text-blue-600">
          Member
        </Link>
        {isAdmin ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin-login" className="hover:text-blue-600">
            Login
          </Link>
        )}
      </div>

      {/* Menu dropdown (mobile/tablet) */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-b-md py-4 px-6 flex flex-col gap-4 md:hidden font-semibold text-sm animate-slide-down">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/event"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Event
          </Link>
          <Link
            to="/members"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Member
          </Link>
          {isAdmin ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-600 hover:text-red-700 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin-login"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
