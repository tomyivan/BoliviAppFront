import { MiscellaneousApplication } from "../application";
import { MiscellaneousApiAdapter } from "../infrastructure";
const MiscellaneousApi = new MiscellaneousApiAdapter();
const MiscellaneousApp = new MiscellaneousApplication(MiscellaneousApi);
export { MiscellaneousApp, MiscellaneousApi };