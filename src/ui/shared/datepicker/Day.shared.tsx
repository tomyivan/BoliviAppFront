import dayjs from "dayjs";

export const RenderDays = () => {
    const days = [];
    const weekdays = dayjs.weekdaysMin();

    return (
      <div className="grid grid-cols-7">
        {weekdays.map((day, i) => (
          <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };