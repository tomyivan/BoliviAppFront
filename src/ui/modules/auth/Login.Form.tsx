import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../shared"
import { LoginForm } from "../../../domain";
import { Form } from "../../components";
// import { handleSubmit } from "./Actions"
// import {  FaGoogle } from "react-icons/fa";
import { Globe } from "lucide-react";
import { useAuth } from "../../hooks";
import { useAuthStore } from "../../store";
import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../store/Auth.store"
interface FormLoginProps {
    handleOptionSingUp?: () => void,
    handleSingGoogle: () => void,
    handleForgotPassword?: () => void
}
export const  FormLogin: React.FC<FormLoginProps> = ({
    handleOptionSingUp,
    handleSingGoogle,
    handleForgotPassword
}) => {
    const { register, formState: {errors}, handleSubmit } = useForm<LoginForm>();
    const navigation = useNavigate();
    const { addAuth } = useAuthStore();
    const { login } = useAuth();
    // const addAuth  = useAuthStore((state) => state.addAuth);
    const onSubmit: SubmitHandler<LoginForm> = async (FormData) => {
        const response = await login(FormData);
        if(response.token){
            addAuth(response); // Guardar el token en el store
            navigation("/inicio"); // Redirigir a la página de inicio
        }
    }
    return (
        <div className={`flex justify-center items-center h-[100%]`}>
            <div className="w-2/4 ">
                <Form onSubmit={handleSubmit(onSubmit)} 
                    labelSend="Ingresar"
                >              
                    <h1 className="text-center font-bold p-4 text-gray-700">INGRESAR</h1>
                        <Input 
                            label="USUARIO"
                            type="text"   
                            name={`nickname`}      
                            variant="inp-filled"
                            register={register}
                            errors={{
                                isValid: Boolean(errors.nickname)
                            }}              
                            options={{ required: true }}
                            placeholder="Ingrese su usuario"
                        />                    
                        <Input 
                            label="CONTRASEÑA"
                            type="password"     
                            variant="inp-filled"
                            register={register}
                            errors={{
                                isValid: Boolean(errors.pass)
                            }}
                            options={{ required: true }}
                            name="pass"
                            placeholder="Ingrese su contraseña"
                        />
                        <div className="flex justify-end">
                            <p className="text-blue-700 cursor-pointer hover:underline pb-2"
                                onClick={handleForgotPassword}
                            >Olvide mi contraseña</p>
                        </div>
                </Form>
                <div className="mt-2 flex flex-col items-center gap-2">
                    <p className="text-gray-700 text-center">O Inicia session con</p>
                    <ul className="flex flex-row justify-center gap-2">
                        <li className="bg-red-600 p-2 flex items-center gap-4 rounded-full text-gray-100 cursor-pointer hover:bg-red-700 transition duration-300"
                            onClick={handleSingGoogle}
                        >
                            <Globe size={20} /> <span className="font-bold">Google</span>
                        </li>
                        {/* <li className="bg-blue-600 p-2 rounded-full text-gray-100 cursor-pointer hover:bg-blue-800 transition duration-300">
                            <FaFacebook size={20} />
                        </li> */}
                    </ul>
                    <p className="text-gray-700 font-bold">¿No tienes cuenta? <span className="text-red-700 cursor-pointer" onClick={handleOptionSingUp}>Registrate</span></p>
                </div>
            </div>
        </div>
    )
}