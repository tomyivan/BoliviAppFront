import { PlusCircle } from "lucide-react"
import { Search, Calendar, Modal } from "../../components"
import { Button } from "../../shared"
import { useNavigate } from "react-router-dom"
import { useGetEvents, useDeleteEvents } from "../../hooks"
import { useEffect, useState } from "react"
import { CalendarEvent, EventFilters, EventSimpleDTO } from "../../../domain"
import { EventsOptions } from "../../modules"
export const EventsPage = () => {
    const navigation = useNavigate()
    const { getEvents } = useGetEvents();
    const { deleteEvent } = useDeleteEvents();
    const [ dataEvents , setDataEvents ] = useState<EventSimpleDTO[]>([]);
    const [ eventSelected, setEventSelected ] = useState<CalendarEvent | null>(null);
    const [ openModal, setOpenModal ] = useState(false);
    const handleDelete = async (idEvent: number) => {
        if( confirm("¿Estas seguro de eliminar el evento?") ){
            const response = await deleteEvent(idEvent);
            if( response ){
                setOpenModal(false)
                loadEvents()
            }
        }
    }
    const loadEvents = async () => {
        const response = await getEvents( 1, {} as EventFilters ) ; 
        setDataEvents(response)
    }
    const handleEvent = (event: CalendarEvent) => {
        setOpenModal(true)
        setEventSelected(event)
    }

    useEffect(() => {
        loadEvents()
    },[])
    return (
        <div className="flex flex-col h-full w-full px-4 gap-4">
            <Modal 
                showModal={openModal}
                setShowModal={setOpenModal}
                title="OPCIONES EVENTOS "
            >
                <div className="flex flex-col gap-2">
                    <EventsOptions 
                        idEvent={eventSelected?.idEvent || 0}
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
                            onClick={() => navigation('nuevo')}
                            icon={<PlusCircle size={20}/>}
                            fullRounded
                            widthFull
                        >
                            Agregar
                        </Button>
                    </div>        
            </div>
            <Calendar
                data={dataEvents}
                handleEvent={handleEvent}
            />
        </div>
    )
}