export type List = {
    value: number | string,
    label:string
}
export type { LoginForm, CredentialDTO } from "./auth/login"
export type { SingUpForm, Register, VerifyForm } from "./auth/singUp"
export type { IAuthDomain } from "./auth/iauth.domain"
export type { ResponseDTO } from "./http/response"
export type { IHttp } from "./http/ihttp.domain"