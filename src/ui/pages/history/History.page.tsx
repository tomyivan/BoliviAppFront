import { PlusCircle } from "lucide-react"
import { Button } from "../../shared"
import { useNavigate } from "react-router-dom"
import { Search } from "../../components"
import { useGetHistory } from "../../hooks"
import { HistorySimpleDTO } from "../../../domain"
import { useEffect, useState } from "react"
import { HistoryLineTime } from "../../modules"
export const HistoryPage = () => {
    const navigation = useNavigate()
    const [historyData, setHistoryData] = useState<HistorySimpleDTO[]>([])
    const { getHistorySimple } = useGetHistory()
    const loadHistory = async () => {
        const response = await getHistorySimple()
        console.log(response)
        setHistoryData(response)
    }
    useEffect(() => {
        loadHistory()
    },[])
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
            <section >
                <HistoryLineTime 
                    historyData={historyData}
                />
            </section>
        </div>
    )
}