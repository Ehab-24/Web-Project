import { create } from 'zustand'

type Store = {
    category: string
    searchTerm: string
    setCategory: (_: string) => void
    setSearchTerm: (_: string) => void
}

export const propertyFiltersStore = create<Store>()((set) => ({
    category: "",
    searchTerm: "",
    setCategory: (c: string) => set((state) => ({ ...state, category: c })),
    setSearchTerm: (s: string) => set((state) => ({ ...state, searchTerm: s }))
}))
