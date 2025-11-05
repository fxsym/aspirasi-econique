import { useEffect, useState } from "react"
import { getAspirations } from "../api/Aspirations"

export default function Dashboard() {
    const [aspirations, setAspirations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchAspirations = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAspirations()
            setAspirations(response.data)
            console.log(response)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAspirations()
    }, [])

    return (
        <div>
            <p>Ini dashboard admin</p>
            <div>
                Total Aspirasi saat ini : {aspirations.length}
            </div>
        </div>
    )
}