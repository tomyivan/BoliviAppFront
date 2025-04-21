import { ISponsorDomain, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class SponsorApiAdapter implements ISponsorDomain{
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    getSponsor(id?: number): Promise<ResponseDTO> {
        this._http.loadToken();
        return  this._http.get(`${this._baseUrl}/api/v1/sponsor/${id}`);
    }
    addSponsor(sponsor: any): Promise<ResponseDTO> {
        this._http.loadToken();
        return  this._http.post(`${this._baseUrl}/api/v1/sponsor/add`, {sponsor});
        
    }
    updateSponsor(sponsor: any): Promise<ResponseDTO> {
        this._http.loadToken();
        return this._http.put(`${this._baseUrl}/api/v1/sponsor/update`, { sponsor });       
    }
    deleteSponsor(idSponsor: number): Promise<ResponseDTO> {
        this._http.loadToken();
        return this._http.delete(`${this._baseUrl}/api/v1/sponsor/delete/${idSponsor}`);
    }
}