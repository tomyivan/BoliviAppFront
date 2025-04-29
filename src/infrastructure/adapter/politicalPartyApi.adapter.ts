import { IPoliticalParty, PoliticalParty, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class PoliticalPartyApiAdapter implements IPoliticalParty {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getPoliticalParties():Promise<ResponseDTO> {
        this._http.loadToken();
        return await this._http.get(`${this._baseUrl}/api/v1/politicalParty`);
    }
    async createPoliticalParty(politicalParty: PoliticalParty):Promise<ResponseDTO> {
        this._http.loadToken();
        return await this._http.post(`${this._baseUrl}/api/v1/politicalParty/add`, { politicalParty });
    }
    async updatePoliticalParty(politicalParty: PoliticalParty):Promise<ResponseDTO> {
        this._http.loadToken();
        return await this._http.put(`${this._baseUrl}/api/v1/politicalParty/update`, { politicalParty });
    }
    async deletePoliticalParty(idPoliticalParty: number):Promise<ResponseDTO> {
        this._http.loadToken();
        return await this._http.delete(`${this._baseUrl}/api/v1/politicalParty/delete`, { politicalParty: { idPoliticalParty } });
    }


}