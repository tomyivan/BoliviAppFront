import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  type?: "text" | "email" | "password" | "number" | "date" | "datetime-local" | "time";  
  placeholder?: string;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T[keyof T]>; // 👈 Tipamos correctamente las opciones
  errors: any;
  defaultValue?: string;  
  step?: boolean;
  min?: string;
}

export const InputLabel = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  options,
  errors,
  defaultValue,
  step= false,
  min
}: InputProps<T> ) => {

  return (
    <div className="mb-3 w-full">
      <label htmlFor={String(name)} className={`block text-sm font-medium text-gray-700 mb-1.5
          ${
            errors[name] ? 'text-red-600' : ''
          }
        `}>
        {label}
      </label>
      <input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        {...register(name as any, options as any)} // 👈 Forzamos tipo para evitar conflicto
        className={`border p-1 w-full rounded text-gray-700 border-gray-300 h-[35px] ${ errors[name] ? 'border-red-600' : ''}`}
        autoComplete="off"
        defaultValue={defaultValue}
        step={type === "number" && step ? "0.01" : undefined}
        min={min}
      />
        {errors[name] && <small className="text-red-600 font-semibold">{ errors[name]?.message === ''? `Este campo es requerido` : errors[name]?.message}</small>}
    </div>
  );
};