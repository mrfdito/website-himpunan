import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import Members from "./pages/Members";

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Tampilkan Sidebar hanya jika bukan di Home */}
      {!isHome && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Konten utama */}
      <div className={`flex-1 ${!isHome ? "md:ml-64" : ""}`}>
        <Navbar onToggleSidebar={setIsSidebarOpen} />
        <div className="pt-16 md:pt-20 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event" element={<Event />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
