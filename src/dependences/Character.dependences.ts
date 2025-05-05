import { CharacterApplication } from "../application";
import { CharacterApiAdapter } from "../infrastructure";
const characterApi = new CharacterApiAdapter();
const characterApp = new CharacterApplication( characterApi );
export { characterApp };