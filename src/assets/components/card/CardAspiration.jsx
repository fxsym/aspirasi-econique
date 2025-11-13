
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function CardAspiration({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 bg-secondary">
                    <div>
                        <h3 className="text-lg font-semibold text-primary">
                            {data.name}
                        </h3>
                        <p className="text-sm text-primary">{data.phone}</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col">
                    {/* Image Section */}
                    {data.image && (
                        <div className="mb-3">
                            <img
                                src={data.image}
                                alt="Aspiration"
                                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                    )}

                    <div className="flex items-center text-black text-sm gap-2">
                        <MdCategory className="text-secondary flex-shrink-0" />
                        <span className="font-medium">Kategori:</span>
                        <span className="truncate">{data.aspiration_category?.name || "Tidak diketahui"}</span>
                    </div>

                    <div className="flex items-center text-black text-sm gap-2">
                        <FaMapMarkerAlt className="text-secondary flex-shrink-0" />
                        <span className="font-medium">Destinasi:</span>
                        <span className="truncate">{data.destination?.name || "Tidak diketahui"}</span>
                    </div>

                    <p className="text-black text-sm leading-relaxed border-l-4 border-secondary/80 pl-3 flex-1 line-clamp-3">
                        {data.content}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t text-xs text-primary mt-auto">
                        <div className="flex items-center gap-1 text-accent">
                            <FiCalendar className="flex-shrink-0" />
                            <span className="whitespace-nowrap">{new Date(data.created_at).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}</span>
                        </div>
                        <span className="bg-secondary font-medium px-2 py-1 rounded-full text-xs truncate max-w-[120px]">
                            {data.aspiration_category?.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal untuk gambar full */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <IoClose size={32} />
                        </button>
                        <img
                            src={data.image}
                            alt="Aspiration Full"
                            className="w-full h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}