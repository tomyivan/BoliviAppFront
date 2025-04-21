import { ResponseDTO } from "../http/response";
export interface IDepartamentsDomain {
    getDepartaments: () => Promise<ResponseDTO>;
}