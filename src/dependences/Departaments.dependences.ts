import { DepartamentsApiAdapter } from "../infrastructure";
import { DepartamentsApplication } from "../application";
const DepartamentsApi = new DepartamentsApiAdapter();
const DepartamentsApp = new DepartamentsApplication(DepartamentsApi);
export { DepartamentsApp, DepartamentsApi };