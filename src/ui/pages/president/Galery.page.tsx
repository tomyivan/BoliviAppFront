import { useEffect, useState } from "react";
import { PresidentImage } from "../../../domain";
import { useParams } from "react-router-dom";
import { PresidentUploadImg } from "../../modules/president/President.UploadImg";
import { Trash } from "lucide-react";
import { useGetPresident, useDeletePresident, useUpdatePresident } from "../../hooks";
export const PresidentGaleryPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getPresidentImage } = useGetPresident();
    const { deletePresidentImage } = useDeletePresident();
    const { isFrontPage } = useUpdatePresident();
        const baseUrl = import.meta.env.VITE_BASEURL;
        const [ presidentFile, setPresidentFile ] = useState<PresidentImage[]>([]);
        const loadPresidentImage = async () => {
            if (!id) return;    
            const response = await getPresidentImage(Number(id));
            setPresidentFile(response);          
        };
        const handleDelete = async (data: PresidentImage) => {
            if (!data.idFile || !confirm("¿Estas seguro de eliminar la imagen?")) return;
            const response = await deletePresidentImage(data.idFile);
            response && loadPresidentImage();
        }
        const handleFrontPage = async (data: PresidentImage) => {  
            const response = await isFrontPage(Number(data.idFile), Number(id));
            response && loadPresidentImage();
         }

        useEffect(() => {
            loadPresidentImage();
        }, [id]);
    return ( <div className="container mx-auto mt-5 mb-5">
        <PresidentUploadImg 
            idPresident={Number(id)}
            loadEventImage={loadPresidentImage}
        />           
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {presidentFile.map((file) => (
                <div key={file.idFile} className="relative group bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                    onDoubleClick={() => handleFrontPage(file)}
                >
                    <div className="flex-1 flex justify-center items-center overflow-hidden bg-gray-200 dark:bg-gray-700 dark:text-gray-200"> 
                        <img
                            src={`${baseUrl}/uploads/presidents/${file.name}`}
                            alt={file.name}
                            className="h-48 object-cover"
                        />
                    </div>
                    <div className={`flex items-center justify-between ${file?.isFrontPage === 1? `bg-emerald-200`: `bg-gray-100`} `}>
                        <p className="text-gray-600 text-center text-sm px-2">{file.name}</p>
                        <p className="bg-red-400 p-4 text-gray-200 cursor-pointer hover:opacity-80"
                            onClick={() => handleDelete(file)}
                        ><Trash size={20} /></p>
                    </div>

                </div>
            ))}                
        </div>
    </div>  )
}