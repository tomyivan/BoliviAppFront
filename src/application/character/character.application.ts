import { CharacterFilter, ICharacterDomain } from "../../domain";
import { ResponseDTO } from "../../domain";
export class CharacterApplication {
    private _characterDomain: ICharacterDomain;
    constructor( characterDomain: ICharacterDomain ) {
        this._characterDomain = characterDomain;
    }
    async getCharacters( q: CharacterFilter ): Promise<ResponseDTO> {
        return await this._characterDomain.getCharacters( q );
    }
}