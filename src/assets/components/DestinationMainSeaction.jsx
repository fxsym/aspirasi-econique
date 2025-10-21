import { useEffect, useState } from "react"
import { getDestinations } from "../api/Destinations";
import { Link } from "react-router-dom";
import { generateSlug } from "../utils/utils";

export default function DestinationsMainSection() {
    const [destinations, setDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDestinations = async () => {
        setLoading(true);
        setErrors(null);
        try {
            const response = await getDestinations();
            const data = response.data.destinations;
            console.log(data);
            setDestinations(data);
            setFilteredDestinations(data); // tampilkan semua saat awal
        } catch (err) {
            console.error(err);
            setErrors(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    // Filter berdasarkan keyword
    useEffect(() => {
        if (!keyword.trim()) {
            setFilteredDestinations(destinations);
            return;
        }

        const lowerKeyword = keyword.toLowerCase();
        const filtered = destinations.filter(item =>
            item.name.toLowerCase().includes(lowerKeyword) ||
            item.location.toLowerCase().includes(lowerKeyword)
        );

        setFilteredDestinations(filtered);
    }, [keyword, destinations]);

    return (
        <div className="pt-10 px-8 py-2 md:px-20 md:py-4 w-full">
            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-3 border-2 border-secondary rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                    placeholder="🔍 Cari destinasi wisata..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            {loading && <p className="text-center text-gray-500">Memuat destinasi...</p>}
            {errors && <p className="text-center text-red-500">Terjadi kesalahan saat memuat data.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((destination) => (
                        <div
                            key={destination.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Gambar Utama */}
                            <div className="relative w-full h-48">
                                <img
                                    src={destination.main_image_url}
                                    alt={destination.name}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow">
                                    {destination.destination_category}
                                </span>
                            </div>

                            {/* Konten */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                    {destination.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                    📍 {destination.location}
                                </p>

                                <Link to={`/destination/${destination.slug}`}>
                                    <button  className="mt-4 w-full bg-secondary text-white text-sm font-medium py-2 rounded-lg hover:bg-secondary/80 transition cursor-pointer">
                                        Lihat Detail
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-center col-span-full text-gray-500">Destinasi tidak ditemukan.</p>
                )}
            </div>
        </div>
    );
}
