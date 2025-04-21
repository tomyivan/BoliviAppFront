import { toast } from "react-toastify";
import { sponsorApp } from "../../../dependences/Sponsor.dependences";
import { DataSelect, Sponsor } from "../../../domain";
export const useSponsor = () => {
    const getSponsor = async (id: number): Promise<DataSelect> => {
        try {
            const response = await sponsorApp.getSponsor(id);
            if( !response || !response?.ok ) {
                toast.error("Error al obtener el patrocinador");
                return {} as DataSelect;
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error("Error al obtener el patrocinador");
            return {} as DataSelect;
        }
    };
    const getSponsors = async (): Promise<DataSelect[]> => {
        try {
            const response = await sponsorApp.getSponsors();
            if( !response || !response?.ok ) {
                toast.error("Error al obtener los patrocinadores");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error("Error al obtener los patrocinadores");
            return [];
        }
    };

    const addSponsor = async (sponsor: Sponsor): Promise<Boolean> => {
        try {
            const response = await sponsorApp.addSponsor(sponsor);
            if( !response || !response?.ok ) {
                toast.error( response?.msg || "Error al agregar el patrocinador");
                return false;
            }
            toast.success(response?.msg);
            return true;
        } catch (error) {
            console.log(error);
            toast.error("Error al actualizar el patrocinador"); 
            return false;
        }
    };

    const updateSponsor = async (sponsor: Sponsor): Promise<Boolean> => {
        try {
            const response = await sponsorApp.updateSponsor(sponsor);
            if( !response || !response?.ok ) {
                toast.error( response?.msg || "Error al actualizar el patrocinador");
                return false;
            }
            toast.success(response?.msg);
            return true;
        } catch (error) {
            console.log(error);
            toast.error("Error al actualizar el patrocinador"); 
            return false;
        }
    };


    return { getSponsors, getSponsor, addSponsor, updateSponsor };    
}