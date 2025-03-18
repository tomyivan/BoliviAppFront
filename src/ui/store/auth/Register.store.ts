import { create } from "zustand";
import { Register } from "../../../domain";
interface RegisterState {
    registerU: Register,
    addRegister: (auth:Register) => void ,
    eraserRegister: () => void
}
export const useRegisterStore = create<RegisterState>((set) => ({ 
        registerU: {} as Register, 
        addRegister: (registerU:Register) => set({ registerU }),
        eraserRegister: () => set({})
    }));
