import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const EventForm = ({ fetchEvents, editingEvent, setEditingEvent }) => {
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "",
    lokasi: "",
    gambar_url: "",
    keterangan: "",
  });

  const [uploading, setUploading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null); // Changed from showToast/toastMessage

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    } else {
      setFormData({
        judul: "",
        deskripsi: "",
        tanggal: "",
        lokasi: "",
        gambar_url: "",
        keterangan: "",
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const publicUrl = `https://vecmkpzhniqptmhpfuju.supabase.co/storage/v1/object/public/event-images/${filePath}`;
      setFormData((prev) => ({ ...prev, gambar_url: publicUrl }));
    } catch (err) {
      alert("Upload gagal: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) {
      alert("Tunggu proses upload selesai.");
      return;
    }

    // Basic validation
    if (!formData.judul || !formData.deskripsi || !formData.tanggal) {
      alert("Judul, deskripsi, dan tanggal wajib diisi.");
      return;
    }

    try {
      if (editingEvent) {
        await supabase.from("event").update(formData).eq("id", editingEvent.id);
        setPopupMessage("Event berhasil diperbarui!");
      } else {
        await supabase.from("event").insert([formData]);
        setPopupMessage("Event berhasil ditambahkan!");
      }
      fetchEvents();
    } catch (error) {
      alert("Error saving data: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!editingEvent) return;

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus event "${editingEvent.judul}"?`
    );
    if (!confirmDelete) return;

    try {
      // Delete image from storage if it exists
      if (editingEvent.gambar_url) {
        const url = new URL(editingEvent.gambar_url);
        const paths = url.pathname.split("/");
        const fileName = paths[paths.length - 1];

        const { error: deleteError } = await supabase.storage
          .from("event-images")
          .remove([fileName]);

        if (deleteError) {
          console.warn("Gagal hapus gambar di storage:", deleteError.message);
        }
      }

      const { error } = await supabase
        .from("event")
        .delete()
        .eq("id", editingEvent.id);

      if (error) throw error;

      alert("Event berhasil dihapus");
      fetchEvents();
      setEditingEvent(null);
      setFormData({
        judul: "",
        deskripsi: "",
        tanggal: "",
        lokasi: "",
        gambar_url: "",
        keterangan: "",
      });
    } catch (error) {
      alert("Error hapus event: " + error.message);
    }
  };

  // Close popup and reset form, return to add mode
  const closePopup = () => {
    setPopupMessage(null);
    setEditingEvent(null);
    setFormData({
      judul: "",
      deskripsi: "",
      tanggal: "",
      lokasi: "",
      gambar_url: "",
      keterangan: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
        {/* Judul biasa, hitam bold */}
        <h2 className="text-2xl font-bold text-black">
          {editingEvent ? "Edit Event" : "Tambah Event"}
        </h2>

        {/* Judul */}
        <div>
          <label htmlFor="judul" className="block mb-1 font-medium">
            Judul
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            value={formData.judul}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="deskripsi" className="block mb-1 font-medium">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full border rounded p-2 h-24 resize-y"
            required
          ></textarea>
        </div>

        {/* Tanggal */}
        <div>
          <label htmlFor="tanggal" className="block mb-1 font-medium">
            Tanggal
          </label>
          <input
            id="tanggal"
            name="tanggal"
            type="date"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Lokasi */}
        <div>
          <label htmlFor="lokasi" className="block mb-1 font-medium">
            Lokasi
          </label>
          <input
            id="lokasi"
            name="lokasi"
            type="text"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Keterangan */}
        <div>
          <label htmlFor="keterangan" className="block mb-1 font-medium">
            Keterangan
          </label>
          <textarea
            id="keterangan"
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="w-full border rounded p-2 h-20 resize-y"
          ></textarea>
        </div>

        {/* Upload Gambar */}
        <div>
          <label htmlFor="gambar_file" className="block mb-1 font-medium">
            Gambar (Upload)
          </label>
          <input
            id="gambar_file"
            name="gambar_file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
          {formData.gambar_url && (
            <img
              src={formData.gambar_url}
              alt="Preview Gambar"
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
            {editingEvent ? "Update" : "Tambah"}
          </button>

          {editingEvent && (
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

export default EventForm;
