import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import Members from "./pages/Members";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Konten */}
        <div className="flex-1 md:ml-64">
          {/* Padding top 16 (64px) untuk mobile/tablet, 20 (80px) untuk desktop */}
          <Navbar onToggleSidebar={toggleSidebar} />
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
    </Router>
  );
};

export default App;
