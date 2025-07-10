import React, { useState } from "react";

const AnggotaList = ({ anggota, onEdit, onDelete }) => {
  const [filterDivisi, setFilterDivisi] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Logic remains the same ---
  const divisiOptions = [
    "Semua",
    ...Array.from(new Set(anggota.map((a) => a.divisi))),
  ];

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
  const currentAnggota = filteredAnggota.slice(
    (currentPage - 1) * anggotaPerPage,
    currentPage * anggotaPerPage
  );

  // NEW: Better message for initial empty state
  if (!anggota || anggota.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500">Belum ada data anggota yang terdaftar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* MODIFIED: Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <FilterIcon />
          </span>
          <select
            value={filterDivisi}
            onChange={(e) => {
              setFilterDivisi(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            {divisiOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Cari nama atau NIM..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* MODIFIED: Grid or No Results View */}
      {filteredAnggota.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAnggota.map((item) => (
              <MemberCard
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        // NEW: Better view for "No results found"
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-lg">
          <div className="mx-auto h-12 w-12 text-slate-400">
            <UsersSlashIcon />
          </div>
          <h3 className="mt-2 text-lg font-semibold text-slate-800">
            Data Tidak Ditemukan
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Coba ubah filter atau kata kunci pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
};

// --- Reusable UI Components for a cleaner structure ---

const MemberCard = ({ item, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col text-center transition-shadow hover:shadow-lg">
    {item.foto_url ? (
      <img
        src={item.foto_url}
        alt={item.nama}
        className="w-24 h-24 mx-auto object-cover rounded-full mb-4 border-2 border-slate-200"
      />
    ) : (
      <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 mb-4 flex items-center justify-center text-slate-400">
        <UserIcon />
      </div>
    )}
    <div className="flex-grow">
      <h3 className="text-lg font-bold text-slate-800">{item.nama}</h3>
      <p className="text-sm text-slate-500">NIM: {item.nim}</p>
      <div className="text-xs text-slate-600 bg-slate-100 rounded-full px-3 py-1 mt-2 inline-block">
        {item.divisi} - {item.posisi}
      </div>
      <p className="text-xs text-slate-400 mt-2">
        Masa Jabatan: {item.mulai_jabatan} s/d {item.akhir_jabatan}
      </p>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2 justify-center">
      <button
        onClick={() => onEdit(item)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white rounded-md text-xs font-semibold hover:bg-yellow-500 transition-colors"
      >
        <EditIcon /> Edit
      </button>
      <button
        onClick={() => onDelete(item.id)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-md text-xs font-semibold hover:bg-red-600 transition-colors"
      >
        <TrashIcon /> Hapus
      </button>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2 mt-8">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center justify-center w-9 h-9 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
    >
      <ChevronLeftIcon />
    </button>

    <span className="text-sm text-slate-600">
      Page <span className="font-semibold">{currentPage}</span> of{" "}
      <span className="font-semibold">{totalPages}</span>
    </span>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="flex items-center justify-center w-9 h-9 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
    >
      <ChevronRightIcon />
    </button>
  </div>
);

// --- SVG Icons ---
const FilterIcon = () => (
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
      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
    />
  </svg>
);
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
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const UsersSlashIcon = () => (
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
      d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.14M12 13.5V21m0-9.75A4.5 4.5 0 0116.5 9h.008a4.5 4.5 0 014.492 4.5v.75m-8.992-5.25a4.5 4.5 0 01-1.07 3.25m-3.72 0a4.5 4.5 0 01-5.69 3.25M3 3l18 18"
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
    className="w-4 h-4"
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
    className="w-4 h-4"
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

export default AnggotaList;
