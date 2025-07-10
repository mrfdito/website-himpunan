import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { supabase } from "../supabaseClient";
import CarouselEventList from "./CarouselEventList";

const EventListUser = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 6;

  // --- All core logic remains the same ---
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("event").select("*");
      if (error) {
        console.error("Gagal fetch events:", error);
      } else {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter(
      (event) =>
        event.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      const isPastA = dateA < now;
      const isPastB = dateB < now;
      if (isPastA && !isPastB) return 1;
      if (!isPastA && isPastB) return -1;
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  const upcomingEvents = events
    .filter((e) => new Date(e.tanggal) >= new Date())
    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
    .slice(0, 5); // Show up to 5 in carousel

  if (!events.length) {
    return <EmptyState />;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Carousel for Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Segera Hadir
            </h2>
            <CarouselEventList events={upcomingEvents} />
          </section>
        )}

        {/* Header + Search + Sort */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Semua Acara
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <SearchInput
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <SortSelect
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              />
            </div>
          </div>

          {/* Event Cards */}
          {paginatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {paginatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <NoResultsState />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </div>
    </div>
  );
};

// --- Reusable UI Sub-components ---

const EventCard = ({ event }) => {
  const eventDate = new Date(event.tanggal);
  const isPast = eventDate < new Date();

  return (
    <Link
      to={`/event/${event.id}`}
      className="block bg-white rounded-xl shadow-md border border-slate-200 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      <div className="flex gap-5">
        <div className="flex-shrink-0 text-center w-20">
          <p className="text-base font-bold text-blue-600 uppercase">
            {eventDate.toLocaleString("id-ID", { month: "short" })}
          </p>
          <p className="text-4xl font-extrabold text-slate-800 tracking-tight">
            {eventDate.getDate()}
          </p>
          <p className="text-xs font-semibold text-slate-500">
            {eventDate.getFullYear()}
          </p>
        </div>
        <div className="flex-grow border-l border-slate-200 pl-5">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1 pr-2">
              {event.judul || "Judul Event"}
            </h3>
            {isPast && (
              <span className="flex-shrink-0 text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                Selesai
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">
            {event.deskripsi || "Deskripsi singkat event."}
          </p>
          <p className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
            Lihat Detail{" "}
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

const SearchInput = ({ value, onChange }) => (
  <div className="relative w-full sm:w-64">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Cari event..."
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    />
  </div>
);

const SortSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
  >
    <option value="asc">Terdekat</option>
    <option value="desc">Terlama</option>
  </select>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
      >
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return (
              <span key={pageNumber} className="text-slate-400 px-1">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
      >
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-20">
    <div className="mx-auto h-16 w-16 text-slate-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25m10.5-2.25v2.25m-10.5 0L3 18m18-12.75L9 21M3 3l18 18"
        />
      </svg>
    </div>
    <h3 className="mt-4 text-xl font-semibold text-slate-800">
      Belum Ada Event
    </h3>
    <p className="mt-2 text-base text-slate-500">
      Silakan cek kembali di lain waktu.
    </p>
  </div>
);

const NoResultsState = () => (
  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-lg">
    <div className="mx-auto h-12 w-12 text-slate-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
    <h3 className="mt-2 text-lg font-semibold text-slate-800">
      Event Tidak Ditemukan
    </h3>
    <p className="mt-1 text-sm text-slate-500">
      Coba gunakan kata kunci pencarian yang lain.
    </p>
  </div>
);

export default EventListUser;
