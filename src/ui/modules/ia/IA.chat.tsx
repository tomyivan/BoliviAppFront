import { useIAChatStore } from "../../store"
import { UserPetition, IAResponseDTO } from "../../../domain";
import { Button } from "../../shared";
import { useEffect, useRef, useState } from "react";
import { useAddIA } from "../../hooks";
export const IAChat = () => {
    const baseURL = import.meta.env.VITE_BASEURL;
    const { addIA } = useAddIA();
    const [load, setLoad] = useState(false);
    const { addChat, chat } = useIAChatStore();
    const textRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);
        const form = new FormData(e.currentTarget);
        const text = form.get('text')?.toString() || '';
        if (text.trim() === '') return;        
        addChat({ type: 'User', data: { text } });
        textRef.current!.value = '';
        const response = await addIA({ text });
        console.log("response", response);
        if (response) {
            addChat({ type: 'IA', data: !Array.isArray(response)?  [{ name: 'Error', content: response }] : response });
        } else {
            addChat({ type: 'IA', data: [{ name: 'Error', content: 'Error al obtener la respuesta de IA' }] });
        }
        setLoad(false);
    }
    useEffect(() => {
        const chatContainer = containerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    } ,[chat]);
    return (
        <div className="w-[calc(100vh-20px)] h-[calc(100vh-20px )] flex flex-col gap-4 p-4">
            <div className="overflow-auto h-[70vh] flex flex-col gap-2" ref={containerRef}>
                {chat.map((item, index) => (
                    <div key={index} className={`p-2 rounded-lg ${item.type === 'User' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'}`}>
                        {item.type === 'User' 
                            ? (item.data as UserPetition).text 
                            : (item?.data as IAResponseDTO[])?.map((response, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <span className="text-gray-500 text-xl font-semibold">{response.name}</span>
                                    <p className="text-gray-700">{response.summary}</p>
                                    <p className="text-gray-700">{response.content}</p>

                                    {response.img && response.img.length > 0 && (
                                        <div className="flex flex-row gap-2 overflow-auto">
                                            {response?.img.map((image, index) => (
                                                <img key={index} src={`${baseURL}/uploads/presidents/${image.name}`} alt={`Image ${index}`} className="w-32 h-32 object-cover rounded-lg" />
                                            ))}
                                        </div>
                                            )
                                    }    
                                </div>
                            ))} 
                    </div>
                ))}
                {
                    load && (
                        <div className="p-2 rounded-lg bg-gray-200 self-start animate-pulse">
                            <p className="text-gray-700">Analizando Pregunta...</p>
                        </div>
                    )
                }
            </div>

            <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
                <textarea 
                    className="w-full h-[45px] overflow-hidden border border-gray-300 rounded-lg p-2"
                    placeholder="Escribe tu pregunta acerca de bolivia..."
                    name="text"
                    id="text"
                    ref={textRef}
                ></textarea>
                <Button variant="btn-primary" type="submit"
                    disabled={load}
                >Enviar</Button>

            </form>
        </div>
    )
}