import { create } from "zustand";
import { IAChats } from "../../../domain";
interface IAChatState {
    chat: IAChats[],
    addChat: (chat:IAChats) => void,
    eraserChat: () => void,
    setChat: (chat:IAChats[]) => void
}

const initialState = {
    chat: []
}
export const useIAChatStore = create<IAChatState>((set) => ({
        ...initialState,
        addChat: (chat:IAChats) => set( (state) => ({ chat: [...state.chat, chat] }) ),
        eraserChat: () => set( initialState ),
        setChat: (chat:IAChats[]) => set({ chat })
        
    }));
