import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-secondary text-primary mt-4">
            {/* BAGIAN CONTACT + MAP + SOSMED */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Contact Column */}
                <div className="space-y-5 text-sm leading-relaxed md:order-2">
                    <h4 className="font-semibold text-lg mb-3">Informasi Kontak</h4>

                    <div className="flex items-start gap-3">
                        <FiMapPin className="text-xl shrink-0" />
                        <span>M6PM+X39, Dusun III Berubahan, Kemutug Lor, Kec. Baturaden, Kabupaten Banyumas, Jawa Tengah 53151</span>
                    </div>

                    <div className="flex items-start gap-3">
                        <FiMail className="text-xl shrink-0" />
                        <span>sales.baturraden@mypalawi.com</span>
                    </div>

                    <div className="flex items-start gap-3">
                        <FiPhone className="text-xl shrink-0" />
                        <span>0281 681616</span>
                    </div>

                    {/* Follow Us */}
                    <div className="mt-6">
                        <h4 className="font-semibold text-lg mb-3">Ikuti Sosial Media Kami</h4>
                        <div className="flex items-center gap-5 text-2xl">
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaWhatsapp /></a>
                        </div>
                    </div>
                </div>


                {/* Map Column */}
                <div className="rounded-xl overflow-hidden shadow-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3670837651493!2d109.23014847532082!3d-7.312594592695375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ff4fe4aefffe9%3A0xbff73adf6842193c!2sPalawi%20Klaster%20Banyumas!5e0!3m2!1sid!2sid!4v1761529466911!5m2!1sid!2sid"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </footer>
    )
}