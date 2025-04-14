import React from "react";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

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
  const [ showPassword, setShowPassword ] = React.useState<boolean>(false);
  return (
    <div className="mb-3 w-full ">
      <label htmlFor={String(name)} className={`block text-sm font-medium text-gray-700 mb-1.5
          ${
            errors[name] ? 'text-red-600' : ''
          }
        `}>
        {label}
      </label>
      <div className="flex">
        <input
          id={String(name)}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...register(name as any, options as any)} // 👈 Forzamos tipo para evitar conflicto
          className={`border p-1 w-full rounded text-gray-700 border-gray-300 h-[35px] ${ options?.disabled && 'bg-gray-100 cursor-not-allowed' } ${ errors[name] ? 'border-red-600' : ''}`}
          autoComplete="off"
          defaultValue={defaultValue}
          step={type === "number" && step ? "0.01" : undefined}
          min={min}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 bg-gray-200 text-gray-700 rounded-r cursor-pointer "
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
            {/* {showPassword ? "Ocultar" : "Mostrar"} */}
          </button>
        )}
      </div>
        {errors[name] && <small className="text-red-600 font-semibold">{ errors[name]?.message === ''? `Este campo es requerido` : errors[name]?.message}</small>}
    </div>
  );
};