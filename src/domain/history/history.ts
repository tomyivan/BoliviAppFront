import { Departaments } from "../departaments/departaments";
import { DataSelect } from "../input/input";

export interface History {
    title:             string;
    dateStart:         string;
    dateEnd:           string;
    summary:           string;
    idCategory:        number;
    locations:         Location[];
    characters:        Character[];
    referencesHistory: ReferencesHistory[];
    description:       string;
}

export interface Character {
    idCharacter: number;
}

export interface Location {
    codDepartment: string;
    name:          string;
    latitude?:      number;
    longitude?:     number;
}

export interface ReferencesHistory {
    reference: string;
}


export interface HistoryFilter {
    idHistory?: number;
    title?: string;
    date?: string;
    from?: string;
    to?: string;
    summary?: string;
    idCategory?: string;
    type: 'simple' | 'full';
}



export interface HistoryForm {
    title: string;
    dateStart: string;  
    dateEnd: string;
    summary: string;
    category: DataSelect,
    referencesHistory: ReferencesHistory[];
    description: string;
    location: LocationHistoryForm;
    characters: DataSelect[];
    
}

export interface ReferencesHistory {
    reference: string
}

export interface LocationHistoryForm {
    location:   string;
    latitude?:   number;
    longitude?:  number;
    department: Departaments;
}

export interface HistorySimpleDTO {
    idHistory: number;
    title: string;
    dateStart: string;
    dateEnd: string;
    summary: string;
    category: string;
}