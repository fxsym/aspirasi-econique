import AboutSection from "../components/AboutSection";
import BanyumasClusterSection from "../components/BanyumasClusterSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function HomePage() {
    return (
        <div>
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <AboutSection />
            <BanyumasClusterSection />
        </div>
    )
}