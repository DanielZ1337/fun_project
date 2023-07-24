import { create } from 'zustand'
import type { Post } from '@/types/post'

interface NotesStore {
    fetchedNotes: Post[]
    setFetchedNotes: (fetchedNotes: Post[]) => void
    addFetchedNotes: (fetchedNotes: Post[]) => void
    clearFetchedNotes: () => void
}

export const useNotesStore = create<NotesStore>((set) => ({
    fetchedNotes: [],
    setFetchedNotes: (fetchedNotes) => set({ fetchedNotes }),
    addFetchedNotes: (fetchedNotes) => set((state) => ({ fetchedNotes: [...state.fetchedNotes, ...fetchedNotes] })),
    clearFetchedNotes: () => set({ fetchedNotes: [] }),
}))