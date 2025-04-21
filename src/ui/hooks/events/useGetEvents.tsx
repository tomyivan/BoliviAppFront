import { toast } from "react-toastify";
import { EventsApp } from "../../../dependences/Events.dependences"
import { DataSelect } from "../../../domain";
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

    return { getCategoriesEvent };
}