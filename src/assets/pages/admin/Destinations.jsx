import LayoutAdmin from "../../layouts/admin/LayoutAdmin";
import HeroImage from "../../images/heroImage.jpg"
import useApi from "../../../hooks/useApi";
import { useEffect, useMemo, useState } from "react";
import CardDestinationAdmin from "../../components/card/CardDestinationAdmin";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Destinations() {
    const {
        response,
        loading,
        error,
    } = useApi({ method: "get", url: "destinations" })

    const [filteredDestinations, setFilteredDestinations] = useState([])

    const [filters, setFilters] = useState({
        name: "",
        site: ""
    })

    const destinations = useMemo(() =>
        response?.data.destinations || [],
        [response]
    )

    useEffect(() => {
        let filtered = [...destinations]

        if (filters.name) {
            filtered = filtered.filter((item) => (
                item.name?.toLowerCase().includes(filters.name.toLowerCase())
            ))
        }

        setFilteredDestinations(filtered)
    }, [filters, destinations])

    return (
        <LayoutAdmin>
            {/* Hero Section with Gradient Overlay */}
            <div className="relative w-full bg-amber-200 overflow-hidden">
                <img
                    src={HeroImage}
                    alt=""
                    className="absolute w-full h-full object-cover"
                    style={{
                        objectPosition: "30% center"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

                <div className="relative z-10 flex justify-center">
                    <div className="text-center py-16 px-4">
                        <p className="font-[Inter] font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2 drop-shadow-lg">
                            Destinasi
                        </p>
                        <p className="font-[Inter] text-sm md:text-base text-gray-200 drop-shadow">
                            Kelola dan monitor destinasi wisata
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 md:px-20 w-full">
                <div className="mb-6">
                    <input
                        type="text"
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        className="border-2 border-secondary w-full p-2 md:p-4 rounded-2xl "
                        placeholder="Masukan kata kunci pencarian destinasi wisata" />
                </div>

                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations?.map((destination) => (
                        <CardDestinationAdmin destination={destination} key={destination.id} />
                    ))
                    }
                </div>
            </div>

            <Link to="/admin/destinations/create" className="bg-secondary p-2 md:p-4 rounded-full fixed bottom-4 right-4 cursor-pointer flex justify-end transition-all duration-500 z-20">
                    <IoMdAdd className="h-6 w-6 md:h-8 md:w-8" />
            </Link>

        </LayoutAdmin>
    )
}