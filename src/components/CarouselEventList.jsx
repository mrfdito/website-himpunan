import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CarouselEventList = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  }, [events.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  }, [events.length]);

  useEffect(() => {
    if (events.length <= 1) return; // Don't auto-play if there's only one or no events

    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [events.length, handleNext]);

  if (!events || events.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-800 relative group">
      {/* Slides Container */}
      <div className="relative w-full h-[450px]">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image and Placeholder */}
            {event.gambar_url ? (
              <img
                src={event.gambar_url}
                alt={event.judul}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-500">
                <ImageIcon />
                <span className="mt-2 text-lg">Gambar tidak tersedia</span>
              </div>
            )}

            {/* Gradient Overlay & Text Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                  {event.judul}
                </h3>
                <p className="text-base md:text-lg mt-2 font-medium drop-shadow-md">
                  {new Date(event.tanggal).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="mt-5 inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105"
                >
                  Lihat Detail &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRightIcon />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex justify-center space-x-2">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// --- SVG Icons ---
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);
const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-16 h-16"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

export default CarouselEventList;
