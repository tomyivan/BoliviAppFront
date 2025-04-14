import {  ResponseDTO } from "..";

export interface ICityDomain {
    getCountries: () => Promise<ResponseDTO>;
    getStates: ( iso2: string ) => Promise<ResponseDTO>;
}