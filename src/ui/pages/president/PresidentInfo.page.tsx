import { useParams } from "react-router-dom"
import { useGetPresident } from "../../hooks";
import { useEffect, useState } from "react";
import { PresidentDTO } from "../../../domain";
import dayjs from "dayjs";
export const PresidentInfoPage = () => {
    const { getPresidentById } = useGetPresident();
    const { id } = useParams<{ id: string }>();
    const [ presidentData, setPresidentData ] = useState<PresidentDTO>({} as PresidentDTO);
    const baseUrl = import.meta.env.VITE_BASEURL;
    const loadPresident = async () => {
        if (!id) return;    
        const response = await getPresidentById(Number(id));
        setPresidentData(response);        
    }
    useEffect(() => {
        loadPresident()
    },[id])
    return (
        <div className="flex flex-col h-full w-full px-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{presidentData.name} {presidentData.lastname}</h1>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">{presidentData.biography}</p>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Partido Politico:</span>
                        <span className="text-gray-700 dark:text-gray-300">{presidentData.politicalParty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Fecha Nacimiento:</span>
                        <span className="text-gray-700 dark:text-gray-300">{dayjs(presidentData.dateBirthday).utc().format("DD/MM/YYYY")}</span>
                    </div>
                    {   !presidentData?.dateDeath && <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Fecha Fallecimiento:</span>
                            <span className="text-gray-700 dark:text-gray-300">{presidentData?.dateDeath}</span>
                        </div>
                    }
                    {/* <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Departamento:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.location?.department}</span>
                    </div>
    
                    { eventData.sponsors?.length > 0  && <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Organizador:</span>
                        <span className="text-gray-700 dark:text-gray-300">{eventData.sponsors?.map((sponsor) => sponsor.name).join(", ")}</span>
                    </div>} */}
                    
                </div>
            </div>
        </div>
    )
}