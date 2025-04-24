import { toast } from "react-toastify";
import { EventsApp } from "../../../dependences/Events.dependences"
import { DataSelect } from "../../../domain";
import { EventSimpleDTO } from "../../../domain/events/events";
export const useGetEvents = () => { 
    const getCategoriesEvent = async ():Promise<DataSelect[]> => {
        try {
            const response = await EventsApp.getCategoriesEvent();
            if(!response || !response?.ok) {
                toast.error(response?.msg || "Error fetching categories");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error; // Rethrow the error for further handling if needed
        }
    };

    const getEvents = async (type: number): Promise<EventSimpleDTO[]> => {
        try {
            const response = await EventsApp.getEvents( type );
            if (!response || !response.ok) {
                toast.error(response?.msg || "Error al obtener eventos simples");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching simple events:", error);
            return [];
        }
    }

    return { getCategoriesEvent, getEvents };
}