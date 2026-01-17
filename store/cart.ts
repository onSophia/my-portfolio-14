
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.id === product.id);

                if (existingItem) {

                    set({
                        items: currentItems.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {

                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
            },

            removeItem: (id) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.id === id);

                if (existingItem && existingItem.quantity > 1) {

                    set({
                        items: currentItems.map(item =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    });
                } else {

                    set({ items: currentItems.filter(item => item.id !== id) });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        { name: 'cart-storage' }
    )
);