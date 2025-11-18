export default function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-600 mt-2">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Batal
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
