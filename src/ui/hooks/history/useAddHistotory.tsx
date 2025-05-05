import { historyApp } from "../../../dependences/History.dependences";
import { toast } from "react-toastify";
import { HistoryForm } from "../../../domain";
export const useAddHistory = () => {
    const addHistory = async (data: HistoryForm): Promise<boolean> => {
        try {
            const response = await historyApp.createHistory(data);
            if (!response || !response.ok) {
                toast.error("Error al crear la historia");
                return false;
            }
            toast.success("Historia creada con exito");
            return true;
        } catch (error) {
            toast.error("Error al crear la historia");
            console.error("Error al crear la historia", error);
            return false;
        }
    };
    return { addHistory };
}