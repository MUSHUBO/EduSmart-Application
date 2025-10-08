import { AuthContext } from "@/Context/AuthContext/AuthContext"
import { use } from "react"


export const useAuth = () => {
    const useInfo = use(AuthContext)
    return useInfo
}