import { PresidentApiAdapter } from "../infrastructure";
import { PresidentApplication } from "../application";
const PresidentApi = new PresidentApiAdapter();
const PresidentApp = new PresidentApplication(PresidentApi);
export { PresidentApp, PresidentApi };