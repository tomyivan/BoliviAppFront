import { useState, useRef, useEffect } from "react";
import { DataSelect } from "../../../domain";
import { FieldValues, } from "react-hook-form";

interface InputSelectProps<T extends FieldValues> {
    data: DataSelect[];
    label?: string;
    placeholder?: string;
    variant?: "inp-outline" | "inp-filled" | "inp-normal";
    disabled?: boolean;
    value?: DataSelect | null;
    onChange?: (value:DataSelect) => void;
    onBlur?: () => void;
    name?: keyof T;
    isValid?: boolean;
}

export const InputSelect = <T extends FieldValues>({
    data,
    label,
    placeholder,
    variant = "inp-normal",
    disabled = false,
    onChange,
    onBlur,
    value = null,
    name,
    isValid = false
}: InputSelectProps<T>) => {
    // console.log(data);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState<DataSelect[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down")
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {    
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        if(divRef.current) {
            const inputRect = divRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - inputRect.bottom;
                const spaceAbove = inputRect.top;
                const dropdownHeight = 256;
                setDropdownDirection(spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove ? "down" : "up");
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toLowerCase();
        const newData = data.filter((item) =>
            item.name.toLowerCase().includes(newValue)
        );
        if( !isOpen ) {
            setIsOpen(true);
        }
        setFilteredData(newData);
        setHighlightedIndex(-1);
        setInputValue(newValue  );
    };

    const selectItem = (item: DataSelect) => {
        setFilteredData(data);
        onChange?.(item);
        setInputValue(item.name);
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || filteredData.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex < filteredData.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1
            );
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            selectItem(filteredData[highlightedIndex]);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleBlur = () => {
        const valid = filteredData.some((item) => item.name === ( inputValue ));
        if(!valid){ 
            setFilteredData(data);
            setInputValue('');
            onChange?.( null as any );
        }
    };
    useEffect(() => {
        if ( data.length === 0 ) {
            setFilteredData([
                { id: -1, name: 'Cargando...' }
            ]);
            setInputValue('');            
        }
        else {
            setFilteredData(data);
        }
    }
    , [data]);
    return (
        <div className="relative w-full" ref={divRef}>
            {label && (
                <label className={`block text-gray-700 font-semibold mb-2 ${ isValid && `text-red-500`}`} htmlFor={String(name)}>
                    {label}
                </label>
            )}
            <input
                ref={dropdownRef}
                name={String(name)}
                type="text"
                className={`${variant} ${disabled && "cursor-not-allowed bg-gray-200 opacity-40"} ${ isValid && '!border-red-500' } w-full `}
                placeholder={placeholder}
                disabled={disabled}
                value={ String(inputValue) }
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}              
                autoComplete="off"
                onChange={handleChange}
                onBlur={() =>  {
                    handleBlur();
                    onBlur && onBlur();
                }}

            />
            {isOpen && filteredData.length > 0 && (
                <ul className={`absolute z-10 w-full bg-gray-50 max-h-64 overflow-auto text-gray-700 border border-gray-300 rounded-md shadow-lg
                ${dropdownDirection === "up" && "bottom-full" }
                `}>
                    {filteredData.map((item, index) => (
                        <li
                            key={item.id}
                            className={`cursor-pointer p-1.5 hover:bg-gray-200 ${highlightedIndex === index && "bg-gray-100"}`}
                            onClick={() => selectItem(item)}
                            data-id={item.id}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}            
        </div>
    );
};
