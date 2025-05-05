import { History, HistoryFilter } from "./history";
import { ResponseDTO } from "../http/response";
export interface IHistoryDomain {
    getHistory: (params: HistoryFilter) => Promise<ResponseDTO>;
    getCategoryHistory: () => Promise<ResponseDTO>;
    createHistory: (data: History) => Promise<ResponseDTO>;
}