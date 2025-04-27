import { EventUploadImg } from "../../modules";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetEvents } from "../../hooks";
import { EventFileDTO } from "../../../domain";
import { useDeleteEvents } from "../../hooks";
import { Trash } from "lucide-react";
export const GaleryPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getEventImage } = useGetEvents();
    const baseUrl = import.meta.env.VITE_BASEURL;
    const [ eventFile, setEventFile ] = useState<EventFileDTO[]>([]);
    const { deleteEventFile } = useDeleteEvents();
    const loadEventImage = async () => {
        if (!id) return;        
        const response = await getEventImage(Number(id));
        setEventFile(response);        
    };
    const handleDelete = async (data: EventFileDTO) => {
        if (!data.idFile || !confirm("¿Estas seguro de eliminar la imagen?")) return;
        const response = await deleteEventFile(data);
        response && loadEventImage();
    }

    useEffect(() => {
        loadEventImage();
    }, [id]);
    return (
        <div className="container mx-auto mt-5 mb-5">
            <EventUploadImg 
                eventId={Number(id)}
                loadEventImage={loadEventImage}
            />           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {eventFile.map((file) => (
                    <div key={file.idFile} className="relative group bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                        <div className="flex-1 flex justify-center items-center overflow-hidden bg-gray-200 dark:bg-gray-700 dark:text-gray-200"> 
                            <img
                                src={`${baseUrl}/uploads/events/${file.name}`}
                                alt={file.name}
                                className="h-48 object-cover"
                            />
                        </div>
                        <div className="flex items-center justify-between bg-gray-100">
                            <p className="text-gray-600 text-center text-sm px-2">{file.name}</p>
                            <p className="bg-red-400 p-4 text-gray-200 cursor-pointer hover:opacity-80"
                                onClick={() => handleDelete(file)}
                            ><Trash size={20} /></p>
                        </div>

                    </div>
                ))}                
            </div>
        </div>    
    )
};
