import { useEffect, useState } from "react"
import { getAspirations } from "../api/Aspirations"
import HeroImage from "../images/heroImage.jpg";
import { getDestinations } from "../api/Destinations";
import CardDashboard from "../components/CardDashboard";
import { BiCommentError } from "react-icons/bi";
import { FaMapMarkedAlt } from "react-icons/fa";
import CardAspiration from "../components/CardAspiration";


export default function Dashboard() {
    const [aspirations, setAspirations] = useState(null)
    const [destinations, setDestinations] = useState(null)
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchAspirations = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAspirations()
            setAspirations(response.data)
            console.log(response);
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchDestinations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDestinations();
            const data = response.data.destinations;
            setDestinations(data);
            setFilteredDestinations(data); // tampilkan semua saat awal
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchAspirations()
        fetchDestinations()
    }, [])

    return (
        <div>
            <div className="relative w-full bg-amber-200 overflow-hidden">
                <img
                    src={HeroImage}
                    alt=""
                    className="absolute w-full h-full object-cover"
                    style={{
                        objectPosition: "30% center"  // geser 30% dari kiri
                    }}
                />
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 flex justify-center">
                    <p className="font-[Inter] font-semibold text-lg md:text-2xl lg:text-3xl text-[#EEEEEE] py-16">
                        Dashboard Admin
                    </p>
                </div>
            </div>

            <div className="px-4 py-2 md:px-20 w-full ">
                <div className="flex flex-col md:flex-row w-full justify-around items-center gap-8">
                    <CardDashboard text={'Total pengaduan saat ini'} info={aspirations?.length} Icon={BiCommentError} />
                    <CardDashboard text={'Total destinasi saat ini'} info={destinations?.length} Icon={FaMapMarkedAlt} />
                </div>

                <div className="my-6 md:my-14">
                    <p className="font-[Inter] font-semibold text-lg md:text-2xl lg:text-3xl text-accent mb-4 md:mb-8">Aspirasi</p>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {aspirations?.map((item) => (
                            <CardAspiration key={item.id} data={item} />
                        ))}
                    </div>



                </div>
            </div>

        </div>
    )
}