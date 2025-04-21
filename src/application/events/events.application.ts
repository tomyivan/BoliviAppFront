import { Events } from "../../domain";
import { EventsApiAdapter } from "../../infrastructure";
export class EventsApplication {
    constructor(private readonly _eventsApi: EventsApiAdapter) {
        this._eventsApi = new EventsApiAdapter();
    }
    async addEvent(event: Events) {
        return this._eventsApi.addEvent(event);
    }
    async getCategoriesEvent() {
        return this._eventsApi.getCategoriesEvent();
    }
}