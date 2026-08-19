import { create } from 'zustand';

interface UserStore {
    isadmin: boolean;
    setadmin: (isadmin: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isadmin: false,
    setadmin: (value) => set({ isadmin: value })

}))