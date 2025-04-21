import { PlusCircle } from "lucide-react"
import { Search, Calendar } from "../../components"
import { Button } from "../../shared"
import { useNavigate } from "react-router-dom"
export const EventsPage = () => {
    const navigation = useNavigate()
    return (
        <div className="flex flex-col h-full w-full px-4 gap-4">
            <div className="flex justify-end md:flex-row rounded-2xl flex-col gap-2 items-center bg-gray-50 shadow-lg px-4 dark:bg-gray-700 dark:text-gray-200">                      
                    <Search />                    
                    <div className="md:w-auto w-full ">
                        <Button 
                            variant="btn-primary"
                            size="btn-sm"
                            onClick={() => navigation('nuevo')}
                            icon={<PlusCircle size={20}/>}
                            fullRounded
                            widthFull
                        >
                            Agregar
                        </Button>
                    </div>        
            </div>
            <Calendar />
        </div>
    )
}