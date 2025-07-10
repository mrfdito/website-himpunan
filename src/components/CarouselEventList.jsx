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
    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
      <div className="relative">
        {event.gambar_url ? (
          <img
            src={event.gambar_url}
            alt={event.judul}
            className="w-full h-[400px] object-cover"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
            Tidak ada gambar
          </div>
        )}

        {/* Overlay teks dan gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/50 to-transparent flex items-end p-8">
          <div className="text-white max-w-xl">
            <h3 className="text-3xl md:text-4xl font-extrabold">
              {event.judul}
            </h3>
            <p className="text-base md:text-lg mt-2 font-medium">
              {new Date(event.tanggal).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              onClick={() => navigate(`/event/${event.id}`)}
              className="mt-4 inline-block bg-white text-blue-800 font-semibold text-base px-6 py-3 rounded-lg hover:bg-blue-100 transition-all duration-200"
            >
              Lihat Detail →
            </button>
          </div>
        </div>
      </div>

      {/* Dots navigasi */}
      <div className="flex justify-center space-x-3 bg-gray-100 py-4">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              currentIndex === idx ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselEventList;
