interface RenderCellsProps {
    currentMonth: any;
    dateRange: { start: any; end: any };
    handleDateClick: (date: any) => void;
    handleMouseEnter: (date: any) => void;
    isInRange: (date: any) => boolean;
} 
export const RenderCells:React.FC<RenderCellsProps> = ({
    currentMonth,
    dateRange,
    handleDateClick,
    handleMouseEnter,
    isInRange
}) => {
    const monthStart = currentMonth.startOf("month");
    const monthEnd = currentMonth.endOf("month");
    const startDay = monthStart.startOf("week");
    const endDay = monthEnd.endOf("week");
    const rows = [];
    let days = [];
    let day = startDay;

    while (day.isSameOrBefore(endDay)) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelectedStart = dateRange.start?.isSame(cloneDay, "day");
        const isSelectedEnd = dateRange.end?.isSame(cloneDay, "day");
        const isInRangeDay = isInRange(cloneDay);
        const isCurrentMonth = cloneDay.isSame(currentMonth, "month");

        days.push(
          <div
            key={day.toString()}
            className={`relative p-2 text-center cursor-pointer 
              ${!isCurrentMonth ? "text-gray-400" : ""}
                ${isSelectedStart && "rounded-l-2xl"}
                ${isSelectedEnd && "rounded-r-2xl" }
              ${isSelectedStart || isSelectedEnd ? "bg-blue-400 text-white" : ""}
              ${isInRangeDay && !isSelectedStart && !isSelectedEnd ? "bg-blue-100" : ""}
              hover:bg-blue-200`}
            onClick={() => handleDateClick(cloneDay)}
            onMouseEnter={() => handleMouseEnter(cloneDay)}
          >
            <span className={`${(isSelectedStart || isSelectedEnd) ? "font-bold" : ""}`}>
              {day.format("D")}
            </span>
          </div>
        );
        day = day.add(1, "day");
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-2">{rows}</div>;
  };