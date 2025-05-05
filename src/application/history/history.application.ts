import { History, HistoryFilter, HistoryForm, ResponseDTO } from "../../domain";
import { IHistoryDomain } from "../../domain";
export class HistoryApplication {
    constructor(private readonly _historyDomain: IHistoryDomain) {}
    async getHistory(params: HistoryFilter): Promise<ResponseDTO> {
        return await this._historyDomain.getHistory(params);
    }
    async getCategoryHistory(): Promise<ResponseDTO> {
        return await this._historyDomain.getCategoryHistory();
    }
    async createHistory(data: HistoryForm): Promise<ResponseDTO> {
        const newData = this.formatDate(data);
        return await this._historyDomain.createHistory(newData);
    }
    formatDate(data: HistoryForm): History {
        return {
            title: data.title,
            dateStart: data.dateStart,
            dateEnd: data.dateEnd,
            summary: data.summary,
            idCategory: Number(data.category.id),
            locations: [ {
                codDepartment: data.location.department.id,
                name: data.location.department.name,
                latitude: data.location.latitude? Number(data.location.latitude): undefined,
                longitude: data.location.longitude ? Number(data.location.longitude): undefined,
            } ],
            characters: data.characters.map((character) => ({
                idCharacter: Number(character.id),
            })),
            referencesHistory: data.referencesHistory.map((reference) => ({
                reference: reference.reference,
            })),
            description: data.description,
        }
    }
}