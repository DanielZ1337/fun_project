import {create} from "zustand";

interface TokenStore {
    token: string | undefined
    setToken: (token: string | undefined) => void
}

export const useTokenStore = create<TokenStore>((set) => ({
    token: '',
    setToken: (token) => set({ token }),
}))