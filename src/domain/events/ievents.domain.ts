import { ResponseDTO, Events } from "..";
import { EventFilters } from "./events";
export interface IEventsDomain {
    getSimpleEvent: (q?: EventFilters) => Promise<ResponseDTO>;
    // getEvents: () => Promise<ResponseDTO>;
    // getEvent: (id: number) => Promise<ResponseDTO>;  
    getCategoriesEvent: () => Promise<ResponseDTO>;  
    addEvent: (event: Events) => Promise<ResponseDTO>;
    // updateEvent: (event: Events) => Promise<ResponseDTO>;
}