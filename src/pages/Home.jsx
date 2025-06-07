import React from "react";

const Home = () => {
  return (
    <div className="font-sans">
      {/* Hero Section with background image */}
      <section className="relative min-h-[400px] flex items-center justify-center px-6 md:px-20 text-white">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
          alt="Ilmu Komputer"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-4xl text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di Himpunan Mahasiswa Ilmu Komputer
          </h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Tempat berkumpulnya para mahasiswa Ilmu Komputer untuk belajar,
            berkreasi, dan berorganisasi bersama.
          </p>
          <a
            href="#about"
            className="inline-block bg-blue-800 text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* About Section - bg putih, teks biru tua */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20 bg-white text-blue-900"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Tentang Himpunan Kami
        </h2>
        <p className="text-center max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
          Himpunan Mahasiswa Ilmu Komputer Universitas Pertamina merupakan
          organisasi yang bertujuan membangun solidaritas, mengembangkan
          kemampuan akademik, serta memfasilitasi kreativitas mahasiswa Ilmu
          Komputer. Kami rutin mengadakan berbagai kegiatan seperti seminar,
          workshop, lomba, dan pengabdian masyarakat demi meningkatkan kualitas
          dan semangat belajar para anggota.
        </p>
      </section>

      {/* Visi dan Misi Section - bg biru tua, teks putih */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Visi dan Misi
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">Visi</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Menjadi organisasi mahasiswa Ilmu Komputer yang unggul dalam
                pengembangan akademik, kreativitas, dan kontribusi sosial, serta
                mampu mencetak kader-kader profesional di bidang teknologi.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Misi</h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                <li>
                  Mendorong pengembangan ilmu dan teknologi komputer bagi
                  anggota.
                </li>
                <li>
                  Menyelenggarakan kegiatan edukasi dan pengembangan soft skill.
                </li>
                <li>
                  Membangun jaringan yang kuat antar mahasiswa dan alumni.
                </li>
                <li>
                  Berperan aktif dalam kegiatan sosial dan kemasyarakatan.
                </li>
                <li>
                  Menciptakan lingkungan belajar yang suportif dan inklusif.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Himpunan Section - bg putih, teks biru tua */}
      <section className="py-12 bg-white text-blue-900">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Apa Itu Himpunan?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded shadow border border-blue-200 hover:shadow-lg transition cursor-default">
              <h3 className="text-xl font-bold mb-3">Organisasi Mahasiswa</h3>
              <p>
                Himpunan merupakan wadah bagi mahasiswa untuk bersinergi,
                berkolaborasi, dan mengembangkan potensi diri.
              </p>
            </div>
            <div className="p-6 rounded shadow border border-blue-200 hover:shadow-lg transition cursor-default">
              <h3 className="text-xl font-bold mb-3">Kegiatan Rutin</h3>
              <p>
                Meliputi seminar, pelatihan, kompetisi, serta pengabdian
                masyarakat yang mendukung pengembangan keilmuan.
              </p>
            </div>
            <div className="p-6 rounded shadow border border-blue-200 hover:shadow-lg transition cursor-default">
              <h3 className="text-xl font-bold mb-3">Jaringan Profesional</h3>
              <p>
                Memfasilitasi jaringan alumni dan profesional untuk membantu
                karir dan pengalaman mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Contact */}
      <footer className="bg-blue-900 text-white py-10 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {/* Logo */}
          <div className="flex justify-center md:justify-start pl-10">
            <img
              src="/src/assets/logo-footer.png"
              alt="Logo Himpunan"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Alamat */}
          <div>
            <h4 className="text-xl font-semibold mb-2 text-center md:text-left">
              Alamat
            </h4>
            <p className="text-gray-200 leading-relaxed max-w-xs mx-auto md:mx-0">
              Jl. Teuku Nyak Arief, RT.7/RW.8, Simprug, Kec. Kby. Lama, Kota
              Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12220
            </p>
          </div>

          {/* Kontak Kami */}
          <div>
            <h4 className="text-xl font-semibold mb-2 text-center md:text-left">
              Kontak Kami
            </h4>
            <ul className="text-gray-200 space-y-2 max-w-xs mx-auto md:mx-0">
              <li>
                <span className="font-bold">Email:</span>{" "}
                himpunan@ilkom.pertamina.ac.id
              </li>
              <li>
                <span className="font-bold">Instagram:</span> @himpunan_ilkom
              </li>
              <li>
                <span className="font-bold">Telepon:</span> +62 812 3456 7890
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
