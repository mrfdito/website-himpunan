import React from "react";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 min-h-[400px] flex items-center justify-center px-6 md:px-20 text-white">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
          alt="Ilmu Komputer"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Konten Teks */}
        <div className="relative max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di Himpunan Mahasiswa Ilmu Komputer
          </h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Tempat berkumpulnya para mahasiswa Ilmu Komputer untuk belajar,
            berkreasi, dan berorganisasi bersama.
          </p>
          <a
            href="#about"
            className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-700">
          Tentang Himpunan Kami
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-700 leading-relaxed text-base md:text-lg">
          Himpunan Mahasiswa Ilmu Komputer Universitas Pertamina merupakan
          organisasi yang bertujuan membangun solidaritas, mengembangkan
          kemampuan akademik, serta memfasilitasi kreativitas mahasiswa Ilmu
          Komputer. Kami rutin mengadakan berbagai kegiatan seperti seminar,
          workshop, lomba, dan pengabdian masyarakat demi meningkatkan kualitas
          dan semangat belajar para anggota.
        </p>
      </section>

      {/* Himpunan Section */}
      <section className="bg-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-semibold mb-8 text-center text-purple-700">
            Apa Itu Himpunan?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Organisasi Mahasiswa</h3>
              <p className="text-gray-600">
                Himpunan merupakan wadah bagi mahasiswa untuk bersinergi,
                berkolaborasi, dan mengembangkan potensi diri.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Kegiatan Rutin</h3>
              <p className="text-gray-600">
                Meliputi seminar, pelatihan, kompetisi, serta pengabdian
                masyarakat yang mendukung pengembangan keilmuan.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Jaringan Profesional</h3>
              <p className="text-gray-600">
                Memfasilitasi jaringan alumni dan profesional untuk membantu
                karir dan pengalaman mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20 bg-purple-50 rounded-lg shadow-lg my-16"
      >
        <h2 className="text-3xl font-semibold mb-10 text-center text-purple-700">
          Kontak Kami
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-700 leading-relaxed text-base md:text-lg mb-12">
          Untuk informasi lebih lanjut, silakan hubungi kami melalui email atau
          media sosial berikut.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center">
            <div className="text-purple-600 text-5xl mb-4">📧</div>
            <h3 className="font-bold text-xl mb-2">Email</h3>
            <p className="text-gray-600 break-all">
              himpunan@ilkom.pertamina.ac.id
            </p>
          </div>

          {/* Instagram Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center">
            <div className="text-purple-600 text-5xl mb-4">📸</div>
            <h3 className="font-bold text-xl mb-2">Instagram</h3>
            <p className="text-gray-600">@himpunan_ilkom</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center">
            <div className="text-purple-600 text-5xl mb-4">📞</div>
            <h3 className="font-bold text-xl mb-2">Telepon</h3>
            <p className="text-gray-600">+62 812 3456 7890</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6 text-center">
        &copy; 2025 Himpunan Mahasiswa Ilmu Komputer Universitas Pertamina. All
        rights reserved.
      </footer>
    </div>
  );
};

export default Home;
