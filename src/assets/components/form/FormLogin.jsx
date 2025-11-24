import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import useApi from "../../../hooks/useApi"
import { LuLoaderCircle } from "react-icons/lu"

export default function FormLogin() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { execute: submitLogin,
        loading,
        error
    } = useApi({ method: "post", url: "auth/login" }, { autoFetch: false })

    const onSubmit = async (data) => {
        console.log("Data :", data)

        try {
            const response = await submitLogin({ data: data })
            console.log(response)

            if (response.status === 200) {
                navigate("/admin/dashboard")
            } else {
                setError("Login gagal, periksa kembali data Anda");
            }
        } catch (error) {
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
                type="password"
                {...register("password", { required: "Password wajib di isi" })}
                placeholder="Masukan password"
                className="md:w-120 border-primary border-2 p-2 rounded-xl"
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-white font-medium py-3 px-6 rounded-lg hover:bg-secondary/80 transition-colors shadow-sm flex items-center gap-2"
            >
                {loading ? (
                    <>
                        <LuLoaderCircle className="w-5 h-5 animate-spin" />
                        Sedang login...
                    </>
                ) : (
                    "Login"
                )}
            </button>
        </form>
    )
}