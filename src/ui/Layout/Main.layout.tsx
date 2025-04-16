import { Outlet } from "react-router-dom"
import { useAuth } from "../hooks"
import { useAuthStore } from "../store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const Layout = () => {
    const { addAuth, removeAuth } = useAuthStore()
    const { refreshToken } = useAuth()
    const navigation = useNavigate()
    const loadToken = async () => {        
            const response = await refreshToken()            
            if(response.token !== undefined){
                addAuth(response) // Guardar el token en el store
            }else{
                removeAuth() // Limpiar el store
                localStorage.removeItem("token")
                navigation("/login") // Redirigir a la página de inicio
            }
        }
    
    useEffect(() => {
        loadToken()
    },[])
    return (
        <div>
            <Outlet />
        </div>
    )
}