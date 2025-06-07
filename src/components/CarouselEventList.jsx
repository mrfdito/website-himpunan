import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarouselEventList = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length]);

  if (!events.length) return null;

  const event = events[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative">
        {event.gambar_url ? (
          <img
            src={event.gambar_url}
            alt={event.judul}
            className="w-full h-80 object-cover" // Ukuran gambar diperbesar
          />
        ) : (
          <div className="w-full h-80 bg-gray-300 flex items-center justify-center text-gray-600">
            Tidak ada gambar
          </div>
        )}

        {/* Overlay gradient biru kiri ke kanan + teks putih */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-transparent flex items-end p-6">
          <div className="text-white">
            <h3 className="text-2xl md:text-3xl font-bold">{event.judul}</h3>
            <p className="text-sm md:text-base mt-1">
              {new Date(event.tanggal).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              onClick={() => navigate(`/event/${event.id}`)}
              className="mt-3 inline-block bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              Detail →
            </button>
          </div>
        </div>
      </div>

      {/* Dots navigasi */}
      <div className="flex justify-center space-x-2 bg-gray-100 py-2">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === idx ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselEventList;
