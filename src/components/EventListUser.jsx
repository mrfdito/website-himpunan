import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EventListUser = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
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

  // Filter dan sorting
  const filteredEvents = events
    .filter((event) => {
      const lowerQuery = searchQuery.toLowerCase();
      const eventText = `${event.judul} ${event.deskripsi}`.toLowerCase();
      const matchSearch = eventText.includes(lowerQuery);

      const matchMonth = filterMonth
        ? new Date(event.tanggal).getMonth() + 1 === parseInt(filterMonth)
        : true;

      return matchSearch && matchMonth;
    })
    .sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Acara dan Berita</h2>

      {/* Search, Filter, Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari event..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />

        {/* Filter Bulan */}
        <select
          value={filterMonth}
          onChange={(e) => {
            setFilterMonth(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg"
        >
          <option value="">Filter Bulan</option>
          {Array.from({ length: 12 }).map((_, idx) => (
            <option key={idx} value={idx + 1}>
              {new Date(0, idx).toLocaleString("id-ID", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg"
        >
          <option value="desc">Terbaru ke Terlama</option>
          <option value="asc">Terlama ke Terbaru</option>
        </select>
      </div>

      {/* Event Cards */}
      {paginatedEvents.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada event yang cocok.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {paginatedEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              {/* Gambar */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                {event.gambar_url && (
                  <img
                    src={event.gambar_url}
                    alt={event.judul}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Konten */}
              <div className="flex-grow ml-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {event.judul}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.deskripsi}
                </p>
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Detail &gt;
                </button>
              </div>

              {/* Tanggal */}
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center md:justify-end space-x-2">
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
