import { Events, IEventsDomain, ResponseDTO } from "../../domain";
import { FetchInstance } from "../api/fetch";
export class EventsApiAdapter implements IEventsDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async addEvent(event: Events) :Promise<ResponseDTO>{
        this._http.loadToken();
        return this._http.post(`${this._baseUrl}/api/v1/events/add`, { event });
    }  
    async getCategoriesEvent(): Promise<ResponseDTO> {
        this._http.loadToken();
        return this._http.get(`${this._baseUrl}/api/v1/events/type/categories`);
    }
  
}