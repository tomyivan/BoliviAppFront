import dayjs from "dayjs";
import { HistorySimpleDTO } from "../../../domain";

interface HistoryCardProps {
    event: HistorySimpleDTO;
    onClick: (event: HistorySimpleDTO) => void;
    index: number;
}
export const HistoryTarget:React.FC<HistoryCardProps> = ({
    event,
    onClick,
    index
}) => {
    const isSingleDayEvent = (event: HistorySimpleDTO) => {
        return event.dateStart === event.dateEnd;
      };
    return (
        <div
            key={event.idHistory}
            className={`relative  flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
            <div
                className="absolute left-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white transform -translate-x-1/2 -translate-y-3 z-10 cursor-pointer hover:bg-blue-700 transition-colors"
            ></div>
            <div
                className={`w-5/12 p-6 dark:bg-gray-600 bg-teal-300 rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} `}
                onClick={() => onClick(event)}
            >
                <div className="flex justify-between flex-col md:flex-row items-start mb-2">
                    <h3 className="text-xl font-bold dark:text-gray-200 text-gray-800">{event.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {event.category}
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-200 mb-4 line-clamp-2">{event.summary}</p>

                <div className="text-sm text-gray-700 dark:text-gray-300">
                    {isSingleDayEvent(event) ? (
                        <p>{dayjs(event.dateStart).format('DD/MM/YYYY')}</p>
                    ) : (
                        <p>
                            {dayjs(event.dateStart).utc().format('DD/MM/YYYY')} - {dayjs(event.dateEnd).utc().format('DD/MM/YYYY')}
                        </p>
                    )}
                </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8  px-2 text-gray-700 font-semibold">
                {
                    dayjs(event.dateStart).format('YYYY')
                }
            </div>
        </div>
    )
    
}