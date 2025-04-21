import { ResourceApiAdapter } from "../infrastructure";
import { ResourceApplication } from "../application";
const resourceApi = new ResourceApiAdapter();
const resourceApp = new ResourceApplication(resourceApi);
export { resourceApi, resourceApp };