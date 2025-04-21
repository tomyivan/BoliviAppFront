import { ResponseDTO, Events } from "..";
export interface IEventsDomain {
    // getEvents: () => Promise<ResponseDTO>;
    // getEvent: (id: number) => Promise<ResponseDTO>;  
    getCategoriesEvent: () => Promise<ResponseDTO>;  
    addEvent: (event: Events) => Promise<ResponseDTO>;
    // updateEvent: (event: Events) => Promise<ResponseDTO>;
}