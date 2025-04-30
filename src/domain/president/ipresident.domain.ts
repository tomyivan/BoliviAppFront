import { ResponseDTO } from "../http/response";
import {  Mandate, President, PresidentFilter } from "./president";
export interface IPresidentDomain {
    getPresidents: (q: PresidentFilter) => Promise<ResponseDTO>;    
    addPresident: (data: President) => Promise<ResponseDTO>;
    updatePresident: (data: President) => Promise<ResponseDTO>;
    deletePresidente( idPresident: number): Promise<ResponseDTO>;
    addPresidentImage: (idPresident: number, image: File) => Promise<ResponseDTO>;
    addMandate: ( data: Mandate) => Promise<ResponseDTO>;
    getPresidentById: (idPresident: number) => Promise<ResponseDTO>;
    getPresidentImages: (idPresident: number) => Promise<ResponseDTO>;
    deletePresidentImage: ( idFile: number ) => Promise<ResponseDTO>;
    isFrontPage: (idFile: number, idPresident:number) => Promise<ResponseDTO>;
}