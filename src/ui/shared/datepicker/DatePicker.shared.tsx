import { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

import { HeaderDatePicker } from "./Header.shared";
import { RenderDays } from "./Day.shared";
import { RenderCells } from "./Cell.shared";

// Extender dayjs con los plugins necesarios
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(localeData);

interface DateRange {
  start: Dayjs | null;
  end: Dayjs | null;
}

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  initialRange?: DateRange;
  handleShow: (open:boolean) => void;
  show?: boolean;
}

export const DatePicker = ({ 
    onChange, 
    initialRange, 
    handleShow,
    show = false
}: DateRangePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [dateRange, setDateRange] = useState<DateRange>(initialRange || { start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        handleShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date: Dayjs) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
    } else {
      if (date.isSameOrBefore(dateRange.start)) {
        setDateRange({ start: date, end: dateRange.start });
      } else {
        setDateRange({ ...dateRange, end: date });
      }
      onChange({ start: dateRange.start, end: date });
    }
  };

  const handleMouseEnter = (date: Dayjs) => {
    if (dateRange.start && !dateRange.end) {
      setHoverDate(date);
    }
  };

  const isInRange = (date: Dayjs) => {
    if (dateRange.start && dateRange.end) {
      return date.isBetween(dateRange.start, dateRange.end, "day", "[]");
    }
    if (dateRange.start && hoverDate) {
      return date.isBetween(
        dateRange.start.isSameOrBefore(hoverDate) ? dateRange.start : hoverDate,
        dateRange.start.isSameOrBefore(hoverDate) ? hoverDate : dateRange.start,
        "day", "[]"
      );
    }
    return false;
  };

  return (
    <div ref={pickerRef} className="relative">
      {show && (
        <div className="absolute z-10 mt-1 bg-gray-100 text-gray-500 rounded-lg shadow-lg border p-2 w-64">
          <HeaderDatePicker 
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          {<RenderDays />}
          <RenderCells 
            currentMonth={currentMonth}
            dateRange={dateRange}
            handleDateClick={handleDateClick}
            handleMouseEnter={handleMouseEnter}
            isInRange={isInRange}
            />
          <div className="flex justify-between p-2 border-t">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => {
                setDateRange({ start: null, end: null });
                onChange({ start: null, end: null });
              }}
            >
              Limpiar
            </button>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleShow(false)}
            >
               Listo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};