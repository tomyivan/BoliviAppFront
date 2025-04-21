import { toast } from "react-toastify";
import { resourceApp } from "../../../dependences/Resource.dependences";
import { Resource, ResourceDTO } from "../../../domain";
export const useResource = () => {
    const getResource = async (id: number): Promise<ResourceDTO> => {
        try {
            const response = await resourceApp.getResource(id);
            if( !response || !response?.ok ) {
                toast.error("Error al obtener el recurso");
                return {} as ResourceDTO;
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error("Error al obtener el recurso");
            return {} as ResourceDTO;
        }
    };
    const getResources = async (): Promise<ResourceDTO[]> => {
        try {
            const response = await resourceApp.getResources();
            if( !response || !response?.ok ) {
                toast.error("Error al obtener los recursos");
                return [];
            }
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error("Error al obtener los recursos");
            return [];
        }
    };
    const addResource = async (resource: Resource): Promise<Boolean> => {
        try {
            const response = await resourceApp.addResource(resource);
            if( !response || !response?.ok ) {
                toast.error( response?.msg || "Error al agregar el recurso");
                return false;
            }
            toast.success(response?.msg);
            return true;
        } catch (error) {
            console.error(error);
            toast.error("Error al agregar el recurso");
            return false;
        }
    };
    const updateResource = async (resource: Resource): Promise<Boolean> => {
        try {
            const response = await resourceApp.updateResource(resource);
            if( !response || !response?.ok ) {
                toast.error( response?.msg || "Error al actualizar el recurso");
                return false;
            }
            toast.success(response?.msg);
            return true;
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el recurso");
            return false;

        }
    };
    return { getResources, getResource, addResource, updateResource };
}