import { useMemo, useState } from "react"
import useApi from "../../../hooks/useApi"
import { useForm } from "react-hook-form"
import { BsPencilFill } from "react-icons/bs"
import { LuLoaderCircle } from "react-icons/lu"
import { FaRegImage } from "react-icons/fa"
import useNotification from "../../../hooks/useNotification"

export default function AddDestination() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [imageSrc, setImageSrc] = useState(null)
    const notify = useNotification()

    const {
        loading,
        error,
        response,
    } = useApi(
        { method: "get", url: "destination-categories" }
    )

    const {
        loading: submitLoading,
        error: submitError,
        execute: addDestination
    } = useApi(
        { method: "post", url: "destinations" }, { autoFetch: false }
    )

    const destinationCategories = useMemo(() =>
        response?.data.destination_categories || [],
        [response]
    )

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData()

        for (let key in data) {
            if (key === "main_image_url") {
                if (data[key]?.length > 0) formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            const res = await addDestination({ data: formData })
            notify(res.status, {
                succesMessage: "Destinasi berhasil ditambahkan"
            })
            console.log(res)
            reset()
        } catch (err) {
            notify(err.response?.status || "network_error");
            console.error(err)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="bg-secondary shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <span className="inline-block px-3 py-1 bg-primary text-secondary text-xs sm:text-sm font-medium rounded-full mb-3">
                        Destinasi
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">
                        Tambah Destinasi Baru
                    </h1>
                    <p className="text-sm sm:text-base text-primary/80"></p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                                                    <FaRegImage className="h-12 w-12 mx-auto mb-2 opacity-30" />
                                                    <p className="text-sm">Pilih gambar destinasi</p>
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
                        {submitError && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">
                                    {submitError?.response?.data?.message || submitError?.message}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full sm:w-auto bg-secondary text-white font-medium py-3 px-8 rounded-lg hover:bg-secondary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitLoading ? (
                                    <>
                                        <LuLoaderCircle className="w-5 h-5 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    "Simpan Perubahan"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}