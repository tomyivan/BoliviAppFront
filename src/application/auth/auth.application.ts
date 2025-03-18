import { IAuthDomain, Register, ResponseDTO } from "../../domain";
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
    async sendCode( data: Register ):Promise<ResponseDTO>{
        return await this._authDomain.sendCode(data);
    }
}