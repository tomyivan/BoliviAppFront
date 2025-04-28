import { Events, EventsForm, ResponseDTO, EventFileDTO } from "../../domain";
import { EventFilters } from "../../domain/events/events";
import { EventsApiAdapter } from "../../infrastructure";
export class EventsApplication {
    constructor(private readonly _eventsApi: EventsApiAdapter) {
        this._eventsApi = new EventsApiAdapter();
    }
    getEvent(idEvent: number): Promise<ResponseDTO> {
        return this._eventsApi.getEvent(idEvent);
    }
    async getEvents( type: number, q: EventFilters) {
        if ( type === 1 ) {
            return this._eventsApi.getSimpleEvent(q);
        }
    }
    async addEvent(event: EventsForm): Promise<ResponseDTO> {
        const newData = this.formatterEvent(event);
        return this._eventsApi.addEvent(newData);
    }
    async updateEvent(event: EventsForm, idEvent: number): Promise<ResponseDTO> {
        const newData = this.formatterEvent(event, idEvent);
        return this._eventsApi.updateEvent(newData);
    }
    async getCategoriesEvent() {
        return this._eventsApi.getCategoriesEvent();
    }

    addEventImage(eventId: number, image: File): Promise<ResponseDTO> {
        return this._eventsApi.addEventImage(eventId, image);
    }
    getEventImage(eventId: number): Promise<ResponseDTO> {
        return this._eventsApi.getEventImage(eventId);
    }
    deleteFile(data: EventFileDTO): Promise<ResponseDTO> {
        return this._eventsApi.deleteFile(data);
    }
    formatterEvent(event: EventsForm, idEvent?: number): Events {
        return  {
            idEvent: idEvent,
            name: event.name,
            detail: event.detail,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            idCategory: Number(event.category.id),
            location: {
                name: event.location.name,
                latitude: event.location.latitude ? Number(event.location.latitude) : undefined,
                longitude: event.location.longitude ? Number(event.location.longitude) : undefined,
                codDepartment: String(event.location.departament.id),
            },
            resources: event.resources.map((resource) => ({
                idResource: Number(resource.resource.id),
                amount: resource.amount,
                stock: resource.stock,
            })),
            sponsors: event.sponsors.map((sponsor) => ({
                idSponsor: Number(sponsor.sponsor.id),
                product: sponsor.product,
                stock: sponsor.stock,
                observation: sponsor.observation,
                idMeasure: Number(sponsor.measure.id),
            })),
        }
    }
    getEventInfo(idEvent: number): Promise<ResponseDTO> {
        return this._eventsApi.getEventInfo(idEvent);
    }

    deleteEvent(idEvent: number): Promise<ResponseDTO> {
        return this._eventsApi.deleteEvent(idEvent);
    }

}