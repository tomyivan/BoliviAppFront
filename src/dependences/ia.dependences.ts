import { IAApiAdapter } from "../infrastructure";
import { IAApplication } from "../application";
const iaApi = new IAApiAdapter();
const iaApp = new IAApplication(iaApi);
export { iaApi, iaApp };