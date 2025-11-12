import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuLoaderCircle } from "react-icons/lu";
import useApi from "../../../hooks/useApi";

export default function FormAspiration({ destination, setNotification }) {
  const [aspirationCategory, setAspirationCategory] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ✅ GET data kategori otomatis
  const {
    response: categoryResponse,
    loading: loadingCategories,
    error: categoryError,
  } = useApi({ method: "get", url: "aspiration-categories" });

  // ✅ Untuk POST data aspirasi
  const {
    execute: submitAspiration,
    loading: submitting,
    error: submitError,
  } = useApi({ method: "post", url: "aspirations" }, { autoFetch: false });

  const aspirationCategories = categoryResponse?.data ?? [];

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key === "image") {
        if (data[key]?.length > 0) formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append("destination_id", destination.id);

    try {
      const res = await submitAspiration({ data: formData });
      setNotification(res.status);
      reset();
    } catch (err) {
      console.error("Gagal kirim aspirasi:", err);
      setNotification(err?.response?.status || "network_error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl p-6 space-y-6 w-full">
      <p className="text-xl font-bold">Form Aspirasi Wisata</p>

      <div className="space-y-6">
        {/* Nama */}
        <div>
          <label className="text-sm font-medium mb-1">Nama Lengkap</label>
          <input
            {...register("name", { required: "Nama wajib diisi" })}
            className="border-secondary border-2 p-3 rounded-lg w-full"
            placeholder="Masukkan nama lengkap"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Telepon */}
        <div>
          <label className="text-sm font-medium mb-1">Nomor Telepon</label>
          <input
            type="tel"
            {...register("phone", { required: "Nomor telepon wajib diisi" })}
            className="border-secondary border-2 p-3 rounded-lg w-full"
            placeholder="081234567890"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Kategori */}
        <div>
          <label className="text-sm font-medium mb-1">Kategori Aspirasi</label>
          <select
            {...register("aspiration_category_id", { required: "Kategori wajib diisi" })}
            className="border-secondary border-2 p-3 rounded-lg w-full"
            onChange={(e) => setAspirationCategory(Number(e.target.value))}
          >
            <option value="">-- Pilih Kategori --</option>
            {aspirationCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.aspiration_category_id && (
            <p className="text-red-500 text-sm">{errors.aspiration_category_id.message}</p>
          )}
        </div>

        {/* Jika kategori lain */}
        {aspirationCategory === 7 && (
          <div>
            <label className="text-sm font-medium mb-1">Kategori Lainnya</label>
            <input
              {...register("custom_category", { required: "Kategori lainnya wajib diisi." })}
              className="border-secondary border-2 p-3 rounded-lg w-full"
              placeholder="Masukkan kategori aspirasi lainnya..."
            />
          </div>
        )}

        {/* Gambar */}
        <div>
          <label className="text-sm font-medium mb-1">Bukti Gambar (Opsional)</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            {...register("image", {
              validate: {
                size: (value) =>
                  !value[0] || value[0].size <= 2 * 1024 * 1024 || "Ukuran gambar maksimal 2MB",
              },
            })}
            className="border-secondary border-2 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary/80 transition-colors"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Isi Aspirasi */}
        <div>
          <label className="text-sm font-medium mb-1">Isi Aspirasi</label>
          <textarea
            {...register("content", {
              required: "Isi aspirasi wajib diisi",
              minLength: { value: 20, message: "Isi minimal 20 karakter" },
            })}
            className="border-secondary border-2 p-3 rounded-lg w-full h-40 resize-none"
            placeholder="Tuliskan aspirasi Anda secara detail..."
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
      </div>

      {/* Tombol Submit */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={submitting}
          className="bg-secondary text-white font-medium py-3 px-6 rounded-lg hover:bg-secondary/80 transition-colors shadow-sm flex items-center gap-2"
        >
          {submitting ? (
            <>
              <LuLoaderCircle className="w-5 h-5 animate-spin" />
              Mengirim Aspirasi...
            </>
          ) : (
            "Kirim Aspirasi"
          )}
        </button>
      </div>
    </form>
  );
}
