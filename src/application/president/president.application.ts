import { IPresidentDomain, President, PresidentForm } from "../../domain";
export class PresidentApplication {
    constructor(private _president: IPresidentDomain) {}
    getPresidents(q?: any) {
        return this._president.getPresidents(q);
    }

    getPresidentImages(idPresident: number) {
        return this._president.getPresidentImages(idPresident);
    }

    async addPresident(president: PresidentForm) {
        const presidentFormated = this.formatterPresident(president);
        console.log("presidentFormated", presidentFormated);
        return this._president.addPresident(presidentFormated);
    }

    async updatePresident(president: PresidentForm, idPresident: number) {
        const presidentFormated = this.formatterPresident(president, idPresident);
        return this._president.updatePresident(presidentFormated);
    }

    getPresidentById(idPresident: number) {
        return this._president.getPresidentById(idPresident);
    }
    
    addPresidentImage(idPresident: number, image: File) {
        return this._president.addPresidentImage(idPresident, image);
    }
    addMandate(mandate: any) {
        return this._president.addMandate(mandate);
    }
    formatterPresident(president: PresidentForm, idPresident?:number):President {
        return {
            idPresident: idPresident,
            name: president.name,
            lastname: president.lastName,
            idPoliticalParty: Number(president.politicalParty.id),
            dateBirthday: president.dateBirthday,
            dateDeath: president.dateDeath,
            biography: president.biography,
            importantEvents: president.importantEvents,
            mandates: president.mandates?.map((mandate) => ({
                nroMandate: mandate.nroMandate,
                startDate: mandate.startDate,
                endDate: mandate.endDate,
                observation: mandate.observation,
            })),
        };
    }
}