import dayjs from "dayjs";
import gsap from "gsap";
// import { mockEvents } from "../../../content/Calendar.content";
import { useRef, useState } from "react";
import { Days } from "./Days.component";
import { Month } from "./Month.component";
import { DayDetail } from "./DayDetail.components";
import { CalendarEvent } from "../../../domain";

export const mockEvents: CalendarEvent[] = [
    { date: '2025-04-04', title: 'Reunión con clientes',  startTime: '05:00' , endTime: '06:00', color: 'bg-blue-500' },
    { date: '2025-04-12', title: 'Taller de diseño', startTime: '08:00' , endTime: '10:00', color: 'bg-green-500' },
    { date: '2025-04-12', title: 'Cumpleaños de Ana', startTime: '11:00' , endTime: '14:00', color: 'bg-pink-500' },
    { date: '2025-04-27', title: 'Demo producto',  startTime: '15:00' , endTime: '16:00', color: 'bg-yellow-500' },
    { date: '2025-04-27', title: 'Demo producto',  startTime: '11:00' , endTime: '17:00', color: 'bg-yellow-500' },
    { date: '2025-04-27', title: 'Demo producto',  startTime: '14:00' , endTime: '15:00', color: 'bg-yellow-500' },
    { date: '2025-04-27', title: 'Demo producto',  startTime: '11:00' , endTime: '12:00', color: 'bg-yellow-500' },
    { date: '2025-04-27', title: 'Demo producto',  startTime: '10:00' , endTime: '13:00',color: 'bg-yellow-500' },
  ];
  
export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
    const containerRef = useRef<HTMLDivElement>(null);
    const [ dayDetail, setDayDetail ] = useState<CalendarEvent[]>([]);
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDate = startOfMonth.startOf("week");
    const endDate = endOfMonth.endOf("week");

    const calendarDays = [];
    let date = startDate;
    while (date.isBefore(endDate) || date.isSame(endDate)) {
        calendarDays.push(date);
        date = date.add(1, "day");
    }

    const goToPrevMonth = () => {
        animateTransition(-50);
        setCurrentMonth((prev) => prev.subtract(1, "month"));
    };

    const goToNextMonth = () => {
        animateTransition(50);
        setCurrentMonth((prev) => prev.add(1, "month"));
    };

    const animateTransition = (xOffset: number) => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, x: xOffset },
                { opacity: 1, x: 0, duration: 0.3 }
            );
        }
    };

    const getEventsForDay = (day: dayjs.Dayjs) =>
        mockEvents.filter((e) => dayjs(e.date).isSame(day, "day"));

    const handleDay = (day: dayjs.Dayjs) => {
        const events = getEventsForDay(day);
        setDayDetail(events);   
    }
    return (
        <div className="flex h-full mx-auto p-4 text-gray-700 bg-gray-50 shadow-lg rounded-lg w-full dark:bg-gray-700 dark:text-gray-200">
            <DayDetail
                data={dayDetail}
            />

        <div className="w-full h-full rounded-lg dark:bg-gray-800 shadow-lg overflow-hidden">
            <Month 
                currentMonth={currentMonth}
                goToNextMonth={goToNextMonth}
                goToPrevMonth={goToPrevMonth}
            />
            <Days />
            <div className="grid grid-cols-7 gap-px " ref={containerRef}>
                {calendarDays.map((day, index) => {
                    const isCurrentMonth = day.month() === currentMonth.month();
                    const isToday = day.isSame(dayjs(), "day");
                    const events = getEventsForDay(day);

                    const dayClasses = ` cursor-pointer hover:opacity-50 h-[100px] overflow-hidden p-1 border border-gray-400 bg-gray-50 text-sm dark:bg-gray-700 
                        ${isCurrentMonth ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-400"}
                    `;
                    const todayClasses = isToday
                        ? "bg-blue-400 rounded-full px-2 py-1 text-gray-100"
                        : "";

                    return (
                        <div key={index} className={dayClasses} onClick={() => handleDay(day)}>
                            <div className="text-right font-semibold">
                                <span className={todayClasses}>{day.date()}</span>
                            </div>
                            
                            { events?.length > 0 && <div className="space-y-1 mt-1">

                                    <div                                        
                                        className={`text-white text-xs px-1 rounded ${events[0]?.color}`}
                                    >
                                        {events[0]?.title}
                                    </div>
                                    <div                                        
                                        className={`text-white text-xs px-1 rounded ${events[1]?.color}`}
                                    >
                                        {events[1]?.title}
                                    </div>
                                   {
                                        events.length > 2 ? (
                                            <div className="text-xs text-gray-500 dark:text-gray-200 font-semibold text-center">
                                                +{events.length - 2} mas
                                            </div>
                                        ) : null
                                   }
                            </div>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
};