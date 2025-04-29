import { PoliticalParty, ResponseDTO } from "..";
export interface IPoliticalParty {
    getPoliticalParties: () => Promise<ResponseDTO>;
    createPoliticalParty: ( politicalParty: PoliticalParty ) => Promise<ResponseDTO>;
    updatePoliticalParty: ( politicalParty: PoliticalParty ) => Promise<ResponseDTO>;
    deletePoliticalParty: ( idPoliticalParty: number ) => Promise<ResponseDTO>;
}