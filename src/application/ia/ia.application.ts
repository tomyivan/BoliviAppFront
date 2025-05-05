import { IIADomain, UserPetition, ResponseDTO } from "../../domain";
export class IAApplication {
    private _iaDomain: IIADomain;
    constructor(iaDomain: IIADomain) {
        this._iaDomain = iaDomain;
    }
    async getResponseIA(promp: UserPetition): Promise<ResponseDTO> {
        return await this._iaDomain.getResponseIA(promp);
    }
}