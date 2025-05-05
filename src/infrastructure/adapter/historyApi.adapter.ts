import { History, IHistoryDomain } from "../../domain";
import { ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class HistoryApiAdapter implements IHistoryDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getHistory(params: any): Promise<ResponseDTO> {
        const encodedQuery = new URLSearchParams(params as any).toString();
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/history?${encodedQuery}`);
    }
    async getCategoryHistory(): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/history/category`);
    }
    async createHistory(data: History): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.post(`${this._baseUrl}/api/v1/history/add`, { history: data });
    }
}