import { toast } from "react-toastify";
import { PresidentApp } from "../../../dependences/President.dependences"
import { President, PresidentDTO, PresidentImage } from "../../../domain";

export const useGetPresident = () => {
    const getPresidents = async ():Promise<President[]> => {
        try {
            const response = await PresidentApp.getPresidents();
            if (!response || !response.ok) {
                console.error("Error fetching presidents:", response?.msg);
                toast.error(response?.msg || "Error al obtener los presidentes");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching presidents:", error);
            toast.error("Error al obtener los presidentes");
            return [];
        }
    };
    const getPresidentById = async (idPresident: number):Promise<PresidentDTO> => {
        try {
            const response = await PresidentApp.getPresidentById(idPresident);
            if (!response || !response.ok) {
                console.error("Error fetching president:", response?.msg);
                toast.error(response?.msg || "Error al obtener el presidente");
                return {} as PresidentDTO;
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching president:", error);
            toast.error("Error al obtener el presidente");
            return {} as PresidentDTO;
        }
    }
    const getPresidentImage = async (idPresident: number):Promise<PresidentImage[]> => {  
        try {
            const response = await PresidentApp.getPresidentImages(idPresident);
            if (!response || !response.ok) {
                console.error("Error fetching president image:", response?.msg);
                toast.error(response?.msg || "Error al obtener la imagen del presidente");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching president image:", error);
            toast.error("Error al obtener la imagen del presidente");
            return [];
        }
    }
    return { getPresidents, getPresidentById, getPresidentImage };
}