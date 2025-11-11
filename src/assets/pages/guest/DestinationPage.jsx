import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDestination } from "../../utils/api/Destinations"
import FormAspiration from "../../components/form/FormAspiration"
import NotificationModal from "../../components/modal/NotificationModal"

export default function DestinationPage() {
    const { slug } = useParams()
    const [destination, setDestination] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState("")

    const fetchDestination = async () => {
        setLoading(true)
        setErrors(null)
        try {
            const response = await getDestination(slug)
            const data = response.data.destination
            setDestination(data)
        } catch (err) {
            console.error(err)
            setErrors(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDestination()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading destination...</div>
            </div>
        )
    }

    if (errors) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-lg">Error loading destination</div>
            </div>
        )
    }

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Destination not found</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-secondary shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <span className="inline-block px-3 py-1 bg-primary text-secondary text-sm font-medium rounded-full mb-2">
                        {destination.destination_category.name}
                    </span>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        {destination.name}
                    </h1>
                    <p className="text-primary">{destination.location}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* KIRI */}
                    <div className="space-y-8">

                        {/* Gambar */}
                        <div className="bg-primary rounded-lg shadow overflow-hidden">
                            <img
                                src={destination.main_image_url}
                                alt={destination.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        {/* Keterangan */}
                        <div className="space-y-6 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900">Deskripsi</h2>
                            <p className="text-accent leading-relaxed">{destination.description}</p>

                            <hr className="my-4" />

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
                                <p className="text-accent">{destination.address}</p>
                            </div>

                            <a
                                href={destination.maps_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-secondary text-primary font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Lihat di Google Maps
                            </a>
                        </div>

                    </div>

                    {/* KANAN: Form Aspirasi */}
                    <div className="sticky top-6 h-fit">
                        <FormAspiration destination={destination} notification={notification} setNotification={setNotification} />
                    </div>

                    <NotificationModal notification={notification} setNotification={setNotification} />
                    
                </div>
            </div>

        </div>
    )
}
