import { create } from "zustand";
interface FilterSelect {    
    data: Record<string, string>,
    addFilterSelect: ( data:Record<string,string> ) => void,
    eraserFilterSelect: ( ) => void
}
const initialState = {
    data: { }
}
export const useFilterSelect = create<FilterSelect>((set) => ({
        ...initialState,
        addFilterSelect: ( data:Record< string,string > ) => set( { data } ),
        eraserFilterSelect: ( ) => set( initialState )
    }));
