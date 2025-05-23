import { ResponseDTO } from "../http/response";
import { LoginForm } from "./login";
import { CodeVerify, Register, ResetPassword } from "./singUp";

export interface IAuthDomain {
    refreshToken: () => Promise<ResponseDTO>;
    login: ( data:LoginForm ) => Promise<ResponseDTO>;
    singUp: (data: Register) => Promise<ResponseDTO>;
    verifyEmail: ( email:string ) => Promise<ResponseDTO>
    sendCode: ( data:CodeVerify ) => Promise<ResponseDTO>
    sendCodeForReset: ( data:CodeVerify ) => Promise<ResponseDTO>
    existCode: ( data: ResetPassword ) => Promise<ResponseDTO>
    updatePass: ( data: ResetPassword ) => Promise<ResponseDTO>
    // verifyEmail: (email: string) => Promise<ResponseDTO>;}
    // verifyCode: (data: CodeVerify) => Promise<ResponseDTO>;
    logout: () => void;
    // forgotPass: (email: string) => Promise<any>;
    // resetPass: (data: any) => Promise<any>;
}