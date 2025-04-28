import { Sponsor } from "..";
import { Departaments } from "../departaments/departaments";
import { DataSelect } from "../input/input";

export interface EventInfo {
    idEvent:   number;
    date:      string;
    startTime: string;
    endTime:   string;
    name:      string;
    detail:    string;
    category:  string;
    location:  LocationInfo;
    sponsors:  Sponsor[];
}

export interface LocationInfo {
    idLocation: number;
    location:   string;
    latitude:   number;
    longitude:  number;
    department: string;
}


export interface EventFilters {
    date?: string;
    startTime?: string;
    endTime?: string;
    name?: string;
    detail?: string;
    idCategory?: number;
    from: string;
    to: string;

}

export interface EventSimpleDTO {
    idEvent: number;
    date: string;
    startTime: string;
    endTime: string;
    title: string;
}

export interface EventsForm {
    name:       string;
    detail:     string;
    date:       string;
    startTime:  string;
    endTime:    string;
    category: DataSelect;
    location:   LocationForm;
    resources:  ResourceEventForm[];
    sponsors:   SponsorEventForm[];
}

export interface Events {
    idEvent?:    number;
    name:        string;
    detail:      string;
    date:        string;
    startTime:   string;
    endTime:     string;
    idCategory:  number;
    location:    LocationEvent;
    resources:   ResourceEvent[];
    sponsors:    SponsorEvent[];
}

export interface LocationEvent {
    name:        string;
    latitude?:    number;
    longitude?:   number;
    codDepartment: string;
}

export interface LocationForm {
    name:          string;
    latitude?:      number ;
    longitude?:     number;
    departament: Departaments;
}

export interface ResourceEvent {
    idResource: number;
    amount:       number;
    stock:      number;
}

export interface ResourceEventForm {
    resource: DataSelect;
    amount:     number;
    stock:      number;
}

export interface SponsorEvent {
    idSponsor: number;
    product:   string;
    stock:     number;
    observation:string;
    idMeasure: number;
}

export interface SponsorEventForm {
    sponsor:   DataSelect;
    product:     string;
    stock:       number;
    observation: string;
    measure:   DataSelect;
}

export interface EventFileDTO {
    idFile?: number;
    idEvent: number;
    name: string;
    ext: string;
}

export interface EventFile{
    idFile: number;
    idEvent: number;
    name: string;
}