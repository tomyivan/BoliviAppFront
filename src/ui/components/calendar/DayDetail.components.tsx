import dayjs from "dayjs"
import "dayjs/plugin/utc"
import { CalendarEvent } from "../../../domain"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
interface DayDetailProps {
    data: CalendarEvent[],
    handleEvent?: (event: CalendarEvent) => void
}
export const DayDetail:React.FC<DayDetailProps> = ({data, handleEvent}) => {
    return ( <div className=" text-center mb-2 w-72 border border-gray-400 mr-2 overflow-y-auto max-h-full">
            <div className="text-center font-bold text-gray-606 text-2xl border-b border-gray-400 p-2">Eventos</div>            
            {   
                data?.length > 0 ? data?.map((event, index) => (
                    <div key={index} 
                        onClick={() => handleEvent && handleEvent(event)}
                        className="border-b border-gray-400 p-2 flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">                        
                        <div className="text-xs font-bold text-blue-500">{dayjs(event.startTime).utc().format("HH:mm")}-{dayjs(event.endTime).utc().format("HH:mm")}</div>                        
                        <div>{event.title}</div>
                    </div>
                )) :
                <div  className="border-b border-gray-400 p-2">
                    <span className="text-sm font-semibold">No hay eventos</span>
                </div>
            }
        </div>
    )
}