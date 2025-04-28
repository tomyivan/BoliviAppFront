import { UseFormRegister, FieldValues, RegisterOptions }  from "react-hook-form";
interface InputProps<T extends FieldValues> {
    placeholder?: string;
    label?: string;
    type?: string;
    variant?: 'inp-outline' | 'inp-filled' | 'inp-normal';
    disabled?: boolean;
    register?: UseFormRegister<T>;
    name: keyof T;
    options?: RegisterOptions<T[keyof T]>;
    errors?: {
        isValid: boolean;
        message?: string;
    };
    className?: string;
    onChange?: (e: HTMLInputElement) => void;
}
export const Input=< T extends FieldValues >  ({
    placeholder,
    label,
    type = 'text',
    variant = 'inp-normal',
    disabled = false,
    register,
    name,
    options,
    errors,
    className,
    onChange
}: InputProps< T >) => {
    const registerProps = register ? register(name as any, options as any) : { onChange: undefined };
    return (
        <div className="w-full">
            {
                label && (
                    <label className={`block  text-gray-700 font-semibold mb-2 ${ errors?.isValid && 'text-red-500'}`} htmlFor={String(name)}>
                        {label}
                    </label>
                )
            }
            <input 
                type={type}
                className={`${variant} ${ disabled && 'cursor-not-allowed bg-gray-200 opacity-40'} ${errors?.isValid && '!border-red-500'} w-full ${ className }`}
                placeholder={placeholder}
                disabled = {disabled}
                {...(register ? register(name as any, options as any) : {})}
                autoComplete="off"                
                onChange={(e) => {
                    registerProps.onChange && registerProps.onChange(e); // primero llama al onChange de register (muy importante)
                    onChange && onChange(e.target as HTMLInputElement);   // luego llama a tu propio onChange si existe
                }}
            />       
            {   errors?.isValid && <small className="text-red-600 font-semibold">{ !errors?.message || errors?.message === ''? `Este campo es requerido` : errors?.message}</small>}
        </div>
    )
}