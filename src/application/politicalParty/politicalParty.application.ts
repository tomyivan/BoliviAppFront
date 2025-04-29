import { IPoliticalParty } from "../../domain";
export class PoliticalPartyApplication {
    constructor(private _politicalParty: IPoliticalParty) {}
    getPoliticalParties() {
        return this._politicalParty.getPoliticalParties();
    }
    createPoliticalParty(politicalParty: any) {
        return this._politicalParty.createPoliticalParty(politicalParty);
    }
    updatePoliticalParty(politicalParty: any) {
        return this._politicalParty.updatePoliticalParty(politicalParty);
    }
    deletePoliticalParty(idPoliticalParty: number) {
        return this._politicalParty.deletePoliticalParty(idPoliticalParty);
    }
}