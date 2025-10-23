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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-md mt-6">
            <label>Nama Lengkap</label>
            <input
                {...register("name")}
                className="border p-2 rounded"
            />

            <label>Nomor Telepon</label>
            <input
                type="phone"
                {...register("phone")}
                className="border p-2 rounded"
            />

            <label>Isi Aspirasi</label>
            <textarea
                {...register("content",
                    {
                        required: "Isi aspirasi wajib di isi",
                        minLength: {
                            value: 20, message: "Isi aspirasi minimal 20 karakter"
                        },
                        maxLength: {
                            value: 1000,
                            message: "Isi aspirasi terlalu panjang.",
                        },
                    })}
                className="border p-2 rounded h-24"
            ></textarea>
            {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}

            <label>Kategori Aspirasi</label>
            <select
                {...register("aspiration_category_id", {
                    required: "Kategori aspirasi wajib diisi.",
                })}
                className="border p-2 rounded w-full"
                onChange={(e) => setAspirationCategory(Number(e.target.value))} // pastikan jadi angka
            >
                <option value="">-- Pilih Kategori --</option>
                {aspirationCategories?.map((aspCat) => (
                    <option key={aspCat.id} value={aspCat.id}>
                        {aspCat.name}
                    </option>
                ))}
            </select>

            {/* Jika user pilih kategori 7 (Lainnya) */}
            {aspirationCategory === 7 && (
                <div className="mt-3">
                    <label>Kategori Lainnya</label>
                    <input
                        {...register("custom_category", {
                            required: "Kategori lainnya wajib diisi.",
                        })}
                        className="border p-2 rounded w-full"
                        placeholder="Masukkan kategori aspirasi lainnya..."
                    />
                </div>
            )}

            {errors.aspiration_category_id && (
                <p className="text-red-500 text-sm">
                    {errors.aspiration_category_id.message}
                </p>
            )}

            <label>Bukti Gambar (Opsional)</label>
            <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                {...register("image", {
                    validate: {
                        size: (value) =>
                            !value[0] || value[0].size <= 2 * 1024 * 1024 || "Ukuran gambar tidak boleh lebih dari 2MB.",
                    },
                })}
                className="border p-2 rounded w-full"
            />
            {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            <button
                type="submit"
                className="bg-blue-500 text-white rounded p-2 mt-3 hover:bg-blue-600"
            >
                Kirim Aspirasi
            </button>
        </form>
    )
}