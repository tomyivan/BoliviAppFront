import { HistorySimpleDTO } from "../../../domain"
import { HistoryTarget } from "./HistoryTarget.component"
interface HistoryLineTimeProps {
    historyData: HistorySimpleDTO[]
}
export const HistoryLineTime:React.FC<HistoryLineTimeProps> = ({
    historyData
}) => {  
    return (
        <div className="min-h-screen sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
                Línea de Tiempo Histórica de Bolivia
                </h1>
                <div className="relative">
                <div className="absolute left-1/2 w-1 h-full bg-blue-400 transform -translate-x-1/2"></div>
                <div className="space-y-16 pb-16">
                    {historyData.map((event, index) =>
                        <HistoryTarget 
                            key={event.idHistory}
                            event={event}
                            onClick={() => {}}
                            index={index}
                        />                     
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}