import { toast } from "react-toastify";
import { EventsApp } from "../../../dependences/Events.dependences"
import { EventsForm } from "../../../domain"

export const useAddEvents = () => {
    const addEvents = async (event: EventsForm):Promise<Boolean> => {
        try {
            const response = await EventsApp.addEvent(event);
            if ( !response || !response.ok ){
                toast.error(response.msg || "Error al agregar el evento");
                return false
            }     
            toast.success(response.msg);
            return true
        } catch (error) {
            console.error(error);
            toast.error("Error al agregar el evento");
            return false
        }
    }
    return {
        addEvents
    }
}