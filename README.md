# 🌐 Website Himpunan

Website Himpunan adalah aplikasi web yang dikembangkan menggunakan **React** dan **Supabase** untuk memudahkan manajemen data organisasi himpunan, seperti keanggotaan, kegiatan, dan dokumentasi.

---

## 🚀 Fitur Utama

- **Manajemen Anggota**: Menambahkan, mengedit, dan menghapus data anggota.
- **Pengelolaan Kegiatan**: Mencatat dan mengelola kegiatan organisasi.
- **Integrasi Supabase**: Menggunakan Supabase sebagai backend untuk autentikasi dan penyimpanan data.
- **Antarmuka Responsif**: Desain yang responsif untuk berbagai ukuran layar.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Backend**: [Supabase](https://supabase.com/)
- **Styling**: CSS
- **Linting**: ESLint

---

## 🧪 Fitur Tambahan (Opsional)

- **Login Admin**: Autentikasi login berbasis Supabase.
- **CRUD Event & Anggota**: Dashboard admin dapat mengelola data.
- **Struktur Divisi**: Anggota dibagi dalam 7 divisi berbeda.
- **Tampilan Responsif**: Dapat diakses dari berbagai perangkat.

### 1. Klon repositori ini
```bash
git clone https://github.com/mrfdito/website-himpunan.git
cd website-himpunan
```

### 2. Instal dependensi
```
npm install
```

### 3. Konfigurasi file .env
```
Buat file .env di root berdasarkan file .env.example
```
```
Masukkan kredensial Supabase milikmu:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Jalankan aplikasi
```
npm run dev
```


