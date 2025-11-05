export default function TableAspiration({ data }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium text-gray-900">{data.name}</td>
      <td className="px-6 py-4">{data.phone}</td>
      <td className="px-6 py-4">{data.aspiration_category?.name || "Tidak diketahui"}</td>
      <td className="px-6 py-4">{data.destination?.name || "Tidak diketahui"}</td>
      <td className="px-6 py-4 text-gray-700 max-w-xs truncate" title={data.content}>
        {data.content}
      </td>
      <td className="px-6 py-4">
        {new Date(data.created_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </td>
    </tr>
  );
}
