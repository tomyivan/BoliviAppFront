import { SponsorApiAdapter } from "../infrastructure";
import { SponsorApplication } from "../application";
const sponsorApi = new SponsorApiAdapter();
const sponsorApp = new SponsorApplication(sponsorApi);
export { sponsorApi, sponsorApp };