import { ICityDomain,  ResponseDTO } from "../../domain";

export class CityApplication {
    constructor(private readonly _cityDomain: ICityDomain) {}
    async getCountries():Promise<ResponseDTO> {
        return this._cityDomain.getCountries();
    }
    async getStates( iso2: string ):Promise<ResponseDTO> {
        return  this._cityDomain.getStates(iso2);
    }
}