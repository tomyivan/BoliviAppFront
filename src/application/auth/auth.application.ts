import { IAuthDomain, ResponseDTO } from "../../domain";
export class AuthApplication {
    constructor(private readonly _authDomain: IAuthDomain) {}
    async login(data: any):Promise<ResponseDTO> {
        return await this._authDomain.login(data);
    }
    async singUp(data: any):Promise<ResponseDTO> {
        return await this._authDomain.singUp(data);
    }

}