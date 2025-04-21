import { DatePicker } from "../../shared"
import { useEffect, useRef, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { optionsFilter } from "./optionsDateFilter"
import { useFilterDate } from "../../store"
import { useSearchParams } from "react-router-dom"
import { memo } from "react"
interface DateRange {
  start: Dayjs ;
  end: Dayjs ;
}
export const DateFilter = memo(() => {
    const listRef = useRef<HTMLUListElement>(null)
    const [ searchParams, setSearchParams ] = useSearchParams();   
    const [ dropdown, setDropdown ] = useState(false)
    const [ dateRange, setDateRange ] = useState<DateRange>({ 
        start: optionsFilter[5].action().from,
        end: optionsFilter[5].action().to
    })
    const [ showDatePicker, setShowDatePicker ] = useState(false)
    const { addFilterDate, date, eraserFilterDate } = useFilterDate();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                setDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[])
    const handleChange = (range: DateRange) => {
        setDateRange(range)                                             
        setDropdown(false)       
    }

    useEffect(() => {
        addFilterDate(dateRange) 
        searchParams.set('de', dateRange.start.format('YYYY-MM-DD'));
        searchParams.set('hasta', dateRange.end.format('YYYY-MM-DD'));
        setSearchParams(searchParams);
    },[dateRange])

    useEffect(() => {
        if(searchParams.get('de') && searchParams.get('hasta')) { 
            addFilterDate({
                start: dayjs(searchParams.get('de')),
                end: dayjs(searchParams.get('hasta'))
            });
        }else{  
            searchParams.set('de', dayjs(date.start).format('YYYY-MM-DD'));
            searchParams.set('hasta', dayjs(date.end).format('YYYY-MM-DD'));
            setSearchParams(searchParams);
        }
        return () => {
            eraserFilterDate();
        }
    }, []);
    
    return (
        <div className="relative text-gray-600 dark:text-gray-200 md:w-auto w-full">
            <div
                className="border border-blue-500 p-1 px-2 rounded-full cursor-pointer flex justify-between items-center"
                onClick={() => setDropdown(!dropdown)}
            >            
            <span>
                {dateRange.start ? dateRange.start.format("DD/MM/YYYY") : "Fecha Inicio"}
                {" - "}
                {dateRange.end ? dateRange.end.format("DD/MM/YYYY") : "Fecha Fin"}
            </span>
            </div>
            <DatePicker 
                initialRange={dateRange}
                onChange={(range) => setDateRange(range as any)}
                show={showDatePicker}
                handleShow={( newShow:boolean ) => setShowDatePicker(newShow)}           
            />
            {
                dropdown && <ul 
                    ref={listRef}
                    className="absolute dark:bg-gray-900 z-10 bg-teal-50 dark:text-gray-200 text-gray-600 shadow rounded-xl w-full">
                    {
                        optionsFilter.map((option, index) => (
                            <li key={index} className="cursor-pointer dark:hover:bg-gray-800 hover:bg-teal-100 p-1"
                                onClick={() => handleChange({
                                        start: option.action().from,
                                        end: option.action().to
                                })}
                            >
                                {option.label}
                            </li>
                        ))
                    }
                    <li className="cursor-pointer dark:hover:bg-gray-800 hover:bg-teal-100 p-1"
                        onClick={() => {
                            setShowDatePicker(true)
                            setDropdown(false)
                        }}
                    >Personalizado</li>
                </ul>
                    
            }
        </div>
    )   
})