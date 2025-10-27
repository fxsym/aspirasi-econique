import DestinationsMainSection from "../components/DestinationMainSeaction";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PageHeader from "../components/PageHeader";

export default function HomePage() {
    return (
        <div>
            <HeroSection></HeroSection>
            <PageHeader title={'Pengaduan Destinasi Kami'} slogan={'Nikmati Setiap Momen, \nCiptakan Kenangan.'} />
            <DestinationsMainSection />
            <Footer />
        </div>
    )
}