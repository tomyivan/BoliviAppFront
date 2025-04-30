import { PlusCircle } from "lucide-react"
import { Search, Modal } from "../../components"
import { Button } from "../../shared"
import { useEffect, useState } from "react"
import { PresidentOptions } from "../../modules"
import {  useGetPresident, useDeletePresident } from "../../hooks"
import {  President } from "../../../domain"
import { useNavigate } from "react-router-dom"
import { useSearchStore } from "../../store"
export const PresidentPage = () => {
    const navigate = useNavigate();
    const { search } = useSearchStore();
    const [ openModal, setOpenModal ] = useState(false);
    const [ presidents, setPresidents ] = useState<President[]>([]);
    const [ idPresident, setIdPresident ] = useState<number>(0);
    const [ filterPresident, setFilterPresident ] = useState<President[]>([]);
    const { deletePresident } = useDeletePresident();
    const { getPresidents } = useGetPresident();
    const baseUrl = import.meta.env.VITE_BASEURL;
    const loadPresidents = async () => {
        const response = await getPresidents();
        setPresidents(response);
    }
    const handlePresident = (president: President) => { 
        setOpenModal(true)
        setIdPresident(Number(president.idPresident))
    }
    const handleDelete = async () => {  
        if (idPresident === 0 || !confirm("¿Estas seguro de eliminar el presidente?")) return;
        const response = await deletePresident(idPresident);
        if( !response ) return;
        loadPresidents();
        setOpenModal(false)
    }
    useEffect(() => {
        if( search ){
            const filter = presidents.filter((president) => {
                return president.name.toLowerCase().includes(search.toLowerCase()) || 
                       president.lastname.toLowerCase().includes(search.toLowerCase())
            })
            setFilterPresident(filter)
        }else{
            setFilterPresident(presidents)
        }
    }
    , [search, presidents])
    useEffect(() => {
        loadPresidents()
    }, [])
    return (
        <div className="flex flex-col h-full w-full px-4 gap-4">
            <Modal
                showModal={openModal}
                setShowModal={() => setOpenModal(false)}
                title="OPCIONES EVENTOS "
            >
                <div className="flex flex-col gap-2">
                    <PresidentOptions 
                        idPresident={idPresident}
                        handleDelete={handleDelete}
                    />
                </div>
            </Modal>
             <div className="flex justify-end md:flex-row rounded-2xl flex-col gap-2 items-center bg-gray-50 shadow-lg px-4 dark:bg-gray-700 dark:text-gray-200">                      
                    <Search />                    
                    <div className="md:w-auto w-full ">
                        <Button 
                            variant="btn-primary"
                            size="btn-sm"
                            onClick={() => navigate('/inicio/presidentes/nuevo')}
                            icon={<PlusCircle size={20}/>}
                            fullRounded
                            widthFull
                        >
                            Agregar
                        </Button>
                    </div>        
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filterPresident.map((president) => (
                    <div key={president.idPresident} className="relative group bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                        onClick={() => handlePresident(president)}
                    >
                        <div className="flex-1 flex justify-center items-center overflow-hidden bg-gray-200 dark:bg-gray-700 dark:text-gray-200"> 
                            <img
                                src={`${baseUrl}/uploads/presidents/${president.picture}`}
                                alt={`${president.name} ${president?.lastname}`} 
                                className="h-48 object-cover"
                            />
                        </div>
                        <div className="flex items-center justify-between bg-gray-100">
                            <p className="text-gray-600 text-center text-sm p-4 font-semibold">{president.name} {president?.lastname}</p>
                        </div>
                    </div>
                ))}                
            </div>
        </div>
    )
}