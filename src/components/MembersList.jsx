import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

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

const MemberList = () => {
  const [anggota, setAnggota] = useState([]);

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

  useEffect(() => {
    fetchAnggota();
  }, []);

  const groupedByDivisi = anggota.reduce((acc, item) => {
    if (!acc[item.divisi]) acc[item.divisi] = [];
    acc[item.divisi].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-center">
      {Object.entries(posisiByDivisi).map(([divisi, posisiList]) => (
        <section key={divisi} className="mb-16">
          <h2 className="text-3xl font-extrabold mb-10 text-gray-900">
            {divisi}
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {posisiList.map((posisi) => {
              const anggotaPosisi =
                groupedByDivisi[divisi]?.filter((a) => a.posisi === posisi) ||
                [];

              return anggotaPosisi.map((a) => (
                <div
                  key={a.id}
                  className="w-64 bg-white rounded-xl border border-gray-200 shadow-md p-6
                             flex flex-col items-center transition-transform duration-300
                             hover:scale-105 hover:shadow-lg"
                >
                  {a.foto_url ? (
                    <img
                      src={a.foto_url}
                      alt={a.nama}
                      className="w-32 h-32 rounded-full object-cover mb-5 border-2 border-indigo-400"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-lg mb-5 border-2 border-gray-300">
                      No Photo
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-gray-900">
                    {a.nama}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{a.nim}</p>
                  <p className="mt-2 text-indigo-600 font-medium">{a.posisi}</p>
                </div>
              ));
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MemberList;
