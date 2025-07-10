import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import AnggotaForm from "../components/AnggotaForm";
import AnggotaList from "../components/AnggotaList";

// --- Main Dashboard Component ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("anggota"); // Default tab is now 'anggota'
  const [showForm, setShowForm] = useState(false);

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [anggota, setAnggota] = useState([]);
  const [editingAnggota, setEditingAnggota] = useState(null);

  // --- Data Fetching and Mutations (No changes in logic) ---
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("event")
      .select("*")
      .order("tanggal", { ascending: true });
    if (!error) setEvents(data);
  };

  const fetchAnggota = async () => {
    const { data, error } = await supabase
      .from("anggota")
      .select("*")
      .order("nama", { ascending: true });
    if (!error) setAnggota(data);
  };

  const handleDeleteEvent = async (id) => {
    await supabase.from("event").delete().eq("id", id);
    fetchEvents();
  };

  const handleDeleteAnggota = async (id) => {
    await supabase.from("anggota").delete().eq("id", id);
    fetchAnggota();
  };

  useEffect(() => {
    fetchEvents();
    fetchAnggota();
  }, []);

  // --- UI Action Handlers (No changes in logic) ---
  const handleAdd = () => {
    if (activeTab === "event") setEditingEvent(null);
    else if (activeTab === "anggota") setEditingAnggota(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    if (activeTab === "event") setEditingEvent(item);
    else if (activeTab === "anggota") setEditingAnggota(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
    setEditingAnggota(null);
  };

  // --- Calculated Values for Summary Cards ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date
  const upcomingEventsCount = events.filter(
    (e) => new Date(e.tanggal) >= today
  ).length;
  const finishedEventsCount = events.length - upcomingEventsCount;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowForm(false); // Reset form visibility when switching tabs
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Admin</h1>
          <p className="text-slate-500 mt-1">
            Selamat datang! Kelola anggota dan acara himpunan di sini.
          </p>
        </header>

        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Anggota"
            count={anggota.length}
            icon={<UsersIcon />}
            color="blue"
          />
          <SummaryCard
            title="Acara Akan Datang"
            count={upcomingEventsCount}
            icon={<CalendarUpcomingIcon />}
            color="green"
          />
          <SummaryCard
            title="Acara Selesai"
            count={finishedEventsCount}
            icon={<CalendarCheckIcon />}
            color="purple"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6">
          <TabButton
            label="Anggota"
            isActive={activeTab === "anggota"}
            onClick={() => handleTabClick("anggota")}
          />
          <TabButton
            label="Acara"
            isActive={activeTab === "event"}
            onClick={() => handleTabClick("event")}
          />
        </div>

        {/* Main Content Area */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {/* Header for the content area */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-700">
              {showForm
                ? editingAnggota || editingEvent
                  ? "Edit "
                  : "Tambah "
                : "Daftar "}
              {activeTab === "anggota" ? "Anggota" : "Acara"}
            </h2>
            <div>
              {!showForm ? (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <PlusIcon />
                  <span>Tambah</span>
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <BackIcon />
                  <span>Batal</span>
                </button>
              )}
            </div>
          </div>

          {/* Conditional Rendering for Lists and Forms */}
          <div className="transition-all duration-300">
            {!showForm && activeTab === "event" && (
              <EventList
                events={events}
                onEdit={handleEdit}
                onDelete={handleDeleteEvent}
              />
            )}
            {!showForm && activeTab === "anggota" && (
              <AnggotaList
                anggota={anggota}
                onEdit={handleEdit}
                onDelete={handleDeleteAnggota}
              />
            )}
            {showForm && activeTab === "event" && (
              <EventForm
                editingEvent={editingEvent}
                onClose={handleCancel}
                fetchEvents={fetchEvents}
              />
            )}
            {showForm && activeTab === "anggota" && (
              <AnggotaForm
                editingAnggota={editingAnggota}
                onClose={handleCancel}
                fetchAnggota={fetchAnggota}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable UI Components ---

const SummaryCard = ({ title, count, icon, color }) => {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    purple: "border-purple-500 text-purple-600",
  };
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${colors[color]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{count}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 
      ${
        isActive
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-slate-500 hover:text-blue-600"
      }`}
  >
    {label}
  </button>
);

// --- SVG Icons ---
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0115 12a3.75 3.75 0 01-1.75 3.25m-3.75 0A3.75 3.75 0 016 12a3.75 3.75 0 011.75-3.25m0 6.5A3.75 3.75 0 009 12a3.75 3.75 0 00-1.75-3.25m-3.75 0A3.75 3.75 0 003 12a3.75 3.75 0 001.75 3.25m6.5 0A3.75 3.75 0 009 15a3.75 3.75 0 00-1.75 3.25m7.5-3.25A3.75 3.75 0 0015 15a3.75 3.75 0 001.75 3.25"
    />
  </svg>
);
const CalendarUpcomingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 15.75h.008v.008H12v-.008z"
    />
  </svg>
);
const CalendarCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />
  </svg>
);

export default Dashboard;
