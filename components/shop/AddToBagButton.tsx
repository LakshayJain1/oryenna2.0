"use client";

import { useCartStore } from "@/lib/cart-store";

type AddToBagButtonProps = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function AddToBagButton({ id, name, price, image }: AddToBagButtonProps) {
    const { addItem, openCart } = useCartStore();

    const handleAdd = () => {
        addItem({ id, name, price, quantity: 1, image });
        openCart();
    };

    return (
        <button
            onClick={handleAdd}
            className="w-full py-3 bg-surface text-primary font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2"
            type="button"
        >
            <span className="material-symbols-outlined text-[16px]">add</span>{" "}
            Add To Vessel Bag
        </button>
    );
}
