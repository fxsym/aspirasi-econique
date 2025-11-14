import { useEffect, useMemo, useState } from "react"
import HeroImage from "../../images/heroImage.jpg";
import CardDashboard from "../../components/card/CardDashboard";
import LayoutAdmin from "../../layouts/admin/LayoutAdmin";
import { BiCommentError } from "react-icons/bi";
import { FaMapMarkedAlt, FaFileExcel, FaFilter, FaTimes, FaSearch } from "react-icons/fa";
import CardAspiration from "../../components/card/CardAspiration";
import * as XLSX from 'xlsx';
import useApi from "../../../hooks/useApi";

export default function Dashboard() {
    const [filteredAspirations, setFilteredAspirations] = useState([]);
    const [filters, setFilters] = useState({
        site: "",
        destination: "",
        category: "",
        startDate: "",
        endDate: "",
    });
    const [showFilters, setShowFilters] = useState(false);

    const {
        response: responses,
        loading,
        error,
        refetch,
    } = useApi([
        { method: "get", url: "aspirations" },
        { method: "get", url: "destinations" },
    ]);

    const aspirations = useMemo(() => responses?.[0]?.data || [], [responses]);
    const destinations = useMemo(
        () => responses?.[1]?.data?.destinations || [],
        [responses]
    );

    useEffect(() => {
        if (!aspirations) return;
        let filtered = [...aspirations];

        // Filter berdasarkan site
        if (filters.site) {
            filtered = filtered.filter((item) => {
                const siteName = item.site || item.destination?.destination_category?.name;
                return siteName?.toLowerCase().includes(filters.site.toLowerCase());
            });
        }

        // Filter berdasarkan pencarian destinasi
        if (filters.destination) {
            filtered = filtered.filter((item) =>
                item.destination?.name
                    ?.toLowerCase()
                    .includes(filters.destination.toLowerCase())
            );
        }

        if (filters.category) {
            filtered = filtered.filter(
                (item) =>
                    item.aspiration_category?.name?.toLowerCase() ===
                    filters.category.toLowerCase() ||
                    item.custom_category?.toLowerCase() ===
                    filters.category.toLowerCase()
            );
        }

        if (filters.startDate) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.created_at);
                const startDate = new Date(filters.startDate);
                startDate.setHours(0, 0, 0, 0);
                return itemDate >= startDate;
            });
        }

        if (filters.endDate) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.created_at);
                const endDate = new Date(filters.endDate);
                endDate.setHours(23, 59, 59, 999);
                return itemDate <= endDate;
            });
        }

        setFilteredAspirations(filtered);
    }, [filters, aspirations]);

    const resetFilters = () => {
        setFilters({
            site: "",
            destination: "",
            category: "",
            startDate: "",
            endDate: "",
        });
        setFilteredAspirations(aspirations);
    };

    const downloadExcel = () => {
        if (!filteredAspirations || filteredAspirations.length === 0) {
            alert("Tidak ada data untuk diunduh");
            return;
        }

        const excelData = filteredAspirations.map((item, index) => ({
            No: index + 1,
            "Nama Pelapor": item.name || "-",
            "No. Telepon": item.phone || "-",
            Site: item.site || item.destination?.destination_category?.name || "-",
            Kategori:
                item.aspiration_category?.name ||
                item.custom_category ||
                "-",
            "Destinasi": item.destination?.name || "-",
            Lokasi: item.destination?.location || "-",
            Alamat: item.destination?.address || "-",
            "Isi Pengaduan": item.content || "-",
            "Tanggal Dibuat": new Date(item.created_at).toLocaleString("id-ID"),
            "Tanggal Update": item.updated_at
                ? new Date(item.updated_at).toLocaleString("id-ID")
                : "-",
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        ws["!cols"] = [
            { wch: 5 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 25 },
            { wch: 25 },
            { wch: 40 },
            { wch: 50 },
            { wch: 20 },
            { wch: 20 },
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data Aspirasi");

        const filterInfo = [];
        if (filters.site)
            filterInfo.push(`Site-${filters.site.substring(0, 10)}`);
        if (filters.destination)
            filterInfo.push(`Destinasi-${filters.destination.substring(0, 10)}`);
        if (filters.category)
            filterInfo.push(`Kategori-${filters.category.substring(0, 10)}`);
        if (filters.startDate || filters.endDate) {
            const dateRange = `${filters.startDate || "awal"}_${filters.endDate || "akhir"}`;
            filterInfo.push(dateRange);
        }

        const filterSuffix =
            filterInfo.length > 0 ? `_${filterInfo.join("_")}` : "";
        const fileName = `Data_Aspirasi_${new Date()
            .toISOString()
            .split("T")[0]}${filterSuffix}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    // Mengambil unique sites dari item.site atau destination_category.name
    const uniqueSites = useMemo(
        () =>
            aspirations
                ? [
                    ...new Set(
                        aspirations
                            .map((i) => i.site || i.destination?.destination_category?.name)
                            .filter(Boolean)
                    ),
                ].sort()
                : [],
        [aspirations]
    );

    const uniqueDestinations = useMemo(() => {
        if (!aspirations) return [];

        const destinationNames = aspirations
            .map((i) => i.destination?.name)
            .filter(Boolean);

        const unique = [...new Set(destinationNames)].sort();

        console.log('Total aspirasi:', aspirations.length);
        console.log('Aspirasi dengan destinasi:', destinationNames.length);
        console.log('Destinasi unik:', unique.length);
        console.log('Daftar destinasi:', unique);

        return unique;
    }, [aspirations]);

    const uniqueCategories = useMemo(
        () =>
            aspirations
                ? [
                    ...new Set(
                        aspirations
                            .map(
                                (i) =>
                                    i.aspiration_category?.name ||
                                    i.custom_category
                            )
                            .filter(Boolean)
                    ),
                ].sort()
                : [],
        [aspirations]
    );

    const hasActiveFilters =
        filters.site ||
        filters.destination ||
        filters.category ||
        filters.startDate ||
        filters.endDate;

    return (
        <LayoutAdmin>
            <div>
                {/* Hero Section with Gradient Overlay */}
                <div className="relative w-full bg-amber-200 overflow-hidden">
                    <img
                        src={HeroImage}
                        alt=""
                        className="absolute w-full h-full object-cover"
                        style={{
                            objectPosition: "30% center"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

                    <div className="relative z-10 flex justify-center">
                        <div className="text-center py-16 px-4">
                            <p className="font-[Inter] font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2 drop-shadow-lg">
                                Dashboard Admin
                            </p>
                            <p className="font-[Inter] text-sm md:text-base text-gray-200 drop-shadow">
                                Kelola dan monitor aspirasi wisata
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6 md:px-20 w-full">
                    {/* Dashboard Cards with Animation */}
                    <div className="flex flex-col md:flex-row w-full justify-around items-center gap-8">
                        <CardDashboard text={'Total pengaduan saat ini'} info={aspirations?.length || 0} Icon={BiCommentError} />
                        <CardDashboard text={'Total destinasi saat ini'} info={destinations?.length || 0} Icon={FaMapMarkedAlt} />
                    </div>

                    {/* Main Content Section */}
                    <div className="my-6 md:my-10">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <p className="font-[Inter] font-bold text-xl md:text-2xl lg:text-3xl text-accent mb-1">
                                    Data Aspirasi
                                </p>
                                <p className="text-sm text-gray-500">
                                    Daftar pengaduan dan masukan dari masyarakat
                                </p>
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm ${showFilters || hasActiveFilters
                                            ? 'bg-secondary text-white hover:bg-secondary/90 shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <FaFilter className="text-sm" />
                                    <span className="hidden sm:inline">{showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter</span>
                                    <span className="sm:hidden">Filter</span>
                                    {hasActiveFilters && !showFilters && (
                                        <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                            {Object.values(filters).filter(Boolean).length}
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={downloadExcel}
                                    disabled={!filteredAspirations || filteredAspirations.length === 0}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                                >
                                    <FaFileExcel className="text-sm" />
                                    <span className="hidden sm:inline">Download Excel</span>
                                    <span className="sm:hidden">Excel</span>
                                </button>
                            </div>
                        </div>

                        {/* Filter Section with Animation */}
                        <div className={`transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 overflow-hidden'
                            }`}>
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-5 md:p-7 rounded-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-1">Filter & Pencarian</h3>
                                        <p className="text-sm text-gray-500">Saring data sesuai kriteria yang diinginkan</p>
                                    </div>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                                    >
                                        <FaTimes size={18} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {/* Pencarian Destinasi - Full Width */}
                                    <div className="md:col-span-2 lg:col-span-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            🔍 Cari Nama Destinasi
                                        </label>
                                        <div className="relative group">
                                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" />
                                            <input
                                                type="text"
                                                value={filters.destination}
                                                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                                                placeholder="Ketik nama destinasi wisata..."
                                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all bg-white shadow-sm"
                                            />
                                            {filters.destination && (
                                                <button
                                                    onClick={() => setFilters({ ...filters, destination: '' })}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors"
                                                >
                                                    <FaTimes />
                                                </button>
                                            )}
                                        </div>
                                        {filters.destination && (
                                            <p className="text-xs text-secondary mt-2 font-medium animate-fadeIn">
                                                📍 Mencari: "{filters.destination}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Site (Destinasi) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            🏛️ Site
                                        </label>
                                        <select
                                            value={filters.site}
                                            onChange={(e) => setFilters({ ...filters, site: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary bg-white shadow-sm transition-all cursor-pointer"
                                        >
                                            <option value="">Semua Site</option>
                                            {uniqueSites.map((site, idx) => (
                                                <option key={idx} value={site}>{site}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Kategori */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            📂 Kategori
                                        </label>
                                        <select
                                            value={filters.category}
                                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary bg-white shadow-sm transition-all cursor-pointer"
                                        >
                                            <option value="">Semua Kategori</option>
                                            {uniqueCategories.map((category, idx) => (
                                                <option key={idx} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Tanggal Mulai */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            📅 Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            value={filters.startDate}
                                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary shadow-sm transition-all"
                                        />
                                    </div>

                                    {/* Tanggal Akhir */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                                            📅 Tanggal Akhir
                                        </label>
                                        <input
                                            type="date"
                                            value={filters.endDate}
                                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary shadow-sm transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Filter Summary */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm text-gray-600">
                                            Menampilkan
                                            <span className="font-bold text-secondary text-lg mx-1.5">
                                                {filteredAspirations?.length || 0}
                                            </span>
                                            dari
                                            <span className="font-semibold text-gray-800 mx-1.5">
                                                {aspirations?.length || 0}
                                            </span>
                                            data
                                        </div>
                                        {hasActiveFilters && (
                                            <span className="inline-flex items-center px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                                                {Object.values(filters).filter(Boolean).length} Filter Aktif
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={resetFilters}
                                        className="px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                                    >
                                        🔄 Reset Semua Filter
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Tags */}
                        {hasActiveFilters && !showFilters && (
                            <div className="flex flex-wrap gap-2.5 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-fadeIn">
                                <span className="text-sm font-semibold text-gray-700 flex items-center">
                                    Filter aktif:
                                </span>
                                {filters.site && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20 hover:bg-secondary/20 transition-colors">
                                        🏛️ {filters.site}
                                        <button onClick={() => setFilters({ ...filters, site: '' })} className="hover:text-secondary/80">
                                            <FaTimes size={12} />
                                        </button>
                                    </span>
                                )}
                                {filters.destination && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors">
                                        🎯 {filters.destination}
                                        <button onClick={() => setFilters({ ...filters, destination: '' })} className="hover:text-green-800">
                                            <FaTimes size={12} />
                                        </button>
                                    </span>
                                )}
                                {filters.category && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:bg-purple-100 transition-colors">
                                        📂 {filters.category}
                                        <button onClick={() => setFilters({ ...filters, category: '' })} className="hover:text-purple-800">
                                            <FaTimes size={12} />
                                        </button>
                                    </span>
                                )}
                                {(filters.startDate || filters.endDate) && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200 hover:bg-orange-100 transition-colors">
                                        📅 {filters.startDate || '...'} → {filters.endDate || '...'}
                                        <button onClick={() => setFilters({ ...filters, startDate: '', endDate: '' })} className="hover:text-orange-800">
                                            <FaTimes size={12} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Aspirasi Cards */}
                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-20">
                                <div className="relative">
                                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-secondary border-t-transparent absolute top-0"></div>
                                </div>
                                <p className="mt-4 text-gray-500 font-medium">Memuat data aspirasi...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {filteredAspirations && filteredAspirations.length > 0 ? (
                                    filteredAspirations.map((item) => (
                                        <div key={item.id} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ">
                                            <CardAspiration data={item} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                                        <div className="flex flex-col items-center justify-center">
                                            <BiCommentError className="text-gray-300 text-7xl mb-4 animate-pulse" />
                                            <p className="text-gray-600 text-xl font-semibold mb-2">
                                                {aspirations?.length === 0
                                                    ? 'Belum ada data aspirasi'
                                                    : 'Tidak ada data yang sesuai dengan filter'}
                                            </p>
                                            <p className="text-gray-400 text-sm mb-6">
                                                {aspirations?.length === 0
                                                    ? 'Data aspirasi akan muncul di sini'
                                                    : 'Coba ubah atau reset filter untuk melihat data lain'}
                                            </p>
                                            {hasActiveFilters && aspirations?.length > 0 && (
                                                <button
                                                    onClick={resetFilters}
                                                    className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                                                >
                                                    🔄 Reset Filter
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}