import { Departaments } from "../departaments/departaments";
import { DataSelect } from "../input/input";

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
    latitude:      number;
    longitude:     number;
    departament: Departaments;
}

export interface ResourceEvent {
    idResource: number;
    name:       string;
    stock:      number;
}

export interface ResourceEventForm {
    resource: DataSelect;
    amount:     number;
    stock:      number;
}

export interface SponsorEvent {
    idSponsor: number;
    name:      string;
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
