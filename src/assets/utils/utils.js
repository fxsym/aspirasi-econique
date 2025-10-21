export function generateSlug(text) {
  return text
    .toString()                      // pastikan tipe string
    .normalize("NFD")                // hapus aksen (misal é -> e)
    .replace(/[\u0300-\u036f]/g, "") // hapus karakter diakritik
    .toLowerCase()                   // ubah jadi huruf kecil
    .trim()                          // hapus spasi di awal/akhir
    .replace(/[^a-z0-9\s-]/g, "")    // hapus simbol aneh
    .replace(/\s+/g, "-")            // ganti spasi jadi '-'
    .replace(/-+/g, "-");            // hapus '-' ganda
}