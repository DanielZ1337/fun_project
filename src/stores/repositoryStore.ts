import {create} from "zustand";

interface RepositoryStore {
    owner: string
    repository: string
    setOwner: (owner: string) => void
    setRepository: (repository: string) => void
}

export const useRepositoryStore = create<RepositoryStore>((set) => ({
    owner: '',
    repository: '',
    setOwner: (owner) => set({ owner }),
    setRepository: (repository) => set({ repository }),
}))
