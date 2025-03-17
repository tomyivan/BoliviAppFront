export interface LoginForm {
    nickname: string;
    pass: string;
}

export interface CredentialDTO {
    token:       string;
    email:       string;
    name:        string;
    nickname:    string;
    gender:      number;
    phoneNumber: number;
    codPhone:    number;
    rol:         number;
    isVerify:    number;
}
