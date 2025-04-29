import { Form } from "../../components"
import { DataSelect, PresidentDTO, PresidentForm } from "../../../domain"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Input, InputSelect2 } from "../../shared"
import { useGetPoliticalParty, useAddPresident, useUpdatePresident } from "../../hooks"
import { MandateForm } from "./Mandates.form"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

interface FormPresidentProps {
    onCancel?: () => void;  
    data?: PresidentDTO
}
export const FormPresident:React.FC<FormPresidentProps> = ({
    onCancel,
    data
}) => {
     const method = useForm<PresidentForm>();
    const { register, formState: { errors }, handleSubmit, control } = method;
    const { addPresident } = useAddPresident();
    const { updatePresident } = useUpdatePresident();
    const { getPoliticalParties } = useGetPoliticalParty();
    const [ politicalData, setPoliticalData ] = useState<DataSelect[]>([]);
    const loadDependencies = async () => {
        const [ politicaParties ] = await Promise.all([
            getPoliticalParties()
        ])
        setPoliticalData(politicaParties as DataSelect[]);        
    }

    const onSubmit:SubmitHandler<PresidentForm> = async (formData) => { 
        let response = false;        
        response = data?.idPresident ? await updatePresident(formData, data?.idPresident) : await addPresident(formData) ;
        if(response) {
            onCancel && onCancel();
        }
    }
    useEffect(() => {
        if(data) {
            method.reset({
                ...data,
                dateBirthday: data.dateBirthday ? new Date(data.dateBirthday).toISOString().split('T')[0] : undefined,
                dateDeath: data.dateDeath ? new Date(data.dateDeath).toISOString().split('T')[0] : undefined,
                politicalParty: { id: data.idPoliticalParty, name: data.politicalParty },
                lastName: data.lastname,
                mandates: data.mandates?.map((mandate) => ({
                    nroMandate: mandate.nroMandate,
                    startDate: mandate.startDate ? dayjs(mandate.startDate).utc().format("YYYY-MM-DD"): undefined,
                    endDate: mandate.endDate ? dayjs(mandate.endDate).utc().format("YYYY-MM-DD"): undefined,
                    observation: mandate.observation
                }))   
            })
        }
    }, [data])
    useEffect(() => {   
        loadDependencies()
    } , [])
    return (
        <FormProvider {...method} >
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
                <InputSelect2 
                    control={control}
                    label="Partido Politico"
                    name="politicalParty"
                    options={{ required: true }}
                    errors={errors.politicalParty && { isValid: true, message: "Este campo es requerido" }}
                    data={politicalData}
                    placeholder="Seleccione el partido politico"
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
                        placeholder="Una breve biografia del presidente"
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
            <MandateForm 
                
            />
        </Form>
        </FormProvider>
    )
}