import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createAspiration } from "../api/Aspirations"
import { getAspirationCategories } from "../api/AspirationCategories"

export default function FormAspiration({ destination }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [aspirationCategories, setAspirationCategories] = useState(null)
    const [aspirationCategory, setAspirationCategory] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const fetchAspirationCategories = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAspirationCategories()
            setAspirationCategories(response.data)
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAspirationCategories()
    }, [])

    const onSubmit = async (data) => {
        const formData = new FormData()
        for (let key in data) {
            if (key === "image") {
                // Cek dulu apakah user upload file
                if (data[key] && data[key].length > 0) {
                    formData.append(key, data[key][0]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }
        formData.append('destination_id', destination.id)


        setLoading(true)
        try {
            console.log(Object.fromEntries(formData.entries()));
            const response = await createAspiration(formData)
            console.log(response)
            return response
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl p-6 space-y-6 w-full">


            <p className="text-xl font-bold">Form Aspirasi Wisata</p>

            <div className="space-y-6">

                {/* Name Field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Nama Lengkap</label>
                    <input
                        {...register("name")}
                        className=" border-secondary border-2 p-3 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                        placeholder="Masukkan nama lengkap"
                    />
                </div>

                {/* Phone Field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Nomor Telepon</label>
                    <input
                        type="tel"
                        {...register("phone")}
                        className=" border-secondary border-2 p-3 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                        placeholder="Contoh: 081234567890"
                    />
                </div>

                {/* Category Field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Kategori Aspirasi</label>
                    <select
                        {...register("aspiration_category_id", {
                            required: "Kategori aspirasi wajib diisi.",
                        })}
                        className=" border-secondary border-2 p-3 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                        onChange={(e) => setAspirationCategory(Number(e.target.value))}
                    >
                        <option value="">-- Pilih Kategori --</option>
                        {aspirationCategories?.map((aspCat) => (
                            <option key={aspCat.id} value={aspCat.id}>
                                {aspCat.name}
                            </option>
                        ))}
                    </select>

                    {aspirationCategory === 7 && (
                        <div className="mt-3">
                            <label className="text-sm font-medium mb-1">Kategori Lainnya</label>
                            <input
                                {...register("custom_category", {
                                    required: "Kategori lainnya wajib diisi.",
                                })}
                                className=" border-secondary border-2 p-3 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors w-full"
                                placeholder="Masukkan kategori aspirasi lainnya..."
                            />
                        </div>
                    )}

                    {errors.aspiration_category_id && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errors.aspiration_category_id.message}
                        </p>
                    )}
                </div>

                {/* Image Upload Field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Bukti Gambar (Opsional)</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        {...register("image", {
                            validate: {
                                size: (value) =>
                                    !value[0] || value[0].size <= 2 * 1024 * 1024 || "Ukuran gambar tidak boleh lebih dari 2MB.",
                            },
                        })}
                        className=" border-secondary border-2 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary/80 transition-colors"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errors.image.message}
                        </p>
                    )}
                </div>

                {/* Content Field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Isi Aspirasi</label>
                    <textarea
                        {...register("content", {
                            required: "Isi aspirasi wajib di isi",
                            minLength: { value: 20, message: "Isi aspirasi minimal 20 karakter" },
                            maxLength: { value: 1000, message: "Isi aspirasi terlalu panjang." },
                        })}
                        className=" border-secondary border-2 p-3 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors h-40 resize-none"
                        placeholder="Tuliskan aspirasi Anda secara detail..."
                    ></textarea>
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errors.content.message}
                        </p>
                    )}
                </div>

            </div>


            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    className="bg-secondary text-white font-medium py-3 px-6 rounded-lg hover:bg-secondary/80 cursor-pointer focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors shadow-sm"
                >
                    Kirim Aspirasi
                </button>
            </div>
        </form>
    )
}