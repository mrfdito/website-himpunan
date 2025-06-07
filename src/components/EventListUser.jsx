import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CarouselEventList from "./CarouselEventList"; // import carousel

const EventListUser = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 6;
  const navigate = useNavigate();

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

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const filteredEvents = events
    .filter(
      (event) =>
        event.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const now = new Date();
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      const isPastA = dateA < now;
      const isPastB = dateB < now;
      if (isPastA && !isPastB) return 1;
      if (!isPastA && isPastB) return -1;
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Ambil 3 event terdekat untuk carousel (hanya event masa depan, ascending)
  const now = new Date();
  const upcomingEvents = events
    .filter((e) => new Date(e.tanggal) >= now)
    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
    .slice(0, 3);

  if (!events.length)
    return <p className="text-center">Tidak ada event tersedia.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Carousel dengan 3 event terdekat */}
      <CarouselEventList events={upcomingEvents} />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 mt-8">
        <h2 className="text-3xl font-bold">Acara dan Berita</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Cari event..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="asc">Terdekat</option>
            <option value="desc">Terlama</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {paginatedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
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
                {event.judul || "Judul Event"}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {event.deskripsi || "Deskripsi singkat event."}
              </p>
              <button
                onClick={() => navigate(`/event/${event.id}`)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Detail <span className="ml-1">&gt;</span>
              </button>
            </div>
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
                  {new Date(event.tanggal) < new Date() && (
                    <p className="text-xs mt-1 text-red-500 font-semibold">
                      Sudah Lewat
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            &laquo; Previous
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`px-4 py-2 rounded-lg transition duration-200 ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 3 ||
              pageNumber === currentPage + 3
            ) {
              return (
                <span key={pageNumber} className="px-4 py-2">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventListUser;
