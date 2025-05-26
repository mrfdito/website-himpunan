import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const divisiOptions = [
  "Ketua dan Wakil",
  "Sekretaris Himpunan",
  "Departemen Pendidikan dan IT",
  "Bendahara Himpunan",
  "Departemen Eksternal",
  "Departemen Media Informasi",
  "Departemen Internal",
];

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

const AnggotaForm = ({ fetchAnggota, editingAnggota, setEditingAnggota }) => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [divisi, setDivisi] = useState("");
  const [posisi, setPosisi] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Tambahan state untuk mulai_jabatan dan akhir_jabatan
  const [mulaiJabatan, setMulaiJabatan] = useState("");
  const [akhirJabatan, setAkhirJabatan] = useState("");

  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    if (editingAnggota) {
      setNama(editingAnggota.nama);
      setNim(editingAnggota.nim);
      setDivisi(editingAnggota.divisi);
      setPosisi(editingAnggota.posisi);
      setFotoUrl(editingAnggota.foto_url || "");
      setMulaiJabatan(editingAnggota.mulai_jabatan || "");
      setAkhirJabatan(editingAnggota.akhir_jabatan || "");
    } else {
      setNama("");
      setNim("");
      setDivisi("");
      setPosisi("");
      setFotoUrl("");
      setMulaiJabatan("");
      setAkhirJabatan("");
    }
  }, [editingAnggota]);

  const uploadFoto = async (file) => {
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("anggota-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("anggota-images")
        .getPublicUrl(filePath);
      setFotoUrl(data.publicUrl);
    } catch (error) {
      alert("Error uploading file: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama || !nim || !divisi || !posisi) {
      alert("Semua field wajib diisi kecuali foto.");
      return;
    }

    const data = {
      nama,
      nim: parseInt(nim),
      divisi,
      posisi,
      foto_url: fotoUrl || null,
      mulai_jabatan: mulaiJabatan || null,
      akhir_jabatan: akhirJabatan || null,
    };

    try {
      if (editingAnggota) {
        await supabase.from("anggota").update(data).eq("id", editingAnggota.id);
        setPopupMessage("Berhasil di edit");
      } else {
        await supabase.from("anggota").insert([data]);
        setPopupMessage("Berhasil ditambahkan");
      }
      fetchAnggota();
    } catch (error) {
      alert("Error saving data: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!editingAnggota) return;

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus anggota ${editingAnggota.nama}?`
    );
    if (!confirmDelete) return;

    try {
      if (editingAnggota.foto_url) {
        const url = new URL(editingAnggota.foto_url);
        const paths = url.pathname.split("/");
        const fileName = paths[paths.length - 1];

        const { error: deleteError } = await supabase.storage
          .from("anggota-images")
          .remove([fileName]);

        if (deleteError) {
          console.warn("Gagal hapus foto di storage:", deleteError.message);
        }
      }

      const { error } = await supabase
        .from("anggota")
        .delete()
        .eq("id", editingAnggota.id);

      if (error) throw error;

      alert("Anggota berhasil dihapus");
      fetchAnggota();
      setEditingAnggota(null);
      setNama("");
      setNim("");
      setDivisi("");
      setPosisi("");
      setFotoUrl("");
      setMulaiJabatan("");
      setAkhirJabatan("");
    } catch (error) {
      alert("Error hapus anggota: " + error.message);
    }
  };

  // Tutup popup dan reset form, kembali ke mode tambah
  const closePopup = () => {
    setPopupMessage(null);
    setEditingAnggota(null);
    setNama("");
    setNim("");
    setDivisi("");
    setPosisi("");
    setFotoUrl("");
    setMulaiJabatan("");
    setAkhirJabatan("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
        {/* Judul biasa, hitam bold */}
        <h2 className="text-2xl font-bold text-black">
          {editingAnggota ? "Edit Anggota" : "Tambah Anggota"}
        </h2>

        {/* Label di atas input, input full width */}
        <div>
          <label className="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">NIM</label>
          <input
            type="number"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Divisi</label>
          <select
            value={divisi}
            onChange={(e) => {
              setDivisi(e.target.value);
              setPosisi("");
            }}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Pilih Divisi</option>
            {divisiOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {divisi && (
          <div>
            <label className="block mb-1 font-medium">Posisi</label>
            <select
              value={posisi}
              onChange={(e) => setPosisi(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Pilih Posisi</option>
              {posisiByDivisi[divisi]?.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Tambah mulai_jabatan dan akhir_jabatan */}
        <div>
          <label className="block mb-1 font-medium">Mulai Jabatan</label>
          <input
            type="date"
            value={mulaiJabatan}
            onChange={(e) => setMulaiJabatan(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Akhir Jabatan</label>
          <input
            type="date"
            value={akhirJabatan}
            onChange={(e) => setAkhirJabatan(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Foto (Upload)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                uploadFoto(e.target.files[0]);
              }
            }}
            className="w-full"
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
          {fotoUrl && (
            <img
              src={fotoUrl}
              alt="Preview Foto"
              className="mt-2 max-h-40 rounded"
            />
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={uploading}
          >
            {editingAnggota ? "Update" : "Tambah"}
          </button>

          {editingAnggota && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              disabled={uploading}
            >
              Hapus
            </button>
          )}
        </div>
      </form>

      {/* Popup sukses */}
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OKE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnggotaForm;
