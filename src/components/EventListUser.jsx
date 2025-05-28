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
        // Limit to 8 events for display consistency with the image, or adjust as needed
        setEvents(data.slice(0, 8));
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>Tidak ada event tersedia.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Acara dan Berita</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            {/* Image Placeholder - simplified for demonstration */}
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
              {/* You can still use event.gambar_url here if available and it fits this smaller size */}
              {event.gambar_url && (
                <img
                  src={event.gambar_url}
                  alt={event.judul}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                {event.judul || "Pentasan Seni Lorem"}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {event.deskripsi ||
                  "Ini adalah detail dari acaranya dan apapun keterangannya oleh."}
              </p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Detail <span className="ml-1">&gt;</span>
              </button>
            </div>

            {/* Date Section - aligned to the right */}
            <div className="flex-shrink-0 ml-4 text-right">
              {event.tanggal && (
                <>
                  <p className="text-sm font-bold text-orange-500 uppercase">
                    {new Date(event.tanggal).toLocaleString("id-ID", {
                      month: "short",
                    })}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {new Date(event.tanggal).getDate()}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListUser;
