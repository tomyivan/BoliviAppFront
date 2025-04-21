import { MiscellaneousApiAdapter } from "../../infrastructure";

export class MiscellaneousApplication {
    constructor(private readonly _miscellaApi: MiscellaneousApiAdapter) {
        this._miscellaApi = new MiscellaneousApiAdapter();
    }
    async getMeasures() {
        return await this._miscellaApi.getMeasures();
    }
}