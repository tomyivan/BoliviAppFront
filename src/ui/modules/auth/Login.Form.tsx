import { SubmitHandler, useForm } from "react-hook-form";
import { InputLabel } from "../../shared"
import { LoginForm } from "../../../domain/models";
import { Form } from "../../components";
// import { handleSubmit } from "./Actions"
import { useNavigate } from "react-router-dom"
import { FaFacebook, FaGoogle } from "react-icons/fa";
// import useAuthStore from "../../store/Auth.store"
interface FormLoginProps {
    handleOptionSingUp?: () => void
}
export const  FormLogin: React.FC<FormLoginProps> = ({
    handleOptionSingUp
}) => {
    const { register, formState: {errors}, handleSubmit } = useForm<LoginForm>();   
    const navigate = useNavigate();
    // const addAuth  = useAuthStore((state) => state.addAuth);
    const onSubmit: SubmitHandler<LoginForm> = async (FormData) => {
        console.log(FormData);
    }
    return (
        <div className={`flex justify-center items-center h-[100%]`}>
            <div className="w-2/3 ">
                <Form onSubmit={handleSubmit(onSubmit)} 
                    labelSend="Ingresar"
                >              
                    <h1 className="text-center font-bold p-4 text-gray-700">INGRESAR</h1>
                        <InputLabel 
                            label="USUARIO"
                            type="text"   
                            name={`nickname`}      
                            register={register}
                            errors={errors}                
                            options={{ required: true }}
                            placeholder="Ingrese su usuario"
                        />                    
                        <InputLabel 
                            label="CONTRASEÑA"
                            type="password"      
                            register={register}
                            errors={errors}
                            options={{ required: true }}
                            name="pass"
                            placeholder="Ingrese su contraseña"
                        />                            
                </Form>
                <div className="mt-2 flex flex-col items-center gap-2">
                    <p className="text-gray-700 text-center">O Inicia session con</p>
                    <ul className="flex flex-row justify-center gap-2">
                        <li className="bg-red-600 p-2 rounded-full text-gray-100 cursor-pointer hover:bg-red-700 transition duration-300">
                            <FaGoogle size={20} />
                        </li>
                        <li className="bg-blue-600 p-2 rounded-full text-gray-100 cursor-pointer hover:bg-blue-800 transition duration-300">
                            <FaFacebook size={20} />
                        </li>
                    </ul>
                    <p className="text-gray-700 font-bold">¿No tienes cuenta? <span className="text-red-700 cursor-pointer" onClick={handleOptionSingUp}>Registrate</span></p>
                </div>
            </div>
        </div>
    )
}