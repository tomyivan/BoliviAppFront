import { SponsorApiAdapter } from "../../infrastructure";
export class SponsorApplication {
    constructor(private readonly _sponsorApi: SponsorApiAdapter) {
        this._sponsorApi = new SponsorApiAdapter();
    }
    async getSponsors() {
        return await this._sponsorApi.getSponsor();
    }
    async getSponsor(id: number) {
        return await this._sponsorApi.getSponsor(id);
    }
    async addSponsor(sponsor: any) {
        return await this._sponsorApi.addSponsor(sponsor);
    }
    async updateSponsor(sponsor: any) {
        return await this._sponsorApi.updateSponsor(sponsor);
    }
}