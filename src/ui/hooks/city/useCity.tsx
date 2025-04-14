import { CityApplication } from "../../../application";
import { List } from "../../../domain";
import { CityApiAdapter } from "../../../infrastructure";
import { toast } from "react-toastify";
const _cityAdapter = new CityApiAdapter();
const _cityApplication = new CityApplication(_cityAdapter);
export const useCity = () => {
    const getCountries = async ():Promise<List[]> => {
        try {
            const response = await _cityApplication.getCountries();
            if( !response || !response?.ok ) {
                toast.error( response?.msg || 'Error al obtener paises');
                return []
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error('Error al obtener paises');
            return []
        }
    };
    const getStates = async (iso2:string):Promise<List[]> => {
        try {
            const response = await _cityApplication.getStates(iso2);
            if( !response || !response?.ok ) {
                toast.error( response?.msg || 'Error al obtener estados');
                return []
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error('Error al obtener estados');
            return []
        }
    };
    return { getCountries, getStates };
}