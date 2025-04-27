import { FormEvents } from "../../modules";
import { useAddEvents, useDepartaments, useGetEvents, useGetMiscellaneous, useResource, useSponsor } from "../../hooks";
import { DataSelect, Departaments, Events } from "../../../domain";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const EventsEditPage = () => {
    const { id } = useParams();
    const { getEvent } = useGetEvents();
    const [ event, setEvent ] = useState<Events>({} as Events);
    //    const [departaments, setDepartaments] = useState<Departaments[]>([]);
    //     const [ measures, setMeasures ] = useState<DataSelect[]>([]);
    //     const [ resources, setResources ] = useState<DataSelect[]>([]);
    //     const [ sponsors, setSponsors ] = useState<DataSelect[]>([]);
    //     const [ categories, setCategories ] = useState<DataSelect[]>([]);
//     const { getDepartaments } = useDepartaments();
//     const { getMeasures } = useGetMiscellaneous();
//    const { getResources } = useResource();
//     const { getSponsors } = useSponsor();
//     const { getCategoriesEvent } = useGetEvents();
    // const { addEvents } = useAddEvents();
    // const loadDependencies =async () => {   
    //     const [departaments, measures, resources, sponsors, dataCategory ] = await Promise.all([
    //         getDepartaments(),
    //         getMeasures(),
    //         getResources(),
    //         getSponsors(),
    //         getCategoriesEvent()
    //     ]);
    //     setDepartaments(departaments);
    //     setMeasures(measures);
    //     setResources(resources);
    //     setSponsors(sponsors);
    //     setCategories(dataCategory);
    // }
    const loadEvent = async (idEvent: number) => {
        if ( !idEvent || idEvent === 0  ) return;
        const response = await getEvent(idEvent);
        setEvent(response);
    };
    useEffect(() => {        
        loadEvent(Number(id));
    }
    , []);
    return (
        <div>
            <h1>Events Edit</h1>
            {event?.idEvent &&
                <FormEvents
                    data={event}
                />

            }
        </div>
    );
}