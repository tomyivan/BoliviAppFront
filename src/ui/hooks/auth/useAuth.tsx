import { toast } from "react-toastify";
import { AuthApplication } from "../../../application";
import { LoginForm, CredentialDTO, Register, CodeVerify, ResetPassword } from "../../../domain";
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
            if( !response || !response?.ok ){
                toast.error( response?.msg || "Error al registrar usuario")
                return false;
            }
            toast.success( response?.msg || "Usuario registrado correctamente" )
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
    const sendCodeForReset = async (data: CodeVerify) => {
        try {
            const response = await _authApplication.sendCodeForReset(data);
            console.log(response)
            if( !response || !response?.ok ){
                toast.error( response?.msg || "Error al enviar el codigo")
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
    const existCode = async (data: ResetPassword) => {
        try {
            const response = await _authApplication.existCode(data);
            if( !response || !response?.ok ){
                toast.error( response?.msg || "Error al verificar el codigo")
                return false;
            }
            toast.success( response?.msg || "Codigo verificado correctamente" )
            return true;            
        } catch (error) {
            console.error(error);
            toast.error('Error al verificar codigo');
            return false;
        }
    }
    const updatePass = async (data: ResetPassword) => {
        try {
            const response = await _authApplication.updatePass(data);
            if( !response || !response?.ok ){
                toast.error( response?.msg || "Error al actualizar la contraseña")
                return false;
            }
            toast.success( response?.msg || "Contraseña actualizada correctamente" )
            return true;            
        } catch (error) {
            console.error(error);
            toast.error('Error al actualizar contraseña');
            return false;
        }
    }
    return { login, singUp, verifyEmail, sendCode, sendCodeForReset, existCode, updatePass };
}
