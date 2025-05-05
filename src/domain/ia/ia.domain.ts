import { ResponseDTO } from "../http/response";
import { UserPetition } from "./ia";
export interface IIADomain {
    getResponseIA: (promp: UserPetition) => Promise<ResponseDTO>;
} 