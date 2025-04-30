import { FetchInstance } from "../api/fetch";
import { IPresidentDomain, ResponseDTO } from "../../domain";
import { Mandate, President, PresidentFilter } from "../../domain/president/president";
export class PresidentApiAdapter implements IPresidentDomain {
    private _http: FetchInstance;
    private _baseUrl: string;
    constructor() {
        this._http = new FetchInstance();
        this._baseUrl = import.meta.env.VITE_BASEURL;
    }
    async getPresidents(q?: PresidentFilter): Promise<ResponseDTO> {
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
        });
        const params = new URLSearchParams(q as any).toString();
        return this._http.get(`${this._baseUrl}/api/v1/president?${params}`);
    }

    async getPresidentById(idPresident: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/president/${idPresident}`);
    }

    async addPresident(data: President): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.post(`${this._baseUrl}/api/v1/president/add`, { president:data });
    }
    async deletePresidente(idPresident: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
            "Content-Type": "application/json",
        });
        return this._http.post(`${this._baseUrl}/api/v1/president/delete`,{president: {idPresident}});
    }
    async deletePresidentImage(idFile: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
            "Content-Type": "application/json",
        });
        return this._http.post(`${this._baseUrl}/api/v1/president/file/drop`, { president: { idFile:Number(idFile) } });
    }

    async updatePresident(data: President): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.put(`${this._baseUrl}/api/v1/president/update`, { president:data });
    }

    async addPresidentImage(idPresident: number, image: File): Promise<ResponseDTO> {
        const formData = new FormData();
        formData.append("file", image);
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
        });
        console.log("ok prsidenet")
        return this._http.upload(`${this._baseUrl}/api/v1/president/upload/${idPresident}`, formData);
    }

    async getPresidentImages(idPresident: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.get(`${this._baseUrl}/api/v1/president/images/${idPresident}`);
    }
    
    async addMandate(data: Mandate): Promise<ResponseDTO> {
        this._http.setHeader({
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        });
        return this._http.post(`${this._baseUrl}/api/v1/president/mandate/add`, { data });
    }
    async isFrontPage(idFile: number, idPresident: number): Promise<ResponseDTO> {
        this._http.setHeader({
            "x-token": localStorage.getItem("token") || "",
            "Content-Type": "application/json",
        });
        return this._http.put(`${this._baseUrl}/api/v1/president/file/isFrontPage`, { president: { idFile, idPresident } });
    }
}