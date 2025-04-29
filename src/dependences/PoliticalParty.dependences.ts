import { PoliticalPartyApiAdapter } from "../infrastructure";
import { PoliticalPartyApplication } from "../application";
const PoliticalApi = new PoliticalPartyApiAdapter();
export const PoliticalApp = new PoliticalPartyApplication(PoliticalApi);