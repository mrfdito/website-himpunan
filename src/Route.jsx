import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Members from "./pages/Members";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event" element={<Event />} />
      <Route path="/members" element={<Members />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Proteksi dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
