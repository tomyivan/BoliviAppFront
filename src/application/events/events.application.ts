import { Events, EventsForm, ResponseDTO } from "../../domain";
import { EventsApiAdapter } from "../../infrastructure";
export class EventsApplication {
    constructor(private readonly _eventsApi: EventsApiAdapter) {
        this._eventsApi = new EventsApiAdapter();
    }
    async addEvent(event: EventsForm): Promise<ResponseDTO> {
        const newData:Events = {
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
        console.log(newData);
        return this._eventsApi.addEvent(newData);
    }
    async getCategoriesEvent() {
        return this._eventsApi.getCategoriesEvent();
    }
}