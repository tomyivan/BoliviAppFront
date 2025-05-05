import { historyApp } from "../../../dependences/History.dependences";
import { toast } from "react-toastify";
import { DataSelect, HistoryFilter, HistorySimpleDTO } from "../../../domain";
export const useGetHistory = () => {
    const getHistorySimple = async (params?: HistoryFilter): Promise<HistorySimpleDTO[]> => {
        try {
            const response = await historyApp.getHistory({...params,type: "simple"});
            if (!response || !response.ok){
                toast.error("Error al obtener el historial");
                return [];
            }
            return response.body.data;
        } catch (error) {
            toast.error("Error al obtener el historial");
            console.error("Error al obtener el historial", error);
            return [];
        }
    };
    const getCategoryHistory = async (): Promise<DataSelect[]> => {
        try {
            const response = await historyApp.getCategoryHistory();
            if (!response || !response.ok) {
                toast.error("Error al obtener las categorias del historial");
                return [];
            }
            return response.body.data;
        } catch (error) {
            toast.error("Error al obtener las categorias del historial");
            console.error("Error al obtener las categorias del historial", error);
            return [];
        }
    }
    return { getHistorySimple, getCategoryHistory };
}