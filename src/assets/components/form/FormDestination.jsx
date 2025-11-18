import { BsPencilFill } from "react-icons/bs";
import useApi from "../../../hooks/useApi";

export default function FormDestination() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [imageSrc, setImageSrc] = useState(null)

    const {
        loading,
        error,
        response
    } = useApi(
        { method: "get", url: "destination-categories" }
    )

    const destinationCategories = useMemo(() =>
        response?.data.destination_categories || [],
        [response]
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8">

            {/* Split Layout: Image Left, Form Right on LG+ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                {/* Left Column - Image Upload Section */}
                <div className="lg:pr-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Gambar Destinasi
                    </label>
                    <div className=" group rounded-lg overflow-hidden bg-gray-100 sticky top-4">
                        <div className="w-full aspect-video lg:aspect-square relative">
                            {imageSrc ? (
                                <img
                                    src={imageSrc}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <div className="text-center">
                                        <BsPencilFill className="h-12 w-12 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">Tidak ada gambar</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="text-center text-white">
                                <BsPencilFill className="h-10 w-10 mx-auto mb-2" />
                                <p className="text-sm font-medium">Klik untuk mengubah</p>
                            </div>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                {...register("main_image_url", {
                                    validate: {
                                        size: (value) =>
                                            !value[0] || value[0].size <= 2 * 1024 * 1024 || "Ukuran maksimal 2MB",
                                    },
                                })}
                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    {errors.main_image_url && (
                        <p className="text-red-500 text-xs mt-2">{errors.main_image_url.message}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG. Maksimal 2MB</p>
                </div>

                {/* Right Column - Form Fields */}
                <div className="lg:pl-4">
                    <div className="space-y-5 sm:space-y-6">
                        {/* Nama Destinasi */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Destinasi
                            </label>
                            <input
                                {...register("name", { required: "Nama destinasi wajib diisi" })}
                                type="text"
                                id="name"
                                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                placeholder="Masukkan nama destinasi"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                {...register("description")}
                                id="description"
                                rows="4"
                                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none"
                                placeholder="Masukkan deskripsi destinasi"
                            />
                        </div>

                        {/* Lokasi */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                Lokasi
                            </label>
                            <input
                                {...register("location")}
                                type="text"
                                id="location"
                                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                placeholder="Masukkan lokasi lengkap"
                            />
                        </div>

                        {/* Alamat */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                Alamat
                            </label>
                            <input
                                {...register("address")}
                                type="text"
                                id="address"
                                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                placeholder="Masukkan alamat lengkap"
                            />
                        </div>

                        {/* Link Maps */}
                        <div>
                            <label htmlFor="maps_link" className="block text-sm font-semibold text-gray-700 mb-2">
                                Link Google Maps
                            </label>
                            <input
                                {...register("maps_link")}
                                type="url"
                                id="maps_link"
                                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                placeholder="https://maps.google.com/..."
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                Kategori Destinasi
                            </label>
                            <select
                                {...register("destination_category_id")}
                                id="category"
                                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white"
                            >
                                <option value="">Pilih Kategori</option>
                                {destinationCategories.map(({ id, name }) => (
                                    <option value={id} key={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Error */}
            <p className="text-red-600 text-sm">
                {submitError?.response?.data?.message ||
                    submitError?.message ||
                    "Terjadi kesalahan"}
            </p>


            {/* Action Button */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={submitLoading}
                    className="cursor-pointer w-full sm:w-auto bg-secondary text-white font-medium py-3 px-8 rounded-lg hover:bg-secondary/70 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {submitLoading ? (
                        <>
                            <LuLoaderCircle className="w-5 h-5 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        "Simpan Perubahan"
                    )}
                    <FaRegSave className="text-lg md:text-xl" />
                </button>
            </div>
        </form>
    )
}