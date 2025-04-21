import { Plus, Trash } from "lucide-react"
import { Button, Input, InputSelect2 } from "../../shared"
import { useFormContext, useFieldArray } from "react-hook-form";
import { DataSelect, EventsForm } from "../../../domain";
interface EventsSponsorProps {
    measures: DataSelect[]
    sponsors: DataSelect[]
}
export const EventsSponsor: React.FC<EventsSponsorProps> = ({
    measures,
    sponsors
}) => {
     const {  control, register, formState:{errors} } = useFormContext<EventsForm>();
        const { append, remove, fields } = useFieldArray({
            control,
            name: "sponsors",
        })
        const handleAddSponsor = () => {
            append({ sponsor: 
                null as any, 
                product: '', stock: 0,  observation: '', measure: { id: -1, name: '' } })
        }
    return (
        <section className="flex w-full h-full flex-col my-2">
            <div className="flex items-center my-2">
                <p className="font-bold text-gray-700 text-xl ">3. Patrocinadores | </p>
                <Button
                    variant="btn-outline-primary"
                    size="btn-sm"
                    icon={<Plus size={20} />}
                    onClick={handleAddSponsor}
                />
            </div>
            <div className="table-container ">
                <table className="border-b border-gray-500 w-full ">
                    <thead className="border-b border-gray-500">
                        <tr>
                            <th>
                                Patrocinador
                            </th>
                            <th>
                                Producto
                            </th>
                            <th>
                                Cantidad
                            </th>
                            <th>
                                Medida
                            </th>
                            <th>
                                Observacion
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
                                        name={`sponsors.${index}.sponsor` as any}
                                        control={control}
                                        data={sponsors}
                                        options={{ required: true }}
                                        errors={{
                                            isValid: Boolean(errors.sponsors?.[index]?.sponsor)
                                        }}
                                    />
                                </td>
                                <td className="px-2">
                                    <Input
                                        type="text"
                                        name={`sponsors.${index}.product` as any}
                                        register={register}
                                        errors={{
                                            isValid: Boolean(errors.sponsors?.[index]?.product),
                                        }}
                                        options={{ required: true }}
                                    />
                                </td>
                                <td className="px-2">
                                    <Input
                                        type="number"
                                        name={`sponsors.${index}.stock` as any}
                                        register={register}
                                        errors={{
                                            isValid: Boolean(errors.sponsors?.[index]?.stock),
                                            message: errors.sponsors?.[index]?.stock?.message,
                                        }}
                                        options={{ required: true,
                                            min: {
                                                value: 1,
                                                message: 'El valor mínimo es 1',
                                            }, max: 1000000 }}
                                    />
                                </td>
                                <td className="px-2">
                                    <InputSelect2 
                                        name={`sponsors.${index}.measure` as any}
                                        control={control}
                                        data={measures}
                                        options={{ required: true }}
                                        errors={{
                                            isValid: Boolean(errors.sponsors?.[index]?.measure),
                                        }}
                                        placeholder="Seleccione una medida"
                                    />
                                </td>
                                <td className="px-2">
                                    <Input
                                        type="text"
                                        name={`sponsors.${index}.observation` as any}
                                        register={register}
                                        options={{ required: true }}
                                        errors={{
                                            isValid: Boolean(errors.sponsors?.[index]?.observation),
                                        }}
                                    />
                                </td>
                                <td className="px-2 text-center">
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