import {  IDepartamentsDomain, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class DepartamentsApiAdapter implements IDepartamentsDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getDepartaments(): Promise<ResponseDTO> {
        return await this._http.get(`${this._baseUrl}/api/v1/dependences/departaments`);
    }
}