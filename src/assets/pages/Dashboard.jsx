import { useEffect, useState } from "react"
import { getAspirations } from "../api/Aspirations"
import HeroImage from "../images/heroImage.jpg";
import { getDestinations } from "../api/Destinations";
import CardDashboard from "../components/CardDashboard";
import { BiCommentError } from "react-icons/bi";
import { FaMapMarkedAlt, FaFileExcel, FaFilter, FaTimes } from "react-icons/fa";
import CardAspiration from "../components/CardAspiration";
import * as XLSX from 'xlsx';

export default function Dashboard() {
    const [aspirations, setAspirations] = useState(null)
    const [filteredAspirations, setFilteredAspirations] = useState(null)
    const [destinations, setDestinations] = useState(null)
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    // State untuk filter
    const [filters, setFilters] = useState({
        location: '',
        category: '',
        startDate: '',
        endDate: ''
    })
    const [showFilters, setShowFilters] = useState(false)

    const fetchAspirations = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAspirations()
            setAspirations(response.data)
            setFilteredAspirations(response.data)
            console.log(response);
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchDestinations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDestinations();
            const data = response.data.destinations;
            setDestinations(data);
            setFilteredDestinations(data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk filter aspirasi
    const applyFilters = () => {
        if (!aspirations) return;

        let filtered = [...aspirations];

        // Filter berdasarkan lokasi
        if (filters.location) {
            filtered = filtered.filter(item => 
                item.destination?.location?.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        // Filter berdasarkan kategori
        if (filters.category) {
            filtered = filtered.filter(item => 
                item.aspiration_category?.name?.toLowerCase() === filters.category.toLowerCase() ||
                item.custom_category?.toLowerCase() === filters.category.toLowerCase()
            );
        }

        // Filter berdasarkan tanggal mulai
        if (filters.startDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.created_at);
                const startDate = new Date(filters.startDate);
                startDate.setHours(0, 0, 0, 0);
                return itemDate >= startDate;
            });
        }

        // Filter berdasarkan tanggal akhir
        if (filters.endDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.created_at);
                const endDate = new Date(filters.endDate);
                endDate.setHours(23, 59, 59, 999);
                return itemDate <= endDate;
            });
        }

        setFilteredAspirations(filtered);
    }

    // Reset filter
    const resetFilters = () => {
        setFilters({
            location: '',
            category: '',
            startDate: '',
            endDate: ''
        });
        setFilteredAspirations(aspirations);
    }

    // Fungsi untuk download Excel
    const downloadExcel = () => {
        if (!filteredAspirations || filteredAspirations.length === 0) {
            alert('Tidak ada data untuk diunduh');
            return;
        }

        // Format data untuk Excel
        const excelData = filteredAspirations.map((item, index) => ({
            'No': index + 1,
            'Nama Pelapor': item.name || '-',
            'No. Telepon': item.phone || '-',
            'Kategori': item.aspiration_category?.name || item.custom_category || '-',
            'Destinasi': item.destination?.name || '-',
            'Lokasi': item.destination?.location || '-',
            'Alamat': item.destination?.address || '-',
            'Isi Pengaduan': item.content || '-',
            'Tanggal Dibuat': new Date(item.created_at).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            'Tanggal Update': item.updated_at ? new Date(item.updated_at).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : '-'
        }));

        // Buat worksheet
        const ws = XLSX.utils.json_to_sheet(excelData);
        
        // Set lebar kolom
        const columnWidths = [
            { wch: 5 },  // No
            { wch: 20 }, // Nama
            { wch: 15 }, // Telepon
            { wch: 15 }, // Kategori
            { wch: 25 }, // Destinasi
            { wch: 25 }, // Lokasi
            { wch: 40 }, // Alamat
            { wch: 50 }, // Isi Pengaduan
            { wch: 20 }, // Tanggal Dibuat
            { wch: 20 }  // Tanggal Update
        ];
        ws['!cols'] = columnWidths;

        // Buat workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Aspirasi');

        // Download file dengan nama yang mencakup filter
        const filterInfo = [];
        if (filters.location) filterInfo.push(`Lokasi-${filters.location.substring(0, 10)}`);
        if (filters.category) filterInfo.push(`Kategori-${filters.category.substring(0, 10)}`);
        if (filters.startDate || filters.endDate) {
            const dateRange = `${filters.startDate || 'awal'}_${filters.endDate || 'akhir'}`;
            filterInfo.push(dateRange);
        }
        
        const filterSuffix = filterInfo.length > 0 ? `_${filterInfo.join('_')}` : '';
        const fileName = `Data_Aspirasi_${new Date().toISOString().split('T')[0]}${filterSuffix}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }

    // Dapatkan list unik untuk dropdown
    const uniqueLocations = aspirations ? [...new Set(aspirations.map(item => item.destination?.location).filter(Boolean))].sort() : [];
    const uniqueCategories = aspirations ? [...new Set(aspirations.map(item => item.aspiration_category?.name || item.custom_category).filter(Boolean))].sort() : [];

    useEffect(() => {
        fetchAspirations()
        fetchDestinations()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters, aspirations])

    const hasActiveFilters = filters.location || filters.category || filters.startDate || filters.endDate;

    return (
        <div>
            <div className="relative w-full bg-amber-200 overflow-hidden">
                <img
                    src={HeroImage}
                    alt=""
                    className="absolute w-full h-full object-cover"
                    style={{
                        objectPosition: "30% center"
                    }}
                />
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 flex justify-center">
                    <p className="font-[Inter] font-semibold text-lg md:text-2xl lg:text-3xl text-[#EEEEEE] py-16">
                        Dashboard Admin
                    </p>
                </div>
            </div>

            <div className="px-4 py-2 md:px-20 w-full">
                <div className="flex flex-col md:flex-row w-full justify-around items-center gap-8">
                    <CardDashboard text={'Total pengaduan saat ini'} info={aspirations?.length || 0} Icon={BiCommentError} />
                    <CardDashboard text={'Total destinasi saat ini'} info={destinations?.length || 0} Icon={FaMapMarkedAlt} />
                </div>

                <div className="my-6 md:my-14">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
                        <p className="font-[Inter] font-semibold text-lg md:text-2xl lg:text-3xl text-accent">
                            Aspirasi
                        </p>
                        
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                    showFilters || hasActiveFilters
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                <FaFilter />
                                {showFilters ? 'Sembunyikan Filter' : 'Filter'}
                                {hasActiveFilters && !showFilters && (
                                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        !
                                    </span>
                                )}
                            </button>
                            
                            <button
                                onClick={downloadExcel}
                                disabled={!filteredAspirations || filteredAspirations.length === 0}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <FaFileExcel />
                                Download Excel
                            </button>
                        </div>
                    </div>

                    {/* Filter Section */}
                    {showFilters && (
                        <div className="bg-white border border-gray-200 shadow-md p-4 md:p-6 rounded-lg mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Filter Data Aspirasi</h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lokasi
                                    </label>
                                    <select
                                        value={filters.location}
                                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Semua Lokasi</option>
                                        {uniqueLocations.map((location, idx) => (
                                            <option key={idx} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori
                                    </label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters({...filters, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {uniqueCategories.map((category, idx) => (
                                            <option key={idx} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.startDate}
                                        onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Akhir
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.endDate}
                                        onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                                <div className="text-sm text-gray-600">
                                    Menampilkan <span className="font-semibold text-blue-600">{filteredAspirations?.length || 0}</span> dari <span className="font-semibold">{aspirations?.length || 0}</span> data
                                </div>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                                >
                                    Reset Semua Filter
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Active Filters Tags */}
                    {hasActiveFilters && !showFilters && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-sm text-gray-600">Filter aktif:</span>
                            {filters.location && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    Lokasi: {filters.location}
                                    <button onClick={() => setFilters({...filters, location: ''})} className="hover:text-blue-900">
                                        <FaTimes size={10} />
                                    </button>
                                </span>
                            )}
                            {filters.category && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    Kategori: {filters.category}
                                    <button onClick={() => setFilters({...filters, category: ''})} className="hover:text-blue-900">
                                        <FaTimes size={10} />
                                    </button>
                                </span>
                            )}
                            {(filters.startDate || filters.endDate) && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    Periode: {filters.startDate || '...'} s/d {filters.endDate || '...'}
                                    <button onClick={() => setFilters({...filters, startDate: '', endDate: ''})} className="hover:text-blue-900">
                                        <FaTimes size={10} />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Aspirasi Cards */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {filteredAspirations && filteredAspirations.length > 0 ? (
                                filteredAspirations.map((item) => (
                                    <CardAspiration key={item.id} data={item} />
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                                    <BiCommentError className="mx-auto text-gray-400 text-5xl mb-3" />
                                    <p className="text-gray-500 text-lg">
                                        {aspirations?.length === 0 
                                            ? 'Belum ada data aspirasi' 
                                            : 'Tidak ada data yang sesuai dengan filter'}
                                    </p>
                                    {hasActiveFilters && aspirations?.length > 0 && (
                                        <button
                                            onClick={resetFilters}
                                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Reset Filter
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}