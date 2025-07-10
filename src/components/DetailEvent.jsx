import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// --- Komponen Ikon Sederhana (letakkan di file yang sama atau import dari file lain) ---

const IconCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const IconMapPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// --- Komponen Utama ---

const DetailEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      // Fungsi fetch tetap sama, tidak ada perubahan
      const { data, error } = await supabase
        .from("event")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil data event:", error);
      } else {
        setEvent(data);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center py-10">Memuat event...</p>;
  if (!event)
    return <p className="text-center py-10">Event tidak ditemukan.</p>;

  // Format tanggal sekali saja agar lebih rapi
  const formattedDate = new Date(event.tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Daftar Event
        </button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Gambar Event (Hero Image) */}
          {event.gambar_url && (
            <img
              src={event.gambar_url}
              alt={event.judul}
              className="w-full h-64 md:h-80 object-cover"
            />
          )}

          <div className="p-6 md:p-8">
            {/* Judul & Metadata */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0 leading-tight">
                {event.judul}
              </h1>

              {/* Info Panel di Kanan (Desktop) atau di Bawah Judul (Mobile) */}
              <div className="flex-shrink-0 md:ml-6 space-y-3 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center text-sm text-gray-600">
                  <IconCalendar />
                  <span className="font-medium">{formattedDate}</span>
                </div>
                {event.lokasi && (
                  <div className="flex items-center text-sm text-gray-600">
                    <IconMapPin />
                    <span className="font-medium">{event.lokasi}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Garis Pemisah */}
            <hr className="my-6 border-gray-200" />

            {/* Deskripsi Event */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Deskripsi Event
              </h2>
              <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {event.deskripsi}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DetailEvent;
