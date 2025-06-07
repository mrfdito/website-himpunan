import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const DetailEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
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

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!event)
    return <p className="text-center py-10">Event tidak ditemukan.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-600 hover:underline flex items-center"
      >
        ← Kembali
      </button>

      {/* Judul Event */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{event.judul}</h1>

      {/* Tanggal */}
      <p className="text-gray-500 text-sm mb-2">
        {new Date(event.tanggal).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Lokasi */}
      {event.lokasi && (
        <p className="text-gray-600 text-sm mb-4">
          📍 <span className="font-medium">{event.lokasi}</span>
        </p>
      )}

      {/* Gambar */}
      {event.gambar_url && (
        <img
          src={event.gambar_url}
          alt={event.judul}
          className="w-full max-h-[500px] object-cover rounded mb-6 shadow"
        />
      )}

      {/* Deskripsi */}
      <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
        {event.deskripsi}
      </div>
    </div>
  );
};

export default DetailEvent;
