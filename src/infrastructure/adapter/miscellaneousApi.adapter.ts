import { IMiscellaneousDomain, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";

export class MiscellaneousApiAdapter implements IMiscellaneousDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getMeasures(): Promise<ResponseDTO> {
        this._http.loadToken();
        return await this._http.get<ResponseDTO>(`${this._baseUrl}/api/v1/dependences/measures`);
    }
}