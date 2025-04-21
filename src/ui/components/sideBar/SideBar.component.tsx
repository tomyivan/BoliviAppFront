import { User } from "lucide-react"
import { Header } from "./Header.component"
import { BodySidebar } from "./Body.components"
import { useState } from "react"
import { SideBarContent } from "./Sidebar.content"
interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
    const [collapse, setCollapse] = useState(false)
    const handleCollapse = () => {
        setCollapse(!collapse)
    }
    return (
        <div className={`sidebar__container ${ collapse ? 'w-[90px]' : 'w-[240px]'} `}>
            <Header title="Template" 
                handleCollapse={handleCollapse} 
                isCollapsed={collapse}
            />
            <BodySidebar 
                isCollapsed={collapse}  
                list={SideBarContent()}
            />
            <footer className="shadow-lg rounded-lg overflow-hidden font-bold">
                <div className={`sidebar__footer ${collapse && 'justify-center'}`}>
                    <div role="icon">
                        <User />
                    </div>
                    <span className={`${collapse ? 'hidden':'block'} text-nowrap `}>Juan Perez </span>
                </div>
            </footer>
        </div>
    )
}