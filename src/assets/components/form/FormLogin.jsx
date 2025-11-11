import { useState } from "react"
import { useForm } from "react-hook-form"
import { login } from "../../utils/api/Auth"
import { useNavigate } from "react-router-dom"

export default function FormLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        console.log("Data :", data)
        setLoading(true)
        setError(null)

        try {
            const response = await login(data)
            console.log(response)
            if (response.status === 200) {
                navigate("/dashboard")
            } else {
                setError("Login gagal, periksa kembali data Anda");
            }
        } catch (error) {
            setError(error.data)
            console.error(error)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6 rounded-2xl backdrop-blur-sm shadow-2xl text-primary items-center">
            <p>Masuk pengelolaan website</p>

            <input
                type="text"
                {...register("user_input", { required: "Username/Email wajib di isi" })}
                placeholder="Masukan username/email"
                className="md:w-120 border-primary border-2 p-2 rounded-xl"
            />
            {errors.user_input && <p style={{ color: "red" }}>{errors.user_input.message}</p>}

            <input
                type="message"
                {...register("password", { required: "Password wajib di isi" })}
                placeholder="Masukan password"
                className="md:w-120 border-primary border-2 p-2 rounded-xl"
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <button
                type="submit"
                className="bg-secondary text-white font-medium py-3 px-6 rounded-lg hover:bg-secondary/80 cursor-pointer focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors shadow-sm"
            >
                Login
            </button>
        </form>
    )
}