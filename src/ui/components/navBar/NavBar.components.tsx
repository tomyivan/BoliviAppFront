import { LogOut, Settings,  Sun, Moon, Sparkles } from "lucide-react"
import { useAuth } from "../../hooks"
import { Modal } from "../modal/Modal.components"
import { IAChat } from "../../modules"
import { useState } from "react"
interface NavBarProps {
    openNotify: () => void
}
export const NavBar:React.FC<NavBarProps> = ({
    openNotify
}) => {
    const { logout } = useAuth()
    const [ showModal, setShowModal ] = useState(false)
    const handleTheme = () => {
        console.log('handleTheme')  
        const html = document.querySelector('html')
        if (html) {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            } else {
                html.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            }
        }
    }
    
    return (
        <nav className="navbar__container">
            <Modal 
                showModal={showModal}
                setShowModal={() => setShowModal(false)}
                title="Preguntale a BolivIA"
            >
                <IAChat 
                   
                />
            </Modal>
            <ul className="navbar__list">
                <li className="navbar__list-item"
                    onClick={handleTheme}
                >
                    <Sun size={15} className="dark:hidden" />
                    <Moon size={15} className="hidden dark:block" />
                </li>
                <li className="navbar__list-item relative" onClick={()=>setShowModal(true)} 
                        title="Preguntale  BolivIA"
                    > <Sparkles size={15} /> 
                    {/* <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div> */}
                </li>
                <li className="navbar__list-item"><Settings size={15} /></li>
                <li className="navbar__list-item"
                    onClick={logout}
                ><LogOut size={15} /></li>
            </ul>
        </nav>
    )
}