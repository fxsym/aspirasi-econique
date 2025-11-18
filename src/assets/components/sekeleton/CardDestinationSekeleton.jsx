import { FaImage } from "react-icons/fa";

export default function CardDestinationSkeleton() {
    return (
        <div
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-pulse"
        >
            <div className="relative w-full h-48">
                <div className="w-full h-full object-cover pt-6">
                    <FaImage className="h-36 w-full text-secondary/60" />
                </div>
                <span
                    className="w-16 h-4 absolute top-3 left-3 bg-secondary/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow"
                />
            </div>

            <div className="p-4">
                <div className="bg-accent w-60 h-4 rounded-xl mb-2" />
                <div className="bg-accent w-30 h-2 rounded-xl" />
                <div className="h-6 mt-4 w-full bg-secondary text-white text-sm font-medium py-2 rounded-xl " />
            </div>
        </div>
    )
}