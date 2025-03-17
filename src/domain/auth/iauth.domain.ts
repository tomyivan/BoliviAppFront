import { LoginForm } from "./login";

export interface IAuthDomain {
    login: ( data:LoginForm ) => Promise<any>;
    singUp: (data: any) => Promise<any>;
    // logout: () => Promise<any>;
    // forgotPass: (email: string) => Promise<any>;
    // resetPass: (data: any) => Promise<any>;
}