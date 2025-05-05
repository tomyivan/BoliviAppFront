import { Form } from "../../components"
import { Input, InputSelect2, MultiSelect } from "../../shared"
import { useNavigate } from "react-router-dom"
import { DataSelect, Departaments, HistoryForm } from "../../../domain"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useGetHistory, useGetCharacter, useDepartaments, useAddHistory } from "../../hooks"
import { useEffect, useState } from "react"
import { HistoryReferences } from "./History.references"
import { HistoryLocation } from "./History.Location"
import { toast } from "react-toastify"

export const FormHistory = () => {
    const navigation = useNavigate()
    const [selectedItems, setSelectedItems] = useState<DataSelect[]>([]);
    const { addHistory } = useAddHistory();
    const { getCategoryHistory } = useGetHistory();
    const { getCharactersList } = useGetCharacter();
    const { getDepartaments } = useDepartaments();
    const method = useForm<HistoryForm>();
    const { register, formState: { errors }, handleSubmit, control } = method;
    const [ character, setCharacter ] = useState<DataSelect[]>([]);
    const [ category, setCategory ] = useState<DataSelect[]>([]);
    const [departaments, setDepartaments] = useState<Departaments[]>([]);
    const onSubmit:SubmitHandler<HistoryForm> = async (formData) => {
        if(character.length === 0) {
            toast.error("Debe agregar al menos un personaje");
            return;
        }
        if(formData.referencesHistory.length === 0) {
            toast.error("Debe agregar al menos una referencia");
            return;
        }
        const response = await addHistory({...formData, characters: selectedItems});
        response &&  navigation("/inicio/historias");
    }
    const loadDependencies =async () => {
        const [ dataCategory, dataCharacter, dataDepartment ] = await Promise.all([    
            getCategoryHistory(), getCharactersList(), getDepartaments()
        ]);
        setCategory(dataCategory);
        setCharacter(dataCharacter);
        setDepartaments(dataDepartment);
    }

    useEffect(() => {
        loadDependencies()
    },[])
    return (
        <FormProvider {...method} >
        <Form 
            onCancel={() => {navigation(-1)}}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-row">   
                <Input 
                    name="title"
                    variant="inp-filled"
                    label="Titulo"
                    placeholder="Ingrese el titulo"
                    register={register}
                    options={{ required: true }}
                    errors={{
                        isValid: Boolean(errors.title),
                    }}
                />
                <InputSelect2 
                    control={control}
                    name="category"
                    label="Categoria"
                    data={category}
                    variant="inp-filled"
                    options={{ required: true }}
                    errors={{
                        isValid: Boolean(errors.category),
                    }}
                    placeholder="Seleccione la categoria"
                />
                <div className="w-full">    
                    <MultiSelect
                        label="Personajes"
                        name="characters" 
                        options={character}
                        selectedValues={selectedItems}
                        onChange={setSelectedItems}
                    />
                </div>
            </div>
            <div className="form-row">
            <Input 
                    name="dateStart"
                    variant="inp-filled"
                    label="Fecha Inicio"
                    type="date"
                    register={register}
                    options={{ required: true }}
                    errors={{
                        isValid: Boolean(errors.dateStart),
                    }}
                />
                <Input 
                    name="dateEnd"
                    variant="inp-filled"
                    label="Fecha Fin"
                    type="date"
                    register={register}
                    options={{ required: true }}
                    errors={{
                        isValid: Boolean(errors.dateEnd),
                    }}
                />                
            </div>
            
            <div className="form-row">
                    <div className="w-full">
                    <label className={`block  text-gray-700 font-semibold mb-2 ${errors && errors?.description && 'text-red-500'}`} htmlFor={"detail"}>	
                        Descripción de la Historia
                        </label>
                    <textarea
                        className={`inp-filled w-full h-32 p-2 ${errors && errors?.description && 'border-red-500'}`}
                        rows={5}
                        placeholder="Descripción de la historia"
                        {...register('description', { required: true })}
                    ></textarea>
                    {errors.description && <span className="text-red-500">Este campo es requerido</span>}                

                    </div>
            </div>
            <div className="form-row">
                    <div className="w-full">
                    <label className={`block  text-gray-700 font-semibold mb-2 ${errors && errors?.summary && 'text-red-500'}`} htmlFor={"detail"}>	
                        Resumen de la Historia
                        </label>
                    <textarea
                        className={`inp-filled w-full h-32 p-2 ${errors && errors?.summary && 'border-red-500'}`}
                        rows={5}
                        placeholder="Descripción de la historia"
                        {...register('summary', { required: true })}
                    ></textarea>
                    {errors.summary && <span className="text-red-500">Este campo es requerido</span>}                

                </div>
            </div>
            
            <HistoryLocation 
                departaments={departaments} 
                // lat={data?.location.latitude}
                // lng={data?.location.longitude}             
            />
            <HistoryReferences />
        </Form>
        </FormProvider>
    )
}