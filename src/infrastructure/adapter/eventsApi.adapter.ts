import { Events, IEventsDomain, ResponseDTO } from "../../domain";
import { EventFilters } from "../../domain/events/events";
import { FetchInstance } from "../api/fetch";
export class EventsApiAdapter implements IEventsDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getSimpleEvent(q?:EventFilters): Promise<ResponseDTO> {
        const params = 
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        this._http.loadToken();
        return this._http.get(`${this._baseUrl}/api/v1/events/simple`);
    }
    async addEvent(event: Events) :Promise<ResponseDTO>{
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.post(`${this._baseUrl}/api/v1/events/add`, { event });
    }  
    async getCategoriesEvent(): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        this._http.loadToken();
        return this._http.get(`${this._baseUrl}/api/v1/events/type/categories`);
    }
  
}