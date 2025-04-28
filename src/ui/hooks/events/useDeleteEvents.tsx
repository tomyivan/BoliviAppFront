import { toast } from "react-toastify";
import { EventsApp } from "../../../dependences/Events.dependences"
import { EventFileDTO } from "../../../domain"
export const useDeleteEvents = () => {
    const deleteEventFile = async (data: EventFileDTO):Promise<Boolean> => {
        try {
            const response = await EventsApp.deleteFile(data);
            if ( !response || !response.ok ){
                toast.error(response.msg || "Error al eliminar el archivo");
                return false
            }     
            toast.success(response.msg);
            return true
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar el archivo");
            return false
        }
    }

    const deleteEvent = async (idEvent: number):Promise<Boolean> => {
        try {
            const response = await EventsApp.deleteEvent(idEvent);
            if ( !response || !response.ok ){
                toast.error(response.msg || "Error al eliminar el evento");
                return false
            }     
            toast.success(response.msg);
            return true
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar el evento");
            return false
        }
    }

    return { deleteEventFile, deleteEvent }
}