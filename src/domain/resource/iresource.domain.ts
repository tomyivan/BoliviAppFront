import { Resource,  ResponseDTO } from "..";
export interface IResourceDomain {
    getResource: (id?: number) => Promise<ResponseDTO>;
    addResource: ( resource: Resource ) => Promise<ResponseDTO>;
    updateResource: ( resource: Resource ) => Promise<ResponseDTO>;
}