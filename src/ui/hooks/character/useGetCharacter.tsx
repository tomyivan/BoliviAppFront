import { characterApp } from "../../../dependences/Character.dependences";
import { CharacterFilter, DataSelect } from "../../../domain";
import { toast } from "react-toastify";
export const useGetCharacter = () => {
    const getCharactersList = async ( q?: CharacterFilter ): Promise<DataSelect[]> => {
        try {
            const response = await characterApp.getCharacters( {...q, type: 'list'} );
            if( !response || !response.ok){
                toast.error( response.msg || "Error fetching characters" );
                return [];
            }
            return response.body.data;
        } catch ( error ) {
            console.error( "Error fetching characters:", error );
            throw error;
        }
    };
    return { getCharactersList };
}