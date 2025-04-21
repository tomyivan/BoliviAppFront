import { toast } from "react-toastify";
import { MiscellaneousApp } from "../../../dependences/Misecellaneous.dependences" 
import { DataSelect } from "../../../domain";
export const useGetMiscellaneous = () => {
    const getMeasures = async (): Promise<DataSelect[]> => {
        try {
            const response = await MiscellaneousApp.getMeasures();
            if ( !response ||  !response?.ok ) {
                toast.error("Error al cargar los datos de las medidas");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar los datos de las medidas");
            return [];
        }
    };
    
    return { getMeasures };
}