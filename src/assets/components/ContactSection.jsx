import { FiMapPin, FiMail, FiPhone, FiTwitter, FiFacebook } from "react-icons/fi";
import { FaInstagram, FaWhatsapp, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import ContactCard from "./ContactCard";

export default function ContactSection() {
    return (
        <section className="flex w-full">
            {/* BAGIAN CONTACT + MAP + SOSMED */}
            <div className="pt-10 px-8 py-2 md:px-20 md:py-4 w-full">
                {/* Map Column */}
                <p className="font-bold pb-4 text-xl">Lokasi Kami</p>
                <div className="rounded-xl overflow-hidden shadow-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3670837651493!2d109.23014847532082!3d-7.312594592695375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ff4fe4aefffe9%3A0xbff73adf6842193c!2sPalawi%20Klaster%20Banyumas!5e0!3m2!1sid!2sid!4v1761529466911!5m2!1sid!2sid"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                {/* Contact Card */}
                <p className="font-bold py-4 text-xl">Informasi Kontak</p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <ContactCard Icon={FiMail} title={"Email"} desc={"sales.baturraden@mypalawi.com"} link={"https://instagram.com/wisataalambanyumas"}/>
                    <ContactCard Icon={FiPhone} title={"Telephone"} desc={"0281 681616"} link={"https://instagram.com/wisataalambanyumas"}/>
                    <ContactCard Icon={FaWhatsapp} title={"Whatsapp"} desc={"081327744555"} link={"https://instagram.com/wisataalambanyumas"}/>
                    <ContactCard Icon={FiTwitter} title={"Twitter"} desc={"@wisataalambanyumas"} link={"https://instagram.com/wisataalambanyumas"}/>
                    <ContactCard Icon={FiFacebook} title={"Facebook"} desc={"@wisataalambanyumas"} link={"https://instagram.com/wisataalambanyumas"}/>
                </div>
            </div>
        </section>
    )
}