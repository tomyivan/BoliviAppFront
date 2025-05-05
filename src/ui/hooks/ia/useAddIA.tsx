import { toast } from "react-toastify";
import { iaApp } from "../../../dependences/ia.dependences";
import { IAResponseDTO, UserPetition } from "../../../domain";
export const useAddIA = () => {
    const addIA = async (promp: UserPetition): Promise<IAResponseDTO[]> => {
        try {
            const response = await iaApp.getResponseIA(promp );
            console.log("response", response);
            if (!response || !response.ok) {
                console.error("Error al obtener la respuesta de IA:", response?.msg);
                toast.error(response?.msg || "Error al obtener la respuesta de IA");
                return [];
            }
            return response.body.data;
        } catch (error) {
            toast.error("Error al obtener la respuesta de IA");
            throw new Error("Error al obtener la respuesta de IA");
        }
    };
    return { addIA };
}