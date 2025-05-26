import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const EventListUser = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("event").select("*"); // pastikan nama tabel benar

      if (error) {
        console.error("Gagal fetch events:", error);
      } else {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>Tidak ada event tersedia.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded p-4 shadow hover:shadow-lg transition-shadow duration-300"
        >
          {event.gambar_url && (
            <img
              src={event.gambar_url}
              alt={event.judul}
              className="w-full h-80 object-cover rounded mb-3"
            />
          )}
          <h2 className="text-xl font-semibold mb-1">{event.judul}</h2>
          <p className="text-gray-700 mb-2 line-clamp-3">{event.deskripsi}</p>
          <p className="text-sm text-gray-500">
            <strong>Tanggal:</strong> {event.tanggal} <br />
            <strong>Lokasi:</strong> {event.lokasi}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventListUser;
