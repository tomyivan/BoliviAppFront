import { DataSelect } from "..";

export interface SingUpForm{
    name: string;
    lastName: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    pass: string;
    confirmPass: string;
    gender: DataSelect;
    city: DataSelect;
    state: DataSelect;
    code: string;
}

export interface Register {
    name : string, 
    lastname: string,
    nickname: string,
    email: string,
    gender: number,
    phoneNumber: string,
    city: string,
    state: string,
    pass: string,
    code: string,
}

export interface CodeVerify {
    // code: string;
    email: string;
}

export interface ResetPassword {
    email: string;
    code: string;
    pass: string;
}