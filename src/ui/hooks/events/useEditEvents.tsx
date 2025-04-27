import { toast } from "react-toastify";
import { EventsApp } from "../../../dependences/Events.dependences";
import { EventsForm } from "../../../domain";

export const useEditEvents = () => {
    const editEvents = async (event: EventsForm, idEvent:number):Promise<boolean> => {
        try {
            const response = await EventsApp.updateEvent( event,idEvent );
            if ( !response || !response.ok ){
                toast.error(response.msg || "Error al editar el evento");
                return false
            }     
            toast.success(response.msg);
            return true
        } catch (error) {
            console.error(error);
            toast.error("Error al editar el evento");
            return false
        }
    }
    return { editEvents }
}