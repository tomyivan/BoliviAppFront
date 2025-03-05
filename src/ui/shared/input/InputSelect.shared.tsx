import { Controller, Control, FieldValues, RegisterOptions } from "react-hook-form"
import Select from "react-select"
import { List } from "../../../domain/models"
interface InputSelectProps<T extends FieldValues> {
    control: Control<any>,
    listOptions: List[]
    name: keyof T;
    options: RegisterOptions,
    errors: any,
    label: string,
    placeholder?: string,
    isDisabled?:boolean
}
export const InputSelect = <T extends FieldValues>({
    control,
    listOptions,
    name,
    options,
    errors,
    label,
    placeholder,
    isDisabled= false
}: InputSelectProps<T>
) => {
    return (
        <div className="mb-3 w-full">
             <label htmlFor={String(name)} className={`block text-sm font-medium text-gray-700 mb-1.5
                ${
                    errors[name] ? 'text-red-600' : ''
                }`}>
                {label}
            </label>
            <Controller
                    name={name as any}
                    control={control}
                    rules={ options }
                    render={({ field }) => <Select 
                        {...field} 
                        inputId={String(name)}
                        isDisabled={isDisabled}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        isClearable
                        className="truncate text-gray-700"
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                borderRadius: "0.25rem",
                                color: "#d1d5db",
                                height: "35px",
                                minHeight: "35px",
                                border: errors[name] ? "1px solid #e53e3e" : "1px solid #d1d5db",
                            }),
                            option: (styles, { isFocused }) => ({
                                ...styles,
                                backgroundColor: isFocused ? "#f5f7fa" : "white",
                                color: "#4b5563",
                                fontSize: "0.875rem",
                                zIndex: 9999,
                            }),
                            menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
                        }}
                        
                        options={listOptions} 
                        placeholder={placeholder ? placeholder : `Seleccione ${label.toLowerCase()}...`}
                    />
                }
            />
            {errors[name] && <small className="text-red-600 font-semibold">Este campo es requerido</small>}
        </div>
    )
}