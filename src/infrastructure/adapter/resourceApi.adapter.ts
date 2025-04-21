import { IResourceDomain, Resource, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class ResourceApiAdapter implements IResourceDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    getResource(id?: number): Promise<ResponseDTO> {
        this._http.loadToken();
        return  this._http.get(`${this._baseUrl}/api/v1/resource/${id}`);
    }
    addResource(resource: Resource): Promise<ResponseDTO> {
        this._http.loadToken();
        return  this._http.post(`${this._baseUrl}/api/v1/resource/add`, {resource});
       
    }
    updateResource(resource: Resource): Promise<ResponseDTO> {
        this._http.loadToken();
        return this._http.put(`${this._baseUrl}/api/v1/resource/update`, { resource });       
    }
}