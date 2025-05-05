import { FetchInstance } from "../api/fetch";
import { ResponseDTO, IIADomain, UserPetition } from "../../domain";
export class IAApiAdapter implements IIADomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getResponseIA(promp: UserPetition): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/ia/question`, {  promp });
    }
}
