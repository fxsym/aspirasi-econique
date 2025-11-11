import { motion } from "framer-motion";
import wisataBanyumas from "../images/wisataBanyumas.png"; // opsional: tambahkan gambar ilustrasi

export default function BanyumasClusterSection() {
    return (
        <section
            id="banyumas"
            className="bg-white text-gray-800 py-20 px-6 md:px-20"
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                {/* Gambar Ilustrasi */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2"
                >
                    <img
                        src={wisataBanyumas}
                        alt="Klaster Banyumas"
                        className="rounded-2xl shadow-lg object-cover w-full aspect-[16/9]"
                    />
                </motion.div>

                {/* Deskripsi Klaster */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-5">
                        Klaster Banyumas
                    </h2>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <strong>Klaster Banyumas</strong> merupakan salah satu klaster di bawah
                        naungan <strong>Econique – PT Perhutani Alam Wisata (Palawi Risorsis) </strong>
                        yang berfokus pada pengelolaan dan pengembangan destinasi wisata alam di
                        wilayah <strong>Banyumas dan sekitarnya</strong>.
                        Klaster ini berperan penting dalam menjaga keindahan alam, meningkatkan
                        kesejahteraan masyarakat lokal, serta memperkuat sektor pariwisata berbasis
                        keberlanjutan.
                    </p>
                    <p className="text-lg leading-relaxed text-justify">
                        Dengan berbagai destinasi unggulan seperti wisata alam Baturraden,
                        curug-curug eksotis, serta kawasan hutan wisata edukatif, Klaster Banyumas
                        berkomitmen untuk menghadirkan pengalaman wisata yang ramah lingkungan,
                        edukatif, dan memberikan nilai tambah bagi masyarakat serta pelaku wisata.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
