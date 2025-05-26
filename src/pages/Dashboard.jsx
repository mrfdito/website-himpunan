import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import AnggotaForm from "../components/AnggotaForm";
import AnggotaList from "../components/AnggotaList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("none");

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [anggota, setAnggota] = useState([]);
  const [editingAnggota, setEditingAnggota] = useState(null);

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

  // Untuk switch view: list atau form
  const [showForm, setShowForm] = useState(false);

  // Hitung acara yang akan datang dan selesai
  const today = new Date();
  const upcomingEventsCount = events.filter(
    (e) => new Date(e.tanggal) >= today
  ).length;
  const finishedEventsCount = events.filter(
    (e) => new Date(e.tanggal) < today
  ).length;

  // Handler tambah data (buka form kosong)
  const handleAdd = () => {
    if (activeTab === "event") setEditingEvent(null);
    else if (activeTab === "anggota") setEditingAnggota(null);
    setShowForm(true);
  };

  // Handler edit data (buka form isi data)
  const handleEdit = (item) => {
    if (activeTab === "event") setEditingEvent(item);
    else if (activeTab === "anggota") setEditingAnggota(item);
    setShowForm(true);
  };

  // Batal (tutup form, kembali ke list)
  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
    setEditingAnggota(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Dashboard Admin
      </h1>

      {/* 3 Card kecil summary */}
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <SmallCard title="Total Anggota" count={anggota.length} />
        <SmallCard title="Acara Akan Datang" count={upcomingEventsCount} />
        <SmallCard title="Acara Selesai" count={finishedEventsCount} />
      </div>

      {activeTab === "none" ? (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <CardChoice
            title="Anggota"
            description="Tambah, edit, atau hapus anggota."
            onStart={() => setActiveTab("anggota")}
            emoji="👥"
          />
          <CardChoice
            title="Acara"
            description="Tambah, edit, atau hapus acara."
            onStart={() => setActiveTab("event")}
            emoji="📅"
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end space-x-4 mb-6">
            {!showForm && (
              <>
                <button
                  onClick={handleAdd}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
                >
                  Tambah
                </button>
                <button
                  onClick={() => {
                    setActiveTab("none");
                    setShowForm(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
                >
                  Keluar
                </button>
              </>
            )}

            {showForm && (
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded"
              >
                Batal
              </button>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow">
            {!showForm && activeTab === "event" && (
              <EventList
                events={events}
                onEdit={handleEdit}
                onDelete={handleDeleteEvent}
                compact={true}
              />
            )}
            {!showForm && activeTab === "anggota" && (
              <AnggotaList
                anggota={anggota}
                onEdit={handleEdit}
                onDelete={handleDeleteAnggota}
                compact={true}
              />
            )}

            {showForm && activeTab === "event" && (
              <EventForm
                editingEvent={editingEvent}
                setEditingEvent={setEditingEvent}
                onClose={handleCancel}
                fetchEvents={fetchEvents}
              />
            )}

            {showForm && activeTab === "anggota" && (
              <AnggotaForm
                editingAnggota={editingAnggota}
                setEditingAnggota={setEditingAnggota}
                onClose={handleCancel}
                fetchAnggota={fetchAnggota}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const CardChoice = ({ title, description, onStart, emoji }) => (
  <div className="flex flex-col items-center justify-between bg-white rounded-lg shadow-md p-8 w-72">
    <div className="text-6xl mb-4">{emoji}</div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 mb-6 text-center">{description}</p>
    <button
      onClick={onStart}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
    >
      Mulai
    </button>
  </div>
);

const SmallCard = ({ title, count }) => (
  <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow px-8 py-6 min-w-[180px] text-center">
    <p className="text-lg font-semibold mb-2">{title}</p>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
