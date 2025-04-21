import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";
interface FilterDate {
    date: {
        start: Dayjs,
        end: Dayjs
    }
    addFilterDate: ( date: { start: Dayjs, end: Dayjs } ) => void,
    eraserFilterDate: () => void    
}
const initialState = {
    date: {
        start: dayjs(`${dayjs().format('YYYY-MM')}-01`),
        end: dayjs(`${dayjs().endOf('month')}`)
    }
}
export const useFilterDate = create<FilterDate>((set) => ({
        ...initialState,
        addFilterDate: ( date: { start: Dayjs, end: Dayjs } ) => set( { date } ),
        eraserFilterDate: () => set( initialState )
}));
