import { useNavigate } from "react-router-dom"
import { Pen, Trash, BookImage, Info } from "lucide-react";
interface EventsProps {
    idPresident: number;
    handleDelete: (idEvent: number) => void;   
}
export const PresidentOptions:React.FC<EventsProps> = ({
    idPresident,
    handleDelete
}) => {
    const navigate = useNavigate();
    const classli = "shadow-2xl bg-blue-200 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
    const handleOption = (type :number) => {
        if(  type === 1 ) {
            navigate(`editar/${idPresident}` )
        }else if(type === 2){
            navigate(`galeria/${idPresident}`)
        }else if(type === 3){
            navigate(`info/${idPresident}`)
        }else if(type === 4){
            handleDelete(idPresident)
        }
    }
    
    return (
        <ul className="p-2 flex flex-col gap-2 animate-fade-in font-semibold text-gray-600">
            <li 
                onClick={() => handleOption(1)}
            className={classli}> <Pen size={20} /> Editar</li>
            <li 
                onClick={() => handleOption(2)}
            className={classli}>
                <BookImage size={20} />
                Galeria</li>            
            <li 
                onClick={() => handleOption(3)}
            className={classli}>
                <Info size={20} />
                Informacion</li>            
            <li 
                onClick={() => handleOption(4)}
            className={`shadow-2xl bg-red-200 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center gap-2`}                
            >
                <Trash size={20}/>
                Borrar</li>
        </ul>
    )
}