import { toast } from "react-toastify";
import { AuthApplication } from "../../../application";
import { LoginForm, CredentialDTO } from "../../../domain";
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
    const singUp = async (data: CredentialDTO) => {
        try {
            const response = await _authApplication.singUp(data);
            return response;
        } catch (error) {
            console.error(error);
            toast.error('Error al registrar usuario');
            return false;
        }
    };
    return { login, singUp };
}
