import { Form } from "../../components"
import { PresidentForm } from "../../../domain"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../shared"
interface FormPresidentProps {
    onCancel?: () => void;  
}
export const FormPresident:React.FC<FormPresidentProps> = ({
    onCancel
}) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm<PresidentForm>();
    const onSubmit:SubmitHandler<PresidentForm> = async (formData) => { 
        console.log(formData)
    }
    return (
        <Form 
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
        >
            <div className="form-row">
                <Input 
                    register={register}
                    label="Nombre"
                    name="name"
                    options={{ required: true }}
                    errors={errors.name && { isValid: true, message: "Este campo es requerido" }}
                    placeholder="Nombre del presidente"
                    variant="inp-filled"

                />
                <Input 
                    register={register}
                    label="Apellido"
                    name="lastName"
                    options={{ required: true }}
                    errors={errors.lastName && { isValid: true, message: "Este campo es requerido" }}
                    placeholder="Apellido del presidente"
                    variant="inp-filled"
                />                
            </div>
            <div className="form-row">
                <Input 
                    register={register}
                    label="Fecha de Nacimiento"
                    name="dateBirthday"
                    type="date"
                    options={{ required: true }}
                    errors={errors.dateBirthday && { isValid: true, message: "Este campo es requerido" }}
                    variant="inp-filled"
                />
                
                <Input 
                    register={register}
                    label="Fecha Fallecimiento"
                    name="dateDeath"
                    type="date"
                    variant="inp-filled"
                />
            </div>
            <div className="form-row">
                <Input 
                    register={register}
                    label="Partido Politico"
                    name="politicalParty"
                    options={{ required: true }}
                    errors={errors.politicalParty && { isValid: true, message: "Este campo es requerido" }}
                    placeholder="Partido politico del presidente"
                    variant="inp-filled"
                />
            </div>
            <div className="form-row">
                <div className="w-full">
                    <label className={`block  text-gray-700 font-semibold mb-2 ${errors && errors?.biography && 'text-red-500'}`} htmlFor={"biography"}>	
                        Biografia
                        </label>
                    <textarea
                        className={`inp-filled w-full h-32 p-2 ${errors && errors?.biography && 'border-red-500'}`}
                        rows={4}
                        placeholder="Descripción del evento"
                        {...register('biography', { required: true })}
                    ></textarea>
                    {errors.biography && <span className="text-red-500">Este campo es requerido</span>}                
                </div>
            </div>
            <div className="form-row">
                <div className="w-full">
                    <label className={`block  text-gray-700 font-semibold mb-2 ${errors && errors?.importantEvents && 'text-red-500'}`} htmlFor={"importantEvents"}>	
                        Eventos importantes del presidente
                        </label>
                    <textarea
                        placeholder="Eventos importantes del presidente"
                        className={`inp-filled w-full h-32 p-2 ${errors && errors?.importantEvents && 'border-red-500'}`}
                        {...register('importantEvents', { required: true })}
                    />
                    {errors.importantEvents && <span className="text-red-500">Este campo es requerido</span>}
                </div>
            </div>
        </Form>
    )
}