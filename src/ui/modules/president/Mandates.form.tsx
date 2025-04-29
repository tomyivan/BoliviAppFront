import { useFieldArray, useFormContext } from "react-hook-form";
import { PresidentForm } from "../../../domain";
import { Button, Input } from "../../shared";
import { Plus, Trash } from "lucide-react";
import dayjs from "dayjs";


export const MandateForm= () => {
    const { register, control, formState:{errors}, getValues } = useFormContext<PresidentForm>();
    const { fields: mandate, append, remove } = useFieldArray({
        control,
        name: "mandates",
    });
    const addMandate = () => {
        append({ nroMandate: mandate.length + 1, startDate: '', endDate: '', observation: '' })
    }
    return (
        <section className="flex flex-col h-full w-full p-2">
            <div className="flex items-center my-2">
                <p className="font-bold text-gray-700 text-xl ">Mandatos | </p>
                <Button
                    variant="btn-primary"
                    size="btn-sm"
                    icon={<Plus size={20} />}
                    onClick={addMandate}
                />
            </div>
            <div className=" table-container  overflow-auto">
                <table className="border-b border-gray-500 w-full">
                    <thead className="border-b border-gray-500">
                        <tr>
                            <th>
                                Nro de Mandato
                            </th>
                            <th>
                                Fecha de Inicio
                            </th>
                            <th>
                                Fecha de Fin
                            </th>
                            <th>
                                Detalle
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mandate.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-2">           
                                    <Input 
                                        register={register}
                                        name={`mandates.[${index}].nroMandate` as any}
                                        type="number"
                                        variant="inp-filled"   
                                        options={{ required: true }}
                                        errors={{
                                            isValid: Boolean(errors.mandates?.[index]?.nroMandate),
                                            }}                                     
                                    />
                                </td>
                                <td className="px-2">           
                                    <Input 
                                        register={register}
                                        name={`mandates.[${index}].startDate` as any}
                                        type="date"
                                        variant="inp-filled"
                                        options={{ required: true }}
                                        errors={{
                                            isValid: Boolean(errors.mandates?.[index]?.startDate),
                                            }}
                                    />
                                </td>
                                <td className="px-2">           
                                    <Input 
                                        register={register}
                                        name={`mandates.[${index}].endDate` as any}
                                        type="date"
                                        variant="inp-filled"
                                        options={{ required: true,
                                            validate: (value) => {
                                                const startDate = dayjs(String(getValues(`mandates.${index}.startDate`))).toDate();
                                                const endDate = dayjs(String(value)).toDate();
                                                return startDate < endDate || "La fecha de fin debe ser mayor a la fecha de inicio";
                                            },
                                        }}
                                        errors={{
                                            isValid: Boolean(errors.mandates?.[index]?.endDate),
                                            message: errors.mandates?.[index]?.endDate?.message,
                                            }}
                                    />
                                </td>
                                <td className="px-2">           
                                    <Input 
                                        register={register}
                                        name={`mandates.[${index}].observation` as any}
                                        type="text"
                                        variant="inp-filled"                                     
                                    />
                                </td>
                                <td className="px-2">           
                                    <Button
                                        variant="btn-outline-danger"
                                        size="btn-sm"
                                        icon={<Trash size={20} />}
                                        onClick={() => remove(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}