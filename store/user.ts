
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserData {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

interface UserState {
    user: UserData;
    updateUser: (data: Partial<UserData>) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: {
                name: "Александр",
                email: "alex@example.com",
                phone: "+380",
                address: "",
                city: "Харьков"
            },
            updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
        }),
        { name: 'user-storage' }
    )
);