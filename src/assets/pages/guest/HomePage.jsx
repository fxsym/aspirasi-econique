import HeroSection from "../../components/section/HeroSection";
import DestinationsMainSection from "../../components/section/DestinationMainSeaction";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

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