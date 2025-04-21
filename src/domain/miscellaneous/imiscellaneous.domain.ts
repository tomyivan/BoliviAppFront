import { ResponseDTO } from "../http/response";

export interface IMiscellaneousDomain {
    getMeasures: () => Promise<ResponseDTO>;
}