import ContactSection from "../components/ContactSection";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";

export default function ContactPage () {
    return (
        <div>
            <Navbar />
            <PageHeader title={'Kontak Kami'} slogan={'Selangkah Lebih Dekat, \nJelajahi Lebih Banyak Cerita.'} />
            <ContactSection />
        </div>
    )
}