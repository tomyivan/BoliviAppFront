import { PoliticalApp } from "../../../dependences/PoliticalParty.dependences";
import { toast } from "react-toastify";
import { PoliticalParty } from "../../../domain";
export const useGetPoliticalParty = () => {
    const getPoliticalParties = async (): Promise<PoliticalParty[]> => {
        try {
            const response = await PoliticalApp.getPoliticalParties();
            if( !response || !response?.ok  ) {
                toast.error("Error al obtener los partidos políticos");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.log(error);
            toast.error("Error al obtener los partidos políticos");
            return [];
        }
    }
    return {
        getPoliticalParties
    }
}
