import { Events, IEventsDomain, ResponseDTO } from "../../domain";
import { EventFileDTO, EventFilters } from "../../domain/events/events";
import { FetchInstance } from "../api/fetch";
export class EventsApiAdapter implements IEventsDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getEvent(idEvent: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/events/byId/${idEvent}`);
    }
    async getSimpleEvent(q?:EventFilters): Promise<ResponseDTO> {
        const encodedQuery = new URLSearchParams(q as any).toString();
        this._http.loadToken();
        return this._http.get(`${this._baseUrl}/api/v1/events/simple?${encodedQuery}`);
    }
    async addEvent(event: Events) :Promise<ResponseDTO>{
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.post(`${this._baseUrl}/api/v1/events/add`, { event });
    }
    async updateEvent(event: Events) :Promise<ResponseDTO>{
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.put(`${this._baseUrl}/api/v1/events/update`, { event });
    }
    async getCategoriesEvent(): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/events/type/categories`);
    }
    async addEventImage(eventId: number, image: File): Promise<ResponseDTO> {
        const formData = new FormData();
        formData.append("file", image);
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
        });

        return this._http.upload(`${this._baseUrl}/api/v1/events/upload/${eventId}`, formData);          
    }
    async getEventImage(eventId: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/events/images/${eventId}`);
    }
    async deleteFile(data: EventFileDTO) : Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.delete(`${this._baseUrl}/api/v1/events/file/drop`, { eventFile: data });
    }
}