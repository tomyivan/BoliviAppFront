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
    name: keyof T;
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
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState<DataSelect[]>(data);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down")
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(()=> {
        setInputValue(value?.name ?? "")
    },[value])
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
        const newValue = e.target.value;        
        const newData = data.filter((item) =>
            item.name.toLowerCase().includes(newValue.toLowerCase())
        );
        if( !isOpen ) {
            setIsOpen(true);
        }
        setFilteredData(newData);
        setHighlightedIndex(-1);
        // onChange?.( { id: -1, name: newValue } )
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

    const updateDropdownPosition = () => {
        if( isOpen && dropdownRef.current && divRef.current ) {
            const divRect = divRef.current.getBoundingClientRect();
            dropdownRef.current.style.top = `${divRect.bottom + window.scrollY}px`;
            dropdownRef.current.style.left = `${divRect.left + window.scrollX}px`;
            const hInput = divRef.current.children[1].getBoundingClientRect().height;
            dropdownRef.current.style.transform = dropdownDirection === "up" ? `translateY(calc(-100% - ${hInput < 40 ? hInput+15 : hInput}px))` : `translateY(0)`;
        }
    }
    useEffect(() => {
        if (!isOpen) return; 
        updateDropdownPosition();
        const handleScroll = () => {
            updateDropdownPosition();
        }
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", updateDropdownPosition);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", updateDropdownPosition);
        };
    }, [isOpen]);
    const handleBlur = () => {
        if ( dropdownRef.current ) return;   

        const selectedItem = filteredData.find((item) => item.name.toLowerCase() === ( (inputValue).toLowerCase() ));
        if(!selectedItem?.id){ 
            setInputValue('');
            value?.name && onChange?.( null as any );
        }else{        
            setInputValue(selectedItem.name);
            onChange?.(selectedItem);                     
        }
        setFilteredData(data);
        onBlur?.();
    };


    useEffect(() => {
        if ( data.length === 0 ) {
            setFilteredData([
                { id: -1, name: 'Cargando...' }
            ]);       
        }
        else {
            setFilteredData(data);
        }
    }
    , [data]);
    return (
        <div  className="relative w-full" ref={divRef}>
            {label && (
                <label className={`block text-gray-700 font-semibold mb-2 ${ isValid && `text-red-500`}`} htmlFor={String(name)}>
                    {label}
                </label>
            )}
            <input                
                name={String(name)}
                id={String(name)}
                type="text"
                className={`${variant} ${disabled && "cursor-not-allowed bg-gray-200 opacity-40"} ${ isValid && '!border-red-500' } w-full `}
                placeholder={placeholder}
                disabled={disabled}
                value={ String(inputValue) }
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}              
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}

            />
            {isOpen && filteredData.length > 0 && (
                <ul 
                    ref={dropdownRef}
                    className={`fixed z-50  bg-gray-50 max-h-64 overflow-auto text-gray-700 border border-gray-300 rounded-md shadow-lg`}
                        style={{
                            width: divRef.current ? `${divRef.current.clientWidth}px` : "auto",
                        }}
                    >
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
