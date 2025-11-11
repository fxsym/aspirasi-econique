import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import  image  from "../../images/logoEconique.png"

export default function NavbarAdmin({ showSidebar, setShowSidebar }) {

    return (
        <nav className="flex justify-between items-center py-3 px-6 bg-background transition-all duration-500">
            {/* Tombol sidebar */}
            <FiMenu
                size={30}
                onClick={() => setShowSidebar(!showSidebar)}
                className="hover:text-primary cursor-pointer"
            />

            {/* Profil */}
            <div className="flex items-center gap-4">

                <span className="font-bold">Econique</span>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <img src={image} alt="Foto Profil" className="w-full h-full object-cover" />
                </div>

            </div>

        </nav>
    );
}
