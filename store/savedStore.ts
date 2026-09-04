import { create } from 'zustand';

interface SavedStore {
    savedIds: string[];
    toggleSaved: (id: string) => void;
}

export const useSavedStore = create<SavedStore>((set) => ({
    savedIds: [],
    toggleSaved: (id) =>
        set((state) => ({
            savedIds: state.savedIds.includes(id)
                ? state.savedIds.filter((s) => s !== id)
                : [...state.savedIds, id],
        })),
}));