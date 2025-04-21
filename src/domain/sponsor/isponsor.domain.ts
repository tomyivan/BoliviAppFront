import { Sponsor, ResponseDTO } from "..";

export interface ISponsorDomain {
    getSponsor: (id?: number) => Promise<ResponseDTO>;
    addSponsor: (sponsor: Sponsor) => Promise<ResponseDTO>;
    updateSponsor: (sponsor: Sponsor) => Promise<ResponseDTO>;
    deleteSponsor: (idSponsor: number) => Promise<ResponseDTO>;
}