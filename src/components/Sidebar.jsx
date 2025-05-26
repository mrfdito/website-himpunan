import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <div
        className={`
          md:hidden fixed top-0 left-0 w-64 h-full bg-white z-40 shadow-lg p-6 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button onClick={toggleSidebar} className="text-gray-500 mb-6">
          ✕ Tutup
        </button>
        <SidebarContent
          isAdmin={isAdmin}
          location={location}
          handleLogout={handleLogout}
        />
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex md:flex-col md:w-64 md:h-[calc(100vh-80px)] md:fixed md:top-20 md:left-0 md:bg-white md:shadow-md md:p-6">
        {/* md:h-[calc(100vh-80px)] supaya tingginya pas, dan top-20 supaya di bawah navbar */}
        <SidebarContent
          isAdmin={isAdmin}
          location={location}
          handleLogout={handleLogout}
        />
      </div>
    </>
  );
};

const SidebarContent = ({ isAdmin, location, handleLogout }) => (
  <ul className="space-y-4 font-medium">
    <li>
      <Link
        to="/"
        className={`block py-2 px-4 rounded ${
          location.pathname === "/" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        to="/event"
        className={`block py-2 px-4 rounded ${
          location.pathname === "/event" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Event
      </Link>
    </li>
    <li>
      <Link
        to="/members"
        className={`block py-2 px-4 rounded ${
          location.pathname === "/members" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Member
      </Link>
    </li>
    {isAdmin ? (
      <>
        <li>
          <Link
            to="/dashboard"
            className={`block py-2 px-4 rounded ${
              location.pathname === "/dashboard"
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </>
    ) : (
      <li>
        <Link
          to="/admin-login"
          className="block py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </Link>
      </li>
    )}
  </ul>
);

export default Sidebar;
