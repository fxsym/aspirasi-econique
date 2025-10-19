import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl text-center">Maaf</h1>
                <p className="text-xl text-center mb-4">Terdapat error saat anda mengakses halaman ini</p>
                
                {/* Tampilkan kode error dan pesan */}
                <div className="flex gap-2 justify-center items-center">
                    <p className="text-lg font-semibold text-red-500">
                        {error.status || "Tidak diketahui"}
                    </p>
                    <p className="text-md text-gray-600">
                        {error.statusText || error.message}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage