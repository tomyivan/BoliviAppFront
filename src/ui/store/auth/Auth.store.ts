import { create } from "zustand";
import { CredentialDTO } from "../../../domain";
interface AuthState {
    auth: CredentialDTO,
    addAuth: (auth:CredentialDTO) => void  ,
    removeAuth: () => void,
}
export const useAuthStore = create<AuthState>((set) => ({ 
        auth: {} as CredentialDTO, 
        addAuth: (auth:CredentialDTO) => set({ auth }),
        removeAuth: () => set({ auth: {} as CredentialDTO })
    }));
