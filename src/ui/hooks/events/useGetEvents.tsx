import { toast } from "react-toastify";
import { EventsApp } from "../../../dependences/Events.dependences"
import { DataSelect, EventFileDTO, EventFilters, Events, EventSimpleDTO } from "../../../domain";

export const useGetEvents = () => { 
    const getEvent = async ( idEvent: number ): Promise<Events> => {
        try {
            const response = await EventsApp.getEvent(idEvent);
            if (!response || !response.ok) {
                toast.error(response?.msg || "Error al obtener eventos simples");
                return {} as Events;
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching simple events:", error);
            return {} as Events;
        }
    };
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

    const getEvents = async (type: number, q:EventFilters): Promise<EventSimpleDTO[]> => {
        try {
            const response = await EventsApp.getEvents( type, q );
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
    const getEventImage = async (eventId: number): Promise<EventFileDTO[]> => {
        try {
            const response = await EventsApp.getEventImage(eventId);
            if (!response || !response.ok) {
                toast.error(response?.msg || "Error al obtener la imagen del evento");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching event image:", error);
            return [];
        }
    }
    return { getEvent, getCategoriesEvent, getEvents, getEventImage };
}