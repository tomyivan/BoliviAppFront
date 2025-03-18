import { toast } from "react-toastify";
import { AuthApplication } from "../../../application";
import { LoginForm, CredentialDTO, Register, CodeVerify } from "../../../domain";
import { AuthApiAdapter } from "../../../infrastructure";
const _authAdapter = new AuthApiAdapter();
const _authApplication = new AuthApplication(_authAdapter);
export const useAuth = () => {
    const login = async (data: LoginForm) => {
        const response = await _authApplication.login(data) ;
        if( !response || !response?.ok ) {
            toast.error( response?.msg || 'Usuario o contraseña incorrecta');
            return false
        }
        toast.success(response.msg);
        return response;       
    };
    const singUp = async (data: Register) => {
        try {
            const response = await _authApplication.singUp(data);
            return response;
        } catch (error) {
            console.error(error);
            toast.error('Error al registrar usuario');
            return false;
        }
    };
    const verifyEmail = async (email: string) => {
        try {
            const response = await _authApplication.verifyEmail(email);
            console.log(response)
            return response.body.data;
        } catch (error) {
            console.error(error);
            toast.error('Error al verificar email');
            return false;
        }
    }
    const sendCode = async (data: CodeVerify) => {
        try {
            console.log(data)
            const response = await _authApplication.sendCode(data);
            console.log(response)
            if( !response || !response?.ok ){
                toast.error(  response?.msg || "Error al enviar el codigo")
                return false;
            }
            toast.success( response?.msg || "Se envio el codigo a su correo" )
            return true;            
        } catch (error) {
            console.error(error);
            toast.error('Error al enviar codigo');
            return false;
        }
    }
    return { login, singUp, verifyEmail, sendCode };
}
