import React, { useState } from "react";

// Helper function to determine event status
const getEventStatus = (eventDate) => {
  const today = new Date();
  const date = new Date(eventDate);
  today.setHours(0, 0, 0, 0); // Normalize today's date
  date.setHours(0, 0, 0, 0); // Normalize event date

  if (date < today) {
    return { text: "Selesai", color: "red" };
  }
  return { text: "Akan Datang", color: "green" };
};

const EventList = ({ events, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  // --- All core logic remains the same ---
  const filteredEvents = events.filter(
    (event) =>
      event.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* MODIFIED: Header with Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Cari event (judul, deskripsi, lokasi)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:max-w-sm pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* MODIFIED: Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full min-w-[800px] text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-1/4">
                Judul
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-2/5">
                Deskripsi
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-[120px]">
                Tanggal
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider w-[100px]">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-center w-[100px]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 align-top">
                    <div className="font-semibold text-slate-800">
                      {event.judul}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <LocationIcon /> {event.lokasi || "-"}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 align-top break-words line-clamp-3">
                    {event.deskripsi}
                  </td>
                  <td className="p-4 text-sm text-slate-600 align-top whitespace-nowrap">
                    {new Date(event.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 align-top">
                    <StatusBadge status={getEventStatus(event.tanggal)} />
                  </td>
                  <td className="p-4 text-center align-top space-x-4">
                    <button
                      onClick={() => onEdit(event)}
                      className="text-yellow-500 hover:text-yellow-600 transition-colors"
                      title="Edit Event"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Hapus Event"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // MODIFIED: Better Empty State
              <tr>
                <td colSpan="5" className="text-center py-16">
                  <div className="mx-auto h-12 w-12 text-slate-400">
                    <CalendarSlashIcon />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-800">
                    Event Tidak Ditemukan
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Coba gunakan kata kunci pencarian yang berbeda.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODIFIED: Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
          >
            <ChevronLeftIcon />
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
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};

// --- Reusable UI Sub-components ---

const StatusBadge = ({ status }) => {
  const colors = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
        colors[status.color]
      }`}
    >
      {status.text}
    </span>
  );
};

// --- SVG Icons ---
const SearchIcon = () => (
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
);
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-3.5 h-3.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);
const EditIcon = () => (
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
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);
const TrashIcon = () => (
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
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);
const ChevronLeftIcon = () => (
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
);
const ChevronRightIcon = () => (
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
);
const CalendarSlashIcon = () => (
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
);

export default EventList;
