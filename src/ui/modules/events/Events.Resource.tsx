import { Button, Input, InputSelect2 } from "../../shared"
import { Plus, Trash } from "lucide-react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { DataSelect, EventsForm } from "../../../domain"
interface EventsResourceProps {
    resources: DataSelect[]
}
export const EventsResource: React.FC<EventsResourceProps> = ({
    resources
}) => {
    const {  control, register, formState:{errors} } = useFormContext<EventsForm>();
    const { append, remove, fields } = useFieldArray({
        control,
        name: "resources",
    })
    const handleAddResource = () => {
        append({ resource: null as any, amount: 0, stock: 0 })
    }
    return (
        <section className="flex flex-col h-full w-full my-2  ">
            <div className="flex items-center my-2">
                <p className="font-bold   text-gray-700 text-xl ">2. Recursos | </p>
                <Button
                    variant="btn-outline-primary"
                    size="btn-sm"
                    icon={<Plus size={20}/>}
                    onClick={handleAddResource}
                />
            </div>
            <div className="table-container ">
                <table className="border-b border-gray-500 w-full ">
                    <thead className="border-b border-gray-500">
                        <tr>
                            <th>
                                Recurso
                            </th>
                            <th>
                                Cantidad
                            </th>
                            <th>
                                Monto por Unidad
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-2">           
                                    <InputSelect2                                         
                                        name={`resources.[${index}].resource` as any}
                                        control={control}
                                        data={resources}                                        
                                        options={{ required: true }}
                                        errors={{
                                            isValid: Boolean(errors.resources?.[index]?.resource),
                                            }}
                                    />
                                </td>
                                <td className="px-2">
                                    <Input 
                                        type="number"
                                        name={`resources.${index}.amount` as any}
                                        register={register}
                                        errors={{
                                            isValid: Boolean(errors.resources?.[index]?.amount),
                                            message: errors.resources?.[index]?.amount?.message,
                                        }}
                                        options={{ required: true,
                                            min: {
                                                value: 1,
                                                message: "El monto por unidad debe ser mayor a 0",
                                            }, max: 1000000 }}                                         
                                    />
                                </td>
                                <td className="px-2">
                                    <Input 
                                        type="number"
                                        name={`resources.${index}.stock` as any}
                                        register={register}
                                        errors={{
                                            isValid: Boolean(errors.resources?.[index]?.stock),
                                            message: errors.resources?.[index]?.stock?.message,
                                        }}
                                        options={{ required: true,
                                            min: {
                                                value: 1,
                                                message: "El monto por unidad debe ser mayor a 0",
                                            }, max: 1000000 }}
                                    />
                                </td>
                                <td className="text-center  p-1">
                                    <Button
                                        variant="btn-outline-danger"
                                        size="btn-sm"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
