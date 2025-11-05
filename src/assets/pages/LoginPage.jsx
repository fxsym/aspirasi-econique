import FormLogin from "../components/FormLogin";
import HeroImage from "../images/heroImage.jpg";

export default function LoginPage() {
    return (
        <section className="relative h-screen w-full overflow-hidden" id="home">
            {/* Background image dengan efek zoom */}
            <div className="absolute inset-0">
                <img
                    src={HeroImage}
                    alt="Hero"
                    className="w-full h-full object-cover transition-transform duration-200 ease-out"
                    style={{
                        objectPosition: "30% center"
                    }}
                />

                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-row items-center justify-center text-center md:text-left">
                    <FormLogin />
            </div>
        </section>
    )
}