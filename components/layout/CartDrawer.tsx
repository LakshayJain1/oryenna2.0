"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function CartDrawer() {
    const { items, isOpen, closeCart, subtotal, removeItem, count } =
        useCartStore();

    const itemCount = count();

    return (
        <>
            <div
                className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeCart}
            />
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface-container-low shadow-[0_16px_32px_-8px_rgba(75,58,46,0.12)] z-50 transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-20 px-space-lg flex items-center justify-between bg-surface-container-low">
                    <div className="flex items-baseline gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-primary">
                            Your Selection
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">
                            ({itemCount} {itemCount === 1 ? "item" : "items"})
                        </span>
                    </div>
                    <button
                        className="text-on-surface-variant hover:text-primary transition-colors p-space-xs"
                        onClick={closeCart}
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex-1 overflow-y-auto px-space-lg py-space-xl flex flex-col items-center justify-center text-center">
                        <span className="font-headline-md text-headline-md text-primary mb-space-sm italic">
                            A quiet space awaits
                        </span>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mb-space-lg">
                            Your vessel bag is currently empty. Explore our intentional
                            scents crafted from botanical waxes and earthen essences.
                        </p>
                        <Link
                            href="/shop"
                            onClick={closeCart}
                            className="h-[52px] px-space-lg inline-flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg tracking-[0.14em] uppercase transition-colors hover:bg-primary-container"
                        >
                            Explore Fragrances
                        </Link>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto px-space-lg py-space-md space-y-space-md">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-space-sm bg-surface p-space-sm"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-20 object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-title text-title text-primary truncate">
                                        {item.name}
                                    </h4>
                                    {item.variant && (
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                            {item.variant}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                                            Qty {item.quantity}
                                        </span>
                                        <span className="font-title text-title text-primary">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="font-label-sm text-label-sm text-error hover:text-error/80 uppercase tracking-wider mt-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-space-lg bg-surface-container">
                    <div className="flex items-center justify-between mb-space-md">
                        <span className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
                            Subtotal
                        </span>
                        <span className="font-title text-title text-primary">
                            ${subtotal().toFixed(2)}
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                        Complimentary slow shipping and sensory card on all domestic ritual
                        orders.
                    </p>
                    <Link
                        href="/checkout"
                        onClick={closeCart}
                        className={`w-full h-[52px] flex items-center justify-center font-label-lg text-label-lg tracking-[0.14em] uppercase transition-colors ${items.length === 0
                                ? "bg-primary/40 text-on-primary cursor-not-allowed pointer-events-none"
                                : "bg-primary text-on-primary hover:bg-primary-container"
                            }`}
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </aside>
        </>
    );
}