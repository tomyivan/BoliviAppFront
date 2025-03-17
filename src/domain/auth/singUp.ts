import { List } from "..";

export interface SingUpForm{
    name: string;
    lastName: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    pass: string;
    confirmPass: string;
    gender: List;
    city: List
}

export interface Register {
    name : string, 
    lastname: string,
    email: string,
    gender: number,
    phoneNumber: string,
    city: number,
    nickname: string,
    pass: string
}