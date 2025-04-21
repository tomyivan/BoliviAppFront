import { CalendarEvent } from "../../../domain"

interface DayDetailProps {
    data: CalendarEvent[]
}
export const DayDetail:React.FC<DayDetailProps> = ({data}) => {
    return ( <div className=" text-center mb-2 w-72 border border-gray-400 mr-2 overflow-y-auto max-h-full">
            <div className="text-center font-bold text-gray-606 text-2xl border-b border-gray-400 p-2">Eventos</div>            
            {   

                data?.length > 0 ? data?.map((event, index) => (
                    <div key={index} className="border-b border-gray-400 p-2 flex justify-between items-center">                        
                        <div className="text-xs text-blue-500">{event.startTime}-{event.endTime}</div>                        
                        <div>{event.title} </div>
                    </div>
                )) :
                <div  className="border-b border-gray-400 p-2">
                    <span className="text-sm font-semibold">No hay eventos</span>
                </div>
            }
        </div>
    )
}