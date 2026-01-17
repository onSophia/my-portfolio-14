
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface FavoritesState {
    items: FavoriteItem[];
    toggleFavorite: (item: FavoriteItem) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            items: [],

            toggleFavorite: (item) => {
                const { items } = get();
                const exists = items.some((i) => i.id === item.id);

                if (exists) {

                    set({ items: items.filter((i) => i.id !== item.id) });
                } else {

                    set({ items: [...items, item] });
                }
            },

            isFavorite: (id) => {
                return get().items.some((i) => i.id === id);
            },
        }),
        { name: 'favorites-storage' }
    )
);