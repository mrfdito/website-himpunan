import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// The organizational structure (No changes here)
const posisiByDivisi = {
  "Ketua dan Wakil": ["Ketua", "Wakil"],
  "Sekretaris Himpunan": ["Sekretaris Himpunan"],
  "Bendahara Himpunan": ["Bendahara Himpunan"],
  "Departemen Pendidikan dan IT": [
    "Kepala Departemen",
    "Sekretaris Departemen",
    "Kepala Divisi",
    "Anggota",
  ],
  "Departemen Eksternal": [
    "Kepala Departemen",
    "Sekretaris Departemen",
    "Kepala Divisi",
    "Anggota",
  ],
  "Departemen Media Informasi": [
    "Kepala Departemen",
    "Sekretaris Departemen",
    "Kepala Divisi",
    "Anggota",
  ],
  "Departemen Internal": [
    "Kepala Departemen",
    "Sekretaris Departemen",
    "Kepala Divisi",
    "Anggota",
  ],
};

// --- Reusable Member Card Component ---
const MemberCard = ({ member, isLeader = false }) => (
  <div
    className={`bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5
      ${
        isLeader
          ? "shadow-lg border-2 border-indigo-500 w-72"
          : "shadow-md border border-slate-200 w-64" // MODIFIED: Set fixed width for centering
      }`}
  >
    {member.foto_url ? (
      <img
        src={member.foto_url}
        alt={member.nama}
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-slate-200"
      />
    ) : (
      <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border-4 border-slate-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
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
      </div>
    )}
    <h3 className="text-xl font-bold text-slate-800">{member.nama}</h3>
    <p className="text-sm text-slate-500">{member.nim}</p>
    <p className="mt-2 text-indigo-600 font-semibold">{member.posisi}</p>
  </div>
);

// --- Main MemberList Component ---
const MemberList = () => {
  const [anggota, setAnggota] = useState([]);

  // Data fetching logic remains the same
  useEffect(() => {
    const fetchAnggota = async () => {
      const { data, error } = await supabase
        .from("anggota")
        .select("*")
        .order("divisi", { ascending: true });

      if (error) {
        console.error("Gagal fetch data:", error.message);
      } else {
        setAnggota(data);
      }
    };
    fetchAnggota();
  }, []);

  // Grouping logic remains the same
  const groupedByDivisi = anggota.reduce((acc, item) => {
    if (!acc[item.divisi]) acc[item.divisi] = [];
    acc[item.divisi].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Struktur Organisasi
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Kenali tim yang berdedikasi di balik Himpunan Mahasiswa Ilmu
            Komputer.
          </p>
        </header>

        {/* Loop through each division */}
        <div className="space-y-20">
          {Object.entries(posisiByDivisi).map(([divisi, posisiList]) => {
            const membersInDivision = groupedByDivisi[divisi] || [];
            if (membersInDivision.length === 0) return null; // Don't render empty divisions

            // Separate leaders from members
            const leaders = membersInDivision.filter(
              (a) => a.posisi !== "Anggota"
            );
            const members = membersInDivision.filter(
              (a) => a.posisi === "Anggota"
            );

            // Sort leaders based on the predefined order
            const sortedLeaders = leaders.sort((a, b) => {
              return (
                posisiList.indexOf(a.posisi) - posisiList.indexOf(b.posisi)
              );
            });

            return (
              <section
                key={divisi}
                className="bg-white rounded-2xl shadow-xl p-8 sm:p-12"
              >
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 border-b pb-4">
                  {divisi}
                </h2>

                {/* Render Leaders */}
                {sortedLeaders.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-10 mb-12">
                    {sortedLeaders.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        isLeader={true}
                      />
                    ))}
                  </div>
                )}

                {/* Render Members */}
                {members.length > 0 && (
                  <>
                    {leaders.length > 0 && (
                      <h3 className="text-2xl font-bold text-center mb-8 text-slate-700">
                        Anggota Divisi
                      </h3>
                    )}
                    {/* MODIFIED: Changed from grid to a centered flex layout */}
                    <div className="flex flex-wrap justify-center gap-8">
                      {members.map((member) => (
                        <MemberCard key={member.id} member={member} />
                      ))}
                    </div>
                  </>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemberList;
