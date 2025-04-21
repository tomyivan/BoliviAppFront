import { EventsApplication } from "../application";
import { EventsApiAdapter } from "../infrastructure";
const EventsApi = new EventsApiAdapter();
const EventsApp = new EventsApplication(EventsApi);
export { EventsApp, EventsApi };