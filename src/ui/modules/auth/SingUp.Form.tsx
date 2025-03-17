import { SubmitHandler, useForm } from "react-hook-form";
import { SingUpForm } from "../../../domain";
import { Form } from "../../components"
import { InputLabel, InputSelect } from "../../shared";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";

interface FormSingUpProps {
    handleOptionSingUp?: () => void
}
export const FormSingUp:React.FC<FormSingUpProps>=({
    handleOptionSingUp
}) => {

    const { control, register, formState: {errors}, handleSubmit, watch } = useForm<SingUpForm>();   
    const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);
    const pass = watch("pass");	
    const onSubmit: SubmitHandler<SingUpForm> = async (FormData) => {
        const token = recaptchaRef.current?.getValue();
        console.log(token);
        console.log(FormData);
    }
    return (
        <div className="top-0 w-full p-4 h-[440px] md:h-full  overflow-auto absolute">
            <p
                className="text-gray-700 font-bold text-3xl mb-2 text-center"
            >Registrate</p>
            <Form 
                onSubmit={handleSubmit(onSubmit)} 
                labelSend="Registrarse"
            >
                <div className="form-row">
                    <InputLabel 
                        label="Nombre"
                        type="text"   
                        name={`name`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true }}
                        placeholder="Ingrese su nombre"
                    />
                    <InputLabel 
                        label="Apellido"
                        type="text"   
                        name={`lastName`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true }}
                        placeholder="Ingrese su apellido"
                    />                    
                </div>
                <div className="form-row">
                    <InputLabel 
                        label="Correo Electrónico"
                        type="email"   
                        name={`email`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true,
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Ingrese un correo válido"
                            }
                         }}
                        placeholder="Ingrese su correo electrónico"
                    />
                    <InputSelect 
                        control={control}
                        label="Género"
                        name="gender"
                        errors={errors}
                        options={{ required: true }}
                        listOptions={[{value:1, label:"Masculino"}, {value:2, label:"Femenino"}]}
                        placeholder="Seleccione su género"
                    />                   
                </div>
                <div className="form-row">
                    <InputLabel 
                        label="Numero de Teléfono"  
                        type="number"   
                        name={`phoneNumber`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true,
                            pattern: {
                                value: /^[0-9]{8,8}$/,
                                message: "Ingrese un número válido"
                            }
                         }}
                        placeholder="Ingrese su numero"
                    />
                    <InputSelect 
                        control={control}
                        label="Ciudad"
                        name="city"
                        errors={errors}
                        options={{ required: true }}
                        listOptions={[{value:1, label:"La Paz"}, {value:2, label:"Cochabamba"}]}
                        placeholder="Seleccione su ciudad"
                    />     

                </div>
                <div className="form-row">
                    <InputLabel 
                        label="Nombre de Usuario"
                        type="text"   
                        name={`nickname`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true }}
                        placeholder="Ingrese su nombre de usuario"
                    />
                   
                </div>
                <div className="form-row">
                    <InputLabel 
                        label="Contraseña"
                        type="password"   
                        name={`pass`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true,
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
                                message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"
                            }
                         }}
                        placeholder="Ingrese su contraseña"
                    />
                    <InputLabel
                        label="Confirmar Contraseña"
                        type="password"   
                        name={`confirmPass`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true,
                            validate: (value) => value === pass || "Las contraseñas no coinciden"

                         }}
                        placeholder="Confirme su contraseña"
                    />
                </div>
                <div className="flex justify-center">
                    <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHAP_KEY} ref={recaptchaRef} />
                </div>
            <p className="text-gray-700 font-bold my-2">¿Ya tienes cuenta? <span className="text-blue-700 cursor-pointer" onClick={handleOptionSingUp}>Ingresar</span></p> 
            </Form>  
        </div>
    )
}