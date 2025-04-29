import { PresidentForm } from "../../../domain";
import { toast } from "react-toastify";
import { PresidentApp } from "../../../dependences/President.dependences";
export const useUpdatePresident = () => {
    const updatePresident = async (data: PresidentForm, idPresident: number): Promise<boolean> => {
        try {
            const response = await PresidentApp.updatePresident(data, idPresident);
            if (!response || !response.ok) {
                console.error("Error updating president:", response?.msg);
                toast.error(response?.msg || "Error al actualizar el presidente");
                return false;
            }
            toast.success("Presidente actualizado correctamente");
            return true;
        } catch (error) {
            console.error("Error updating president:", error);
            toast.error("Error al actualizar el presidente");
            return false;
        }
    };

    return { updatePresident };
}