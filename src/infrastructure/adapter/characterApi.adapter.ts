import { ICharacterDomain, CharacterFilter, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class CharacterApiAdapter implements ICharacterDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getCharacters( q?: CharacterFilter ): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        })
        const params = new URLSearchParams(q as any).toString();
        return await this._http.get<any>(`${this._baseUrl}/api/v1/character/?${params}`);
    }
}