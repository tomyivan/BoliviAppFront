import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Form } from "../../components"
import { useNavigate } from "react-router-dom";
import { Input, InputSelect2 } from "../../shared"
import { DataSelect, Departaments, EventsForm } from "../../../domain";
import { EventsResource } from "./Events.Resource";
import { EventsSponsor } from "./Events.Sponsor";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { EventsLocation } from "./Events.Location";
import { useDepartaments, useGetMiscellaneous, useResource, useSponsor, useGetEvents, useAddEvents } from "../../hooks";
import { toast } from "react-toastify";
export const FormEvents  = () => {
    const { getDepartaments } = useDepartaments();
    const { getMeasures } = useGetMiscellaneous();
    const navigation = useNavigate();
    const method = useForm<EventsForm>();
    const [departaments, setDepartaments] = useState<Departaments[]>([]);
    const [ measures, setMeasures ] = useState<DataSelect[]>([]);
    const [ resources, setResources ] = useState<DataSelect[]>([]);
    const [ sponsors, setSponsors ] = useState<DataSelect[]>([]);
    const [ categories, setCategories ] = useState<DataSelect[]>([]);
    const { register, formState: { errors }, handleSubmit, reset } = method;
    const { getResources } = useResource();
    const { getSponsors } = useSponsor();
    const { getCategoriesEvent } = useGetEvents();
    const { addEvents } = useAddEvents();
    const onSubmit:SubmitHandler<EventsForm> = async (formData) => {
        if(formData.resources.length === 0) {
            toast.error("Debe agregar al menos un recurso");
            return;
        }
        const response = await addEvents(formData);
        response && navigation("/inicio/eventos");
    };
    const loadDependencies =async () => {   
        const [departaments, measures, resources, sponsors, dataCategory ] = await Promise.all([
            getDepartaments(),
            getMeasures(),
            getResources(),
            getSponsors(),
            getCategoriesEvent()
        ]);
        setDepartaments(departaments);
        setMeasures(measures);
        setResources(resources);
        setSponsors(sponsors);
        setCategories(dataCategory);
    }
    useEffect(() => {
        reset({
            name: '', 
            date: dayjs().format('YYYY-MM-DD'), 
            startTime: dayjs().format('HH:mm'), 
            endTime: dayjs().add(2,"hour").format('HH:mm'),
            resources: [],
            sponsors: [],
        });
        loadDependencies()
    }, []);
    return (
        <FormProvider {...method}>
        <Form             
            onSubmit={handleSubmit(onSubmit)} 
            onCancel={() => navigation(-1)}
        >
            <h1 className="font-bold  text-gray-700 text-xl">1. Datos Generales</h1>
            <div className="form-row">
                <Input 
                    label="Nombre del Evento"
                    type="text"   
                    name={`name`}      
                    variant="inp-filled"
                    register={register}
                    errors={{
                        isValid: Boolean(errors.name)
                    }}                
                    options={{ required: true }}
                    placeholder="Ingrese el nombre del evento"
                />
              <InputSelect2 
                    name={`category`}
                    control={method.control}
                    label="Categoria del Evento"
                    data={categories}
                    variant="inp-filled"
                    options={{ required: true }}
                    errors={{
                        isValid: Boolean(errors.category)
                    }}
                    placeholder="Seleccione la categoria del evento"
              />
            </div>
            <div className="form-row">
            <Input
                    label="Fecha del Evento"
                    type="date"   
                    name="date"
                    variant="inp-filled"
                    register={register}
                    errors={{
                        isValid: Boolean(errors.date),
                    }}                
                    options={{ required: true }}
                />
                <Input 
                    label="Hora Inicio"
                    type="time"   
                    name="startTime"
                    variant="inp-filled"
                    register={register}
                    errors={{
                        isValid: Boolean(errors.startTime),
                    }}                
                    options={{ required: true }}
                    placeholder="Ingrese la hora del evento"
                />
                <Input 
                    label="Hora Fin"
                    type="time"   
                    name="endTime"
                    variant="inp-filled"
                    register={register}
                    errors={{
                        isValid: Boolean(errors.endTime),
                    }}                
                    options={{ required: true }}
                    placeholder="Ingrese la hora del evento"
                />
            </div>
            <EventsResource 
                resources={resources}
            />
            <EventsSponsor 
                measures={measures}
                sponsors={sponsors}
            />
            <EventsLocation 
                departaments={departaments}  
                    
            />
            <div className="form-row">
                    <div className="w-full">
                    <label className={`block  text-gray-700 font-semibold mb-2 ${errors && errors?.detail && 'text-red-500'}`} htmlFor={"detail"}>	
                        Descripción del Evento
                        </label>
                    <textarea
                        className={`inp-filled w-full h-32 p-2 ${errors && errors?.detail && 'border-red-500'}`}
                        rows={4}
                        placeholder="Descripción del evento"
                        {...register('detail', { required: true })}
                    ></textarea>
                    {errors.detail && <span className="text-red-500">Este campo es requerido</span>}                

                    </div>
            </div>
        </Form>
        </FormProvider>
    )
}