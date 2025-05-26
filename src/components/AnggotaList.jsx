import React, { useState } from "react";

const AnggotaList = ({ anggota, onEdit, onDelete }) => {
  const [filterDivisi, setFilterDivisi] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Ambil daftar divisi unik dari data anggota
  const divisiOptions = [
    "Semua",
    ...Array.from(new Set(anggota.map((a) => a.divisi))),
  ];

  // Filter anggota berdasarkan divisi dan search term (nama atau nim)
  const filteredAnggota = anggota.filter((a) => {
    const matchDivisi = filterDivisi === "Semua" || a.divisi === filterDivisi;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch =
      a.nama.toLowerCase().includes(searchLower) ||
      String(a.nim).toLowerCase().includes(searchLower);
    return matchDivisi && matchSearch;
  });

  const anggotaPerPage = 6;
  const totalPages = Math.ceil(filteredAnggota.length / anggotaPerPage);

  const indexOfLast = currentPage * anggotaPerPage;
  const indexOfFirst = indexOfLast - anggotaPerPage;
  const currentAnggota = filteredAnggota.slice(indexOfFirst, indexOfLast);

  if (!anggota || anggota.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Belum ada data anggota yang terdaftar.
      </p>
    );
  }

  return (
    <div>
      {/* Filter dan Search */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <select
          value={filterDivisi}
          onChange={(e) => {
            setFilterDivisi(e.target.value);
            setCurrentPage(1); // Reset halaman pertama saat filter berubah
          }}
          className="border p-2 rounded"
        >
          {divisiOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cari nama atau NIM..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset halaman pertama saat search berubah
          }}
          className="border p-2 rounded flex-grow min-w-[200px]"
        />
      </div>

      {/* Grid Anggota */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentAnggota.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {item.foto_url ? (
              <img
                src={item.foto_url}
                alt={item.nama}
                className="w-24 h-24 object-cover rounded-full mb-3"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <h3 className="text-lg font-semibold">{item.nama}</h3>
            <p className="text-sm text-gray-600">NIM: {item.nim}</p>
            <p className="text-sm text-gray-600">Divisi: {item.divisi}</p>
            <p className="text-sm text-gray-600">Posisi: {item.posisi}</p>
            <p className="text-sm text-gray-600">
              Jabatan: {item.mulai_jabatan} - {item.akhir_jabatan}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="px-3 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center space-x-2 mb-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 mb-2"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded mb-2 ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 mb-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnggotaList;
