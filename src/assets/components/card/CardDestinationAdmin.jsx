import { Link } from "react-router-dom";

export default function CardDestinationAdmin({destination}) {
    return (
        <div
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            {/* Gambar Utama */}
            <div className="relative w-full h-48">
                <img
                    src={destination?.main_image_url}
                    alt={destination?.name}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {destination?.destination_category}
                </span>
            </div>

            {/* Konten */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {destination?.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    📍 {destination?.location}
                </p>

                <Link to={`/admin/destination/${destination?.slug}`}>
                    <button className="mt-4 w-full bg-secondary text-white text-sm font-medium py-2 rounded-lg hover:bg-secondary/80 transition cursor-pointer">
                        Kelola Wisata
                    </button>
                </Link>
            </div>
        </div>
    )
}