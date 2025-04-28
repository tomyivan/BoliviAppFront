import { ResponseDTO, Events } from "..";
import { EventFileDTO, EventFilters } from "./events";
export interface IEventsDomain {
    getSimpleEvent: (q?: EventFilters) => Promise<ResponseDTO>;
    // getEvents: () => Promise<ResponseDTO>;
    getEvent: (idEvent: number) => Promise<ResponseDTO>;  
    getCategoriesEvent: () => Promise<ResponseDTO>;  
    addEvent: (event: Events) => Promise<ResponseDTO>;
    addEventImage: (eventId: number, image: File) => Promise<ResponseDTO>;
    getEventImage: (eventId: number) => Promise<ResponseDTO>;
    deleteFile: (data: EventFileDTO) => Promise<ResponseDTO>;
    updateEvent: (event: Events) => Promise<ResponseDTO>;
    getEventInfo: (idEvent: number) => Promise<ResponseDTO>;
}