import { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthProps {
    currentMonth: Dayjs;
    goToNextMonth: () => void;
    goToPrevMonth: () => void;
}
export const Month: React.FC<MonthProps> = ({
    currentMonth,
    goToNextMonth,
    goToPrevMonth,
}) => {
    return (
        <header className="flex justify-between items-center mb-4 capitalize">
            <span
                onClick={goToPrevMonth}
                className="p-2 rounded-full hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600"
            >
                <ChevronLeft size={20} />
            </span>
            <h2 className="text-2xl font-bold">{currentMonth.format("MMMM YYYY")}</h2>
            <span
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-gray-600"
            >
                <ChevronRight size={20} />
            </span>
        </header>
    );
};
