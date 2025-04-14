import { CodeVerify, IAuthDomain, Register, ResetPassword, ResponseDTO } from "../../domain";
export class AuthApplication {
    constructor(private readonly _authDomain: IAuthDomain) {}
    async login(data: any):Promise<ResponseDTO> {
        return await this._authDomain.login(data);
    }
    async singUp(data: Register):Promise<ResponseDTO> {
        return await this._authDomain.singUp(data);
    }
    async verifyEmail(email: string):Promise<ResponseDTO> {
        return await this._authDomain.verifyEmail(email);
    }
    async sendCode( data: CodeVerify ):Promise<ResponseDTO>{
        return await this._authDomain.sendCode(data);
    }
    async sendCodeForReset( data: CodeVerify ):Promise<ResponseDTO>{
        return await this._authDomain.sendCodeForReset(data);
    }
    async existCode( data: ResetPassword ):Promise<ResponseDTO>{
        return await this._authDomain.existCode(data);
    }
    async updatePass( data: ResetPassword ):Promise<ResponseDTO>{
        return await this._authDomain.updatePass(data);
    }
}