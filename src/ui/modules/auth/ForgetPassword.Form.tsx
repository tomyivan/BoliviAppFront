import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../components"
import { Button, Input } from "../../shared"
import { SingUpForm } from "../../../domain";
import { useState } from "react";
import { useAuth } from "../../hooks";
interface FormForgetPasswordProps {
    handleCancel: () => void   
}
export const FormForgetPassword:React.FC<FormForgetPasswordProps> = ({
    handleCancel
}) => {
    const { register, formState: {errors}, handleSubmit, watch } = useForm<SingUpForm>();
    const { updatePass , existCode, sendCodeForReset } = useAuth();
    const pass = watch("pass");	

    const [ nextValidate, setNextValidate ] = useState<Number>(0);
    const onSubmit: SubmitHandler<SingUpForm> = async (FormData) => {
        const response = await sendCodeForReset(FormData);
        response && setNextValidate(1);        
    }
    const onValidateCode: SubmitHandler<SingUpForm> = async (FormData) => {
        const response = await existCode(FormData);
        response && setNextValidate(2);
    }
    const onForgotPassword: SubmitHandler<SingUpForm> = async (FormData) => {
        const response = await updatePass(FormData);
        response && handleCancel();
    }   
    return (
        <div className={`flex justify-center items-center h-[100%]`}>
            <div className="w-2/4">
                { (nextValidate === 0 ) && <Form 
                    labelSend="Enviar Codigo"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="CORREO"
                        type="email"   
                        name={`email`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true}}
                        placeholder="Ingrese su correo"
                    />
                </Form> }
                { nextValidate === 1 && <Form 
                    labelSend="Validar Codigo"
                    onSubmit={handleSubmit(onValidateCode)}
                >
                    <Input
                        label="CODIGO"
                        type="number"   
                        name={`code`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true }}
                        placeholder="Ingrese su codigo"
                    />
                </Form>
                }
                {
                    nextValidate === 2 && <Form 
                    labelSend="Cambiar Contraseña"
                    onSubmit={handleSubmit(onForgotPassword)}
                >
                    <Input
                        label="CONTRASEÑA"
                        type="password"   
                        name={`pass`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true }}
                        placeholder="Ingrese su contraseña"
                    />
                    <Input
                        label="CONFIRMAR CONTRASEÑA"
                        type="password"   
                        name={`confirmPass`}      
                        register={register}
                        errors={errors}                
                        options={{ required: true,
                            validate: (value) => value === pass || "Las contraseñas no coinciden"
        
                        }}
                        placeholder="Confirme su contraseña"
                    />
                </Form>
                }
                <div className="flex justify-end py-2">
                    <Button 
                       variant="btn-outline-danger"
                       size="btn-sm"
                       widthFull 
                       onClick={handleCancel}

                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}