import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-gray-100 text-gray-800 py-20 px-8 w-full md:px-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-secondary"
        >
          Tentang Econique
        </motion.h2>

        {/* Deskripsi Perusahaan */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg leading-relaxed text-justify mb-10"
        >
          <strong>Econique - PT Perhutani Alam Wisata (Palawi Risorsis)</strong>{" "}
          merupakan anak perusahaan <strong>Perum Perhutani</strong> yang
          didirikan pada tahun <strong>2002</strong> dan bergerak di bidang
          pariwisata. Econique mengelola berbagai destinasi wisata alam,
          resort, serta biro perjalanan wisata. Saat ini, Econique telah
          mengelola lebih dari <strong>110 lokasi wisata alam Perhutani</strong>{" "}
          yang tersebar dari Jawa Barat hingga Jawa Timur. Dengan pengalaman dan
          komitmen tinggi, Econique berperan aktif dalam mengembangkan sektor
          wisata alam berkelanjutan di Indonesia.
        </motion.p>

        {/* Visi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h3 className="text-2xl font-semibold mb-3 text-secondary">Visi</h3>
          <p className="text-lg leading-relaxed">
            Mengelola portofolio obyek wisata berstandarisasi nasional dengan
            basis kemitraan strategis dan digitalisasi guna meningkatkan
            kepuasan pelanggan dan nilai tambah bagi seluruh mitra.
          </p>
        </motion.div>

        {/* Misi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h3 className="text-2xl font-semibold mb-3 text-secondary">Misi</h3>
          <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
            <li>
              Melakukan optimalisasi usaha terkait jasa lingkungan, sumber daya
              alam serta pemanfaatan aset dengan menerapkan prinsip-prinsip
              kelestarian lingkungan, sinergi, dan alokasi sumber daya secara
              efektif.
            </li>
            <li>
              Memberikan manfaat bagi seluruh pemangku kepentingan
              (stakeholder).
            </li>
          </ul>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <h3 className="text-2xl font-semibold mb-3 text-secondary">
            Tagline
          </h3>
          <p className="text-xl font-bold text-gray-700">
            “Sinergitas, Soliditas, Kualitas”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
