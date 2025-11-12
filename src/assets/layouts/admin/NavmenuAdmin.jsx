import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { TbLayoutDashboard } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidObjectsHorizontalCenter } from "react-icons/bi";
import useApi from "../../../hooks/useApi";

export default function NavmenuAdmin({ isOpen, onClose }) {
    const navigate = useNavigate()
    const {
        execute: logout,
        loading,
        error
    }
 = useApi({method: "post", url: "auth/logout"}, {autoFetch: false})

    const handleClick = async () => {

        try {
            const response = await logout()

            console.log(response)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key="navmenu"
                    initial={{ x: "-100%" }}   // posisi awal di kiri
                    animate={{ x: 0 }}         // slide masuk
                    exit={{ x: "-100%" }}      // slide keluar ke kiri lagi
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ backgroundColor: "#1E828F" }} // 🎨 warna kustom sidebar
                    className="fixed top-0 left-0 z-50 w-full h-screen text-white flex flex-col shadow-lg md:w-75 md:relative"
                >
                    {/* Header Close Button */}
                    <div className="flex justify-end p-4">
                        <IoClose
                            size={32}
                            onClick={onClose}
                            className="cursor-pointer text-white hover:text-red-500 transition-colors duration-300"
                        />
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-4 p-6 text-base font-semibold justify-between h-full">
                        <div>
                            <Link
                                to="/dashboard"
                                className="mb-4 flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
                            >
                                <TbLayoutDashboard size={24} />
                                <p>Dashboard</p>
                            </Link>

                            <Link
                                to="/orders/create"
                                className="mb-4 flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
                            >
                                <BiSolidObjectsHorizontalCenter size={24} />
                                <p>Kelola Wisata</p>
                            </Link>
                        </div>

                        <button
                            className="flex items-center gap-3 cursor-pointer hover:text-yellow-300 transition-colors"
                            onClick={handleClick}
                        >
                            <LuLogOut size={24} />
                            <p>Logout</p>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
