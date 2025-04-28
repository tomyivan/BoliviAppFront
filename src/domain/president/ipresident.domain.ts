import { ResponseDTO } from "../http/response";
import {  Mandate, President } from "./president";
export interface IPresidentDomain {
    addPresident: (data: President) => Promise<ResponseDTO>;
    addPresidentImage: (idPresident: number, image: File) => Promise<ResponseDTO>;
    addMandate: ( data: Mandate) => Promise<ResponseDTO>;
}