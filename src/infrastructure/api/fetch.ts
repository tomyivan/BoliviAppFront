import { IHttp } from "../../domain";
export class FetchInstance implements IHttp {
    private header: any;
    constructor() {
        this.header = {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        };
    }
    setHeader(header: any): void {
        this.header = header
    }
    loadToken(): void {
        this.header = {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token") || "",
        };
    }
    async get<T>(path: string,  config?: any): Promise<T | any> {       
        const response = await fetch(path, {
            method: "GET",
            headers: this.header,
            // body: JSON.stringify(params),
            ...config,
        });
        return await response.json();
    }
    async post<T>(path: string, params?: Record<string, any>, config?: any): Promise<T | any> {
        const response = await fetch(path, {
            method: "POST",
            headers: this.header,
            body: JSON.stringify(params),
            ...config,
        });
        return await response.json();
    }
    async put<T>(path: string, params?: Record<string, any>, config?: any): Promise<T | any> {
        const response = await fetch(path, {
            method: "PUT",
            headers: this.header,
            body: JSON.stringify(params),
            ...config,
        });
        return await response.json();
    }
    async delete<T>(path: string, params?: any, config?: any): Promise<T | any> {
        const response = await fetch(path, {
            method: "DELETE",
            headers: this.header,
            body: JSON.stringify(params),
            ...config,
        });
        return await response.json();
    }
    async upload<T>(path: string, params?: any, config?: any): Promise<T | any> {
        const response = await fetch(path, {
            method: "POST",
            headers: this.header,
            body: params,
            ...config,
        });
        return await response.json();
    }
}