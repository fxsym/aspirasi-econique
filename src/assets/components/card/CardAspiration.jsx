import { useState } from "react";
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdCategory, MdDelete, MdImage } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { IoClose, IoExpand } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";
import ConfirmModal from "../modal/ConfirmModal";
import useApi from "../../../hooks/useApi";
import useNotification from "../../../hooks/useNotification";

export default function CardAspiration({ data, onDeleted }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
    
    const notify = useNotification()

    const {
        loading: deleteLoading,
        error: errorLoading,
        execute: deleteAspiration
    } = useApi({
        method: "delete", url: `aspirations/${data.id}`
    }, {autoFetch: false})

    const onDelete = async (id) => {
        console.log(id)

        try {
            const res = await deleteAspiration()
            console.log(res)
            notify(res.status, {
                succesMessage: "Aspirasi berhasil dihapus!"
            });
            onDeleted()
        } catch (err) {
            console.error(err)
            notify(err.response?.status || "network_error");
        }
    }

    return (
        <>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                {/* Image Section - Prominent */}
                <div className="relative group overflow-hidden h-64">
                    {data.image ? (
                        <>
                            <img
                                src={data.image}
                                alt="Aspiration"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <MdImage className="text-gray-300 text-6xl mx-auto mb-2" />
                                <p className="text-gray-400 text-sm font-medium">Tidak ada foto</p>
                            </div>
                        </div>
                    )}

                    {/* Category Badge on Image */}
                    <div className="absolute top-3 left-3">
                        <span className="bg-secondary/95 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                            <MdCategory />
                            {data.site || "Lainnya"}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-4 flex-1 flex flex-col">
                    {/* Location - Prominent */}
                    <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-secondary p-2.5 rounded-lg flex-shrink-0 shadow-sm">
                                <HiLocationMarker className="text-white text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                                    Lokasi Destinasi
                                </p>
                                <p className="text-base font-bold text-gray-800 leading-tight">
                                    {data.destination?.name || "Destinasi tidak diketahui"}
                                </p>
                                {data.destination?.location && (
                                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                                        <FaMapMarkerAlt className="text-secondary flex-shrink-0" />
                                        {data.destination.location}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Aspiration Content - Prominent */}
                    <div className="flex-1">
                        <div className="bg-secondary/5 border-l-4 border-secondary rounded-r-lg p-4 shadow-sm">
                            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">
                                Isi Aspirasi
                            </p>
                            <p className="text-gray-800 text-sm leading-relaxed line-clamp-4">
                                {data.content || "Tidak ada keterangan"}
                            </p>
                        </div>
                    </div>

                    {/* Reporter Info */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-200">
                        <div className="flex items-center gap-2.5 text-sm">
                            <div className="bg-secondary p-2 rounded-lg">
                                <FaUserCircle className="text-white text-lg" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Pelapor</p>
                                <p className="font-semibold text-gray-800 truncate">{data.name}</p>
                            </div>
                        </div>

                        {data.phone && (
                            <div className="flex items-center gap-2.5 text-sm pt-2 border-t border-gray-200">
                                <div className="bg-secondary/80 p-2 rounded-lg">
                                    <FaPhoneAlt className="text-white text-sm" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 font-medium">Kontak</p>
                                    <p className="font-semibold text-gray-800">{data.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer with Date */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FiCalendar className="text-secondary flex-shrink-0" />
                            <span className="font-medium">
                                {new Date(data.created_at).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {data.site && (
                                <span className="bg-secondary/10 text-secondary font-semibold px-3 py-1.5 rounded-full text-xs border border-secondary/20">
                                    {data.aspiration_category?.name}
                                </span>
                            )}
                            <MdDelete
                                onClick={() => {
                                    setSelectedId(data.id);
                                    setShowConfirm(true);
                                }}
                                className="text-3xl text-red-600 hover:cursor-pointer "
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Modal Delet */}
            <ConfirmModal
                show={showConfirm}
                title="Konfirmasi Hapus"
                message="Apakah Anda yakin ingin menghapus aspirasi ini?"
                onCancel={() => setShowConfirm(false)}
                onConfirm={() => {
                    onDelete(selectedId);
                    setShowConfirm(false);
                }}
            />

            {/* Modal untuk gambar full */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-6xl max-h-[90vh] w-full animate-scaleIn">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-12 right-0 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all p-2 rounded-full"
                        >
                            <IoClose size={28} />
                        </button>
                        <img
                            src={data.image}
                            alt="Aspiration Full"
                            className="w-full h-full object-contain rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                            <p className="text-white font-semibold text-lg mb-1">
                                {data.destination?.name}
                            </p>
                            <p className="text-gray-300 text-sm">
                                {data.name} • {new Date(data.created_at).toLocaleDateString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}