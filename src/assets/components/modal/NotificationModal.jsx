import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function NotificationModal({ notification, setNotification }) {
    const closeModal = () => setNotification("");

    // Tentukan apakah status termasuk sukses atau gagal
    const isSuccess = notification === 200 || notification === 201;

    // Tentukan pesan otomatis berdasarkan kode status
    const getMessage = (code) => {
        switch (code) {
            case 200:
            case 201:
                return "Data berhasil disimpan!";
            case 400:
                return "Permintaan tidak valid. Periksa kembali input Anda.";
            case 401:
                return "Anda tidak memiliki izin untuk melakukan aksi ini.";
            case 404:
                return "Data yang diminta tidak ditemukan.";
            case 500:
                return "Terjadi kesalahan pada server. Coba lagi nanti.";
            case "network_error":
                return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti.";
            default:
                return "Terjadi kesalahan yang tidak diketahui."
        }
    };


    return (
        <div className="relative">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-20 flex items-center justify-center bg-black/30"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center">
                            {isSuccess ? (
                                <CheckCircle className="text-green-500 mx-auto w-12 h-12" />
                            ) : (
                                <XCircle className="text-red-500 mx-auto w-12 h-12" />
                            )}

                            <h2 className="text-lg font-semibold mt-3 text-gray-800 dark:text-white">
                                {isSuccess ? "Berhasil!" : "Gagal!"}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                {getMessage(notification)}
                            </p>

                            <button
                                onClick={closeModal}
                                className={`mt-5 px-5 py-2 rounded-xl font-medium text-white ${isSuccess
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                Tutup
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
