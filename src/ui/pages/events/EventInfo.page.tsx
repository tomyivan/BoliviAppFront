import { useEffect, useState } from "react";
import { useGetEvents } from "../../hooks"
import { useParams } from "react-router-dom"
import { EventFileDTO, EventInfo } from "../../../domain";
export const EventInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const baseUrl = import.meta.env.VITE_BASEURL;
    const [eventFile, setEventFile ] = useState<EventFileDTO[]>([]);
    const [ eventData, setEventData ] = useState<EventInfo>({} as EventInfo);
    const { getEventInfo, getEventImage } = useGetEvents();
    
    const loadGalary = async () => {
        if (!id) return;        
        const response = await getEventImage(Number(id));
        setEventFile(response);        
    }
    const loadEvents = async () => {
        const response = await getEventInfo(Number(id));
        setEventData(response);
    }
    useEffect(() => {
        loadEvents()
        loadGalary()
    },[])
    return (
        <div className="flex flex-col h-full w-full px-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{eventData.name}</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{eventData.detail}</p>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Categoria:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Fecha:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Lugar:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData?.location?.location}</span>
                    </div>
                    { (eventData?.location?.latitude && eventData?.location?.longitude) && <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Locacion:</span>
                        <a 
                            href={`https://www.google.com/maps?q=${eventData.location.latitude},${eventData.location.longitude}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Ver en Google Maps
                        </a>
                    </div> 
                    }
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Hora:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.startTime} - {eventData.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Departamento:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.location?.department}</span>
                    </div>
       
                    { eventData.sponsors?.length > 0  && <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Organizador:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.sponsors?.map((sponsor) => sponsor.name).join(", ")}</span>
                    </div>}
                    
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {eventFile.map((file) => (
                    <div key={file.idFile} className="relative group bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                        onClick={() => window.open(`${baseUrl}/uploads/events/${file.name}`, "_blank")}
                    >
                        <div className="flex-1 flex justify-center items-center overflow-hidden bg-gray-200 dark:bg-gray-700 dark:text-gray-200"> 
                            <img
                                src={`${baseUrl}/uploads/events/${file.name}`}
                                alt={file.name}
                                className="h-48 object-cover"
                            />
                        </div>
                    </div>
                ))}                
            </div>
        </div>
    )
}
