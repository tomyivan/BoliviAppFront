import { Outlet } from "react-router-dom"
import { useAuth } from "../hooks"
import { useAuthStore } from "../store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header, NavBar, RightBar, SideBar } from "../components"
export const Layout = () => {
    const [showRightBar, setShowRightBar] = useState(false)
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
        const html = document.querySelector('html')
            const theme = localStorage.getItem('theme')
            theme === 'dark' ? html?.classList.add('dark') : html?.classList.remove('dark')
        loadToken()
    },[])
    return (
        <>
        <div className="main-layout">
                <SideBar />
                <div className="main-layout__body scrollbar-gutter-stable">                   
                    <NavBar 
                        openNotify={() => setShowRightBar(!showRightBar)}
                    />                    
                    <Header />                    
                    <Outlet />
                </div>
                <RightBar 
                    isOpen={showRightBar} 
                    handleHidden={() => setShowRightBar(!showRightBar)}
                />
            </div>

        </>
    )
}