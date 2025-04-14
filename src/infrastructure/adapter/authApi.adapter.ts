import { CodeVerify, IAuthDomain, LoginForm, Register, ResetPassword, ResponseDTO } from "../../domain";
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
    
    async singUp(data: Register): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/register`, { auth: data });
    }
    
    async verifyEmail(email: string): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/verify-email`, { auth: { email } });
    }
    
    async sendCode( data: CodeVerify ): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/send-code`, { auth: { email:data.email } });
    }

    async sendCodeForReset( data: CodeVerify ): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/send-code-reset`, { auth:  data  });
    }

    async existCode( data: ResetPassword ): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/exist-code`, { auth:  data  });
    }

    async updatePass( data: ResetPassword ): Promise<ResponseDTO> {
        return await this._http.post<ResponseDTO>(`${this._baseUrl}/api/v1/p/auth/update-pass`, { auth: data  });
    }
    
}
