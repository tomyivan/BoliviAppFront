import { Atom, CircleArrowLeft } from "lucide-react"

interface HeaderProps {
    title? : string,
    handleCollapse: () => void,
    isCollapsed: boolean
}
export const Header: React.FC<HeaderProps> = ({
    title = "Template",
    handleCollapse,
    isCollapsed
}) => {
    return (
        <header className="text-2xl font-bold text-center flex flex-row items-center justify-center gap-1 h-[78px] relative">            
                {/* <Atom className="text-blue-500" size={30} />    */}
                <img src="../Bolivia.svg" width={80} alt="" />        
                {/* icono */}        
            <h1 className={`${isCollapsed? 'hidden': 'block'}`} >{title}</h1>
            <div className={`absolute w-[30px] h-[30px] bg-teal-300 text-gray-700 cursor-pointer ${isCollapsed && '-rotate-180'} transition-transform duration-300 ease-in-out -right-8 rounded-full`}
                onClick={handleCollapse}                
            >
                <CircleArrowLeft size={30} />
            </div>
        </header>
    )
}