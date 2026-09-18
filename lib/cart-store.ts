"use client";

import { create } from "zustand";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
    giftWrap?: boolean;
};

type CartState = {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: () => number;
    count: () => number;
    
    // Auth modal state
    isAuthOpen: boolean;
    setIsAuthOpen: (open: boolean) => void;
    authTab: "signin" | "register";
    setAuthTab: (tab: "signin" | "register") => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isOpen: false,
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            }
            return { items: [...state.items, item] };
        }),
    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
    clearCart: () => set({ items: [] }),
    subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    
    // Auth modal state
    isAuthOpen: false,
    setIsAuthOpen: (open: boolean) => set({ isAuthOpen: open }),
    authTab: "signin",
    setAuthTab: (tab: "signin" | "register") => set({ authTab: tab }),
}));