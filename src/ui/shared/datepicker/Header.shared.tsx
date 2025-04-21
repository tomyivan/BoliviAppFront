import { ChevronLeft, ChevronRight } from "lucide-react";
interface HeaderDatePickerProps {
    currentMonth: any;
    setCurrentMonth: (month: any) => void;
}
export  const HeaderDatePicker:React.FC<HeaderDatePickerProps> = ({
    currentMonth,
    setCurrentMonth
}) => {
    return (
      <div className="flex justify-between items-center p-2 border-b">
        <span
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer "
        >
          <ChevronLeft size={20} />
        </span>
        <span className="font-medium">
          {currentMonth.format("MMMM YYYY")}
        </span>
        <span
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
        >
          <ChevronRight size={20} />
        </span>
      </div>
    );
  };