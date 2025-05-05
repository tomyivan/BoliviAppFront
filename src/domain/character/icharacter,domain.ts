import { ResponseDTO } from "../http/response";
import { CharacterFilter } from "./character";
export interface ICharacterDomain {
    getCharacters: (q?: CharacterFilter) => Promise<ResponseDTO>;
}