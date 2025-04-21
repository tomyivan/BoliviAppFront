import {  Box, CalendarDays, FormInput, History, Home } from "lucide-react"
import { SideBarList } from "../../../domain"
import dayjs from "dayjs"
 const date =  {
        start: dayjs(`${dayjs().format('YYYY-MM')}-01`),
        end: dayjs(`${dayjs().endOf('month')}`)
}
export const SideBarContent= ():SideBarList[]  => [
    {
        title: 'Inicio',
        icon: <Home />,
        link: '/inicio',
    },
    {
        title: 'Eventos',
        icon: <CalendarDays />,
        link: '/inicio/eventos',
        // query: `?de=${date.start.format('YYYY-MM-DD')}&hasta=${date.end.format('YYYY-MM-DD')}`,
    },{
        title: 'Historias',
        icon: <History />,
        link: '/historias',
    },    {
        title: 'Dependencias',
        icon: <Box />,
        subItems: [
            {
                title: 'Categorias',
                icon: <FormInput />,
                link: '/dependencias/Categorias',
            },
        ]
    },
]