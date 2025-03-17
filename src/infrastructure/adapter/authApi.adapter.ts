import { IAuthDomain, LoginForm, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";

export class AuthApiAdapter implements IAuthDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async login(data:LoginForm): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/login`, { auth: data });
    }
    async singUp(data: any): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/auth/singUp`, data);
    }
}
