import { toast } from "react-toastify";
import { DepartamentsApp } from "../../../dependences/Departaments.dependences"
import { Departaments } from "../../../domain";
export const useDepartaments = () => {
    const getDepartaments = async (): Promise<Departaments[]> => {
        try {
            const response = await DepartamentsApp.getDepartaments();
            if (!response || !response.ok) {
                toast.error(response?.msg || "Error al obtener departamentos");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error("Error fetching departaments:", error);
            return [];
        }
    };

    return { getDepartaments };
}