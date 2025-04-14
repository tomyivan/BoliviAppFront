import { FetchInstance } from "../api/fetch";
import { ICityDomain, ResponseDTO } from "../../domain";
export class CityApiAdapter implements ICityDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getCountries(): Promise<ResponseDTO> {
        return await this._http.get<ResponseDTO>(`${this._baseUrl}/api/v1/p/city/all`);
    }
    async getStates(iso2: string): Promise<ResponseDTO> {
        return await this._http.get<ResponseDTO>(`${this._baseUrl}/api/v1/p/city/state/${iso2}`);
    }
}