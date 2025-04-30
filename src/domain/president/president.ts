import { DataSelect } from "../input/input";

export interface PresidentFilter {
    idPresident?: number;
    idPoliticalParty?: number;    
}

export interface PresidentForm {
    biography: string;
    name: string;   
    lastName: string;   
    politicalParty: DataSelect;
    dateBirthday: string;
    dateDeath: string;
    importantEvents: string;
    mandates?: MandateForm[];
}

export interface President {
    idPresident?: number;
    biography: string;
    name: string;   
    lastname: string;   
    idPoliticalParty?: number;
    politicalParty?: string;
    dateBirthday: string;
    dateDeath: string;
    picture?: string;
    importantEvents: string;
    mandates?: Mandate[];
}

export interface PresidentDTO {
    idPresident: number;
    biography: string;
    name: string;   
    lastname: string;   
    idPoliticalParty: number;
    politicalParty: string;    
    dateBirthday?: string;
    dateDeath?: string;
    importantEvents?: string;
    picture?: string;
    mandates?: Mandate[];
    images?: PresidentImage[];
}

export interface PresidentImage {
    idFile?: number;
    idPresident: number;
    name: string;
    isFrontPage: 1 | 0;
}

export interface MandateForm {
    nroMandate: number;
    startDate: string;
    endDate: string;
    observation: string;
}

export interface Mandate {
    idMandate?: number;
    nroMandate: number;
    startDate: string;
    endDate: string;
    observation: string;
}