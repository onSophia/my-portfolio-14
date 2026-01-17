// src/store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Чтобы корзина сохранялась после перезагрузки

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
                    // Если товар уже есть, увеличиваем количество
                    set({
                        items: currentItems.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    // Если товара нет, добавляем
                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
            },

            removeItem: (id) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.id === id);

                if (existingItem && existingItem.quantity > 1) {
                    // Если больше 1, уменьшаем
                    set({
                        items: currentItems.map(item =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    });
                } else {
                    // Если 1, удаляем совсем
                    set({ items: currentItems.filter(item => item.id !== id) });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        { name: 'cart-storage' } // Название в LocalStorage
    )
);