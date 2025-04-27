import { ResponseDTO } from "./response";
export interface IHttp {
    get: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | ResponseDTO>;
    post: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | ResponseDTO>;
    put: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | ResponseDTO>;
    delete: <T>(path: string, params?: any, config?: any) => Promise<T | any>;
    setHeader: (token: any) => void;   
    upload: <T>(path: string, params?: any, config?: any) => Promise<T | ResponseDTO>;
}