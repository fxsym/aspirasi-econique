import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiInstagram } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import Logo from "../images/logoEconique.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);

      const sections = ["home", "about", "works", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -110 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white shadow-md px-8 py-2 md:px-20 md:py-4 w-full z-50 fixed top-0 left-0"
    >
      <div className="flex items-center justify-between">
        {/* ✅ Gabungkan logo + teks di satu div */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
          <img
            src={Logo}
            alt="Logo Econique"
            className="w-16 h-16 md:w-24 md:h-24 object-contain"
          />
        </div>

        {/* Tombol menu mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-8 h-8" color="#868686" />
            ) : (
              <Menu className="w-6 h-6" color="#868686" />
            )}
          </button>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex md:items-center md:justify-end">
          <ul className="flex gap-10 font-semibold text-[16px] text-[#868686] font-[Inter]">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`hover:text-[#00ADB5] cursor-pointer transition-colors duration-300 ${
                    activeSection === item.id ? "text-[#00ADB5]" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden min-h-screen flex flex-col items-center justify-center gap-2 bg-white absolute left-0 right-0 top-full pt-10 pb-20"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block text-[18px] py-4 transition-colors duration-300 w-full text-center font-[Inter] font-semibold ${
                  activeSection === item.id
                    ? "text-[#00ADB5]"
                    : "text-[#868686] hover:text-[#00ADB5]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-5 items-center mt-10">
              <a
                href="https://www.instagram.com/agus_phto?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                <SiInstagram className="w-7 h-7" color="#868686" />
              </a>
              <a
                href="mailto:aguswidodo1197@gmail.com"
                className="p-3 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                <MdOutlineEmail className="w-8 h-8" color="#868686" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
