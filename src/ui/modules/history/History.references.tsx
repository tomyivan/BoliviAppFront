import { Plus, Trash } from "lucide-react"
import { Button } from "../../shared"
import { HistoryForm } from "../../../domain";
import { useFormContext, useFieldArray } from "react-hook-form";
export const HistoryReferences = () => {
     const {  control, register, formState:{errors} } = useFormContext<HistoryForm>();
        const { append, remove, fields } = useFieldArray({
            control,
            name: "referencesHistory",
        })
        const handleAddReference = () => {
            append({reference: ''})
        }
    return (
        <div className="flex w-full h-full flex-col my-2">
            <div className="flex items-center my-2">
                <p className="font-bold text-gray-700 text-xl ">Referencias | </p>
                <Button
                    variant="btn-outline-primary"
                    size="btn-sm"
                    icon={<Plus size={20} />}
                    onClick={handleAddReference}
                />
            </div>
            <ul>
                {
                    fields.map((item, index) => (
                        <li key={item.id} className="flex gap-2 mb-2">
                            <input
                                className={`inp-filled w-full h-10 p-2 ${errors && errors?.referencesHistory && 'border-red-500'}`}
                                placeholder="Referencia"
                                {...register(`referencesHistory.${index}.reference`, { required: true })}
                            />
                            <Button
                                variant="btn-outline-danger"
                                size="btn-sm"
                                icon={<Trash size={20} />}
                                onClick={() => remove(index)}
                            />
                        </li>
                    ))
                }

            </ul>       
        </div>
    )
}