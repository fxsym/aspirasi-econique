import { FaUserCircle } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

export default function CardAspiration({ data }) {
    return (
        <div className="bg-white shadow-lg hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden ">
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
            <div className="p-4 space-y-3">
                <div className="flex items-center text-black text-sm gap-2">
                    <MdCategory className="text-secondary" />
                    <span className="font-medium">Kategori:</span>
                    <span>{data.aspiration_category?.name || "Tidak diketahui"}</span>
                </div>

                <div className="flex items-center text-black text-sm gap-2">
                    <FaMapMarkerAlt className="text-secondary" />
                    <span className="font-medium">Destinasi:</span>
                    <span>{data.destination?.name || "Tidak diketahui"}</span>
                </div>

                <p className="text-black text-sm leading-relaxed border-l-4 border-secondary/80 pl-3">
                    {data.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-t text-xs text-primary">
                    <div className="flex items-center gap-1 text-accent">
                        <FiCalendar />
                        <span>{new Date(data.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}</span>
                    </div>
                    <span className="bg-secondary font-medium px-2 py-1 rounded-full">
                        {data.aspiration_category?.name}
                    </span>
                </div>
            </div>
        </div>
    );
}
