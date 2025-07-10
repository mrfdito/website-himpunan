import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import Members from "./pages/Members";
import DetailEvent from "./components/DetailEvent";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-16 md:pt-20 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event" element={<Event />} />
            <Route path="/members" element={<Members />} />
            <Route path="/event/:id" element={<DetailEvent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
