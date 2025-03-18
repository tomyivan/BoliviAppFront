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
    city: List;
    code: string;
}

export interface Register {
    name : string, 
    lastname: string,
    nickname: string,
    email: string,
    gender: number,
    phoneNumber: string,
    city: number,
    pass: string,
    code: string,
}

export interface CodeVerify {
    // code: string;
    email: string;
}