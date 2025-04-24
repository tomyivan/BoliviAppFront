import { SubmitHandler, useForm } from "react-hook-form";
import { DataSelect,  Register, SingUpForm } from "../../../domain";
import { Form } from "../../components"
import { Input } from "../../shared";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useAuth, useCity } from "../../hooks";
// import { useRegisterStore } from "../../store";
import { toast } from "react-toastify";
import { InputSelect2 } from "../../shared/input/Input.select2.shared";
interface FormSingUpProps {
    handleOptionSingUp: () => void
    dataCity: DataSelect[]
}
export const FormSingUp:React.FC<FormSingUpProps>=({
    handleOptionSingUp,
    dataCity
}) => {
    // const { addRegister, registerU } = useRegisterStore()
    const { control, register, formState: {errors}, handleSubmit, watch, setValue } = useForm<SingUpForm>(); 
    const [ emailError, setEmailError ]  = useState<string | null>(null);
    const { verifyEmail, sendCode, singUp } = useAuth();
    const [ nextValidate, setNextValidate ] = useState<boolean>(false);
    const [ dataStates, setDataStates ] = useState<DataSelect[]>([]);
    const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);
    const pass = watch("pass");	
    const { getStates } = useCity();
    const onSubmit: SubmitHandler<SingUpForm> = async (formData) => {
        const token = recaptchaRef.current?.getValue();
        console.log(formData)
        !token && toast.error("Por favor, verifica que no eres un robot")
        const response = await sendCode({ email: formData.email });
        setNextValidate(response)
    }
    const onRegister: SubmitHandler<SingUpForm> = async ( formData ) => {     
        const newData: Register = {
            name: formData.name,
            lastname: formData.lastName,
            email: formData.email,
            city: String(formData.city.id),
            state: String(formData.state.id),
            gender: Number(formData.gender.id),
            nickname: formData.nickname,
            phoneNumber: formData.phoneNumber,
            pass: formData.pass,
            code: formData.code            
        }
        const response = await singUp(newData);
        response &&  handleOptionSingUp();
    }

    const handleSelectCountry = async (iso2: DataSelect) => {
        if( !iso2?.id || iso2?.id === -1 ) return;
        setValue("state", null as any);
        const data = await getStates(String(iso2?.id));
        setDataStates(data);
    }

    const validateEmail = useCallback(debounce(async (email: string) => {    
        try {
        const response = await verifyEmail(String(email));
        const errorMessage = response ? "Este correo ya está registrado" : null;       
        setEmailError(errorMessage);
        return errorMessage || true;
        } catch (error) {
        setEmailError("Error al verificar el correo");
        return "Error al verificar el correo";
        }
    }, 500),
    []
    );
      
    return (
        <div className="top-0 w-full p-4 h-[480px] md:h-full  overflow-auto absolute">
            { !nextValidate ?
            <div className="flex flex-col items-center justify-center md:h-full"> 
            <Form                 
                onSubmit={handleSubmit(onSubmit)} 
                labelSend="Siguiente"
            >
                  <p
                className="text-gray-700 font-bold text-3xl mb-2 text-center"
            >Registrate</p>
                <div className="form-row">
                    <Input 
                        label="Nombre"
                        variant="inp-filled"
                        type="text"   
                        name={`name`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.name),
                        }}                
                        options={{ required: true }}
                        placeholder="Ingrese su nombre"
                    />
                    <Input 
                        label="Apellido"
                        variant="inp-filled"
                        type="text"   
                        name={`lastName`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.lastName)
                        }}                
                        options={{ required: true }}
                        placeholder="Ingrese su apellido"
                    />                    
                </div>
                <div className="form-row">
                    <Input 
                        label="Correo Electrónico"
                        variant="inp-filled"
                        type="email"   
                        name={`email`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.email),
                            message: errors.email?.message
                        }}                
                        options={{ required: true,
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Ingrese un correo válido"
                            },
                            validate: () => emailError || true,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e.target.value)
                         }}
                        placeholder="Ingrese su correo electrónico"
                    />
                    <InputSelect2 
                        control={control}
                        label="Género"
                        name="gender"
                        errors={{
                            isValid: Boolean(errors.gender),                            
                        }}
                        variant="inp-filled"
                        options={{ required: true }}
                        data={[{id:1, name:"Masculino"}, {id:2, name:"Femenino"}]}
                        placeholder="Seleccione su género"
                    />                   
                </div>
                <div className="form-row">
                    <Input 
                        label="Numero de Teléfono"
                        variant="inp-filled"  
                        type="number"   
                        name={`phoneNumber`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.phoneNumber),
                            message: errors.phoneNumber?.message
                        }}                
                        options={{ required: true,
                            pattern: {
                                value: /^[0-9]{8,8}$/,
                                message: "Ingrese un número válido"
                            }
                         }}
                        placeholder="Ingrese su numero"
                    />
                    <InputSelect2
                        control={control}
                        label="Ciudad"
                        name="city"
                        errors={{
                            isValid: Boolean(errors.city),
                            message: errors.city?.message
                        }}
                        variant="inp-filled"
                        options={{ required: true,
                            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => handleSelectCountry(e.target.value as any)
                         }}
                        data={dataCity}
                        placeholder="Seleccione su ciudad"
                    />     

                </div>
                <div className="form-row">
                    <InputSelect2
                        control={control}
                        label="Departamento/Estados"
                        name="state"
                        errors={{
                            isValid: Boolean(errors.state),
                            message: errors.state?.message
                        }}
                        variant="inp-filled"
                        options={{ required: true }}
                        data={dataStates}
                        placeholder="Seleccione su departamento"
                    />
                    <Input 
                        label="Nombre de Usuario"
                        variant="inp-filled"
                        type="text"   
                        name={`nickname`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.nickname),
                            message: errors.nickname?.message
                        }}                
                        options={{ required: true }}
                        placeholder="Ingrese su nombre de usuario"
                    />
                   
                </div>
                <div className="form-row">
                    <Input 
                        label="Contraseña"
                        variant="inp-filled"
                        type="password"   
                        name={`pass`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.pass),
                            message: errors.pass?.message
                        }}                
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
                    <Input
                        label="Confirmar Contraseña"
                        variant="inp-filled"
                        type="password"   
                        name={`confirmPass`}      
                        register={register}
                        errors={{
                            isValid: Boolean(errors.confirmPass),
                            message: errors.confirmPass?.message
                        }}                
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
            </Form>  </div>:
            <div className="flex flex-col items-center justify-center h-full">    
                <Form 
                    onSubmit={handleSubmit(onRegister)} 
                    labelSend="Registrarse"
                    
                >
                    <p className="text-gray-700 font-bold text-3xl mb-2 text-center"
                    >Ingrese el codigo</p>
                    <p className="text-gray-700 font-bold text-lg mb-2 text-center"
                    >El codigo fue enviado a su correo</p>
                    <div className="form-row">
                        <Input 
                            label="Código de Verificación"
                            variant="inp-filled"
                            type="number"   
                            name={`code`}      
                            register={register}
                            errors={{
                                isValid: Boolean(errors.code),
                                message: errors.code?.message
                            }}                
                            options={{ required: true }}
                            placeholder="Ingrese el código de verificación"
                        />
                    </div>
                </Form>
                </div>
            }
        </div>
    )
}
