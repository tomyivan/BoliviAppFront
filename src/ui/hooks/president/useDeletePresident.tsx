import { toast } from "react-toastify";
import { PresidentApp } from "../../../dependences/President.dependences";
export const useDeletePresident = () => {
    const deletePresident = async (idPresident: number): Promise<boolean> => {
        try {
            const response = await PresidentApp.deletePresidente(idPresident);
            if (!response || !response.ok) {
                console.error("Error deleting president:", response?.msg);
                toast.error(response?.msg || "Error al eliminar el presidente");
                return false;
            }
            toast.success("Presidente eliminado correctamente");
            return true;
        } catch (error) {
            console.error("Error deleting president:", error);
            toast.error("Error al eliminar el presidente");
            return false;
        }
    };
    const deletePresidentImage = async (idFile: number): Promise<boolean> => {
        try {
            const response = await PresidentApp.deletePresidentImage(idFile);
            console.log("response", response);
            if (!response || !response.ok) {
                console.error("Error deleting president image:", response?.msg);
                toast.error(response?.msg || "Error al eliminar la imagen del presidente");
                return false;
            }
            toast.success("Imagen del presidente eliminada correctamente");
            return true;
        } catch (error) {
            console.error("Error deleting president image:", error);
            toast.error("Error al eliminar la imagen del presidente");
            return false;
        }
    }
    return { deletePresident, deletePresidentImage };
}