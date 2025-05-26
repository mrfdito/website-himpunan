import React, { useState } from "react";

const EventList = ({ events, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const filteredEvents = events.filter(
    (event) =>
      event.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header: Search and Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari event (judul, deskripsi, lokasi)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:max-w-xs w-full"
        />

        {/* Pagination */}
        {totalPages > 0 && (
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
                    key={idx + 1}
                    onClick={() => goToPage(idx + 1)}
                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                      currentPage === idx + 1
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 3 ||
                pageNumber === currentPage + 3
              ) {
                return (
                  <span key={idx + 1} className="px-4 py-2">
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

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full table-fixed min-w-[700px] text-left">
          {" "}
          {/* Added table-fixed */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider w-1/5">
                Judul
              </th>{" "}
              {/* Set column width */}
              <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider w-2/5">
                Deskripsi
              </th>{" "}
              {/* Set column width */}
              <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider w-1/12">
                Tanggal
              </th>{" "}
              {/* Set column width */}
              <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider w-1/6">
                Lokasi
              </th>{" "}
              {/* Set column width */}
              <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider w-1/12">
                Gambar
              </th>{" "}
              {/* Set column width */}
              <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center w-[80px]">
                Aksi
              </th>{" "}
              {/* Set column width */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-3 text-sm text-gray-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {" "}
                    {/* Added ellipsis */}
                    {event.judul}
                  </td>
                  <td className="p-3 text-sm text-gray-600 line-clamp-2 break-words">
                    {event.deskripsi}
                  </td>
                  <td className="p-3 text-sm text-gray-600">{event.tanggal}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {" "}
                    {/* Added ellipsis */}
                    {event.lokasi || "-"}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {event.gambar_url ? (
                      <img
                        src={event.gambar_url}
                        alt={`Gambar ${event.judul}`}
                        className="w-16 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400">Tidak ada gambar</span>
                    )}
                  </td>
                  <td className="p-3 text-sm text-center space-x-2">
                    <button
                      onClick={() => onEdit(event)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none"
                      title="Edit Event"
                    >
                      <span role="img" aria-label="edit">
                        ✏️
                      </span>
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none"
                      title="Hapus Event"
                    >
                      <span role="img" aria-label="delete">
                        🗑️
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 text-md"
                >
                  Tidak ada event yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
