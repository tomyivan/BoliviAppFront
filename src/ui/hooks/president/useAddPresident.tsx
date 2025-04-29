import { toast } from "react-toastify";
import { PresidentApp } from "../../../dependences/President.dependences"
import { PresidentForm } from "../../../domain";
export const useAddPresident = () => {
    const addPresident = async (data: PresidentForm): Promise<boolean> => {
        try {
            const response = await PresidentApp.addPresident(data);
            if (!response || !response.ok) {
                console.error("Error adding president:", response?.msg);
                toast.error(response?.msg || "Error al agregar el presidente");
                return false;
            }
            toast.success("Presidente agregado correctamente");
            return true;
        } catch (error) {
            console.error("Error adding president:", error);
            toast.error("Error al agregar el presidente");
            return false;
        }
    };
    const addPresidentImage = async (idPresident: number, image: File, fn: () => void): Promise<boolean> => {
        try {
            const response = await PresidentApp.addPresidentImage(idPresident, image);
            if (!response || !response.ok) {
                console.error("Error adding president image:", response?.msg);
                toast.error(response?.msg || "Error al agregar la imagen del presidente");
                return false;
            }
            toast.success("Imagen del presidente agregada correctamente");
            fn();
            return true;
        } catch (error) {
            console.error("Error adding president image:", error);
            toast.error("Error al agregar la imagen del presidente");
            return false;
        }
    }
    return { addPresident,
        addPresidentImage
     };
}