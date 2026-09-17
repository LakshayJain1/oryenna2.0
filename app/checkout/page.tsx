"use client";

import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, subtotal } = useCartStore();
    const [giftWrap, setGiftWrap] = useState(true);
    const [shipping, setShipping] = useState("slow");

    const giftFee = giftWrap ? 14 : 0;
    const shippingFee = shipping === "express" ? 18 : 0;
    const tax = (subtotal() + giftFee + shippingFee) * 0.087;
    const total = subtotal() + giftFee + shippingFee + tax + 4;

    return (
        <div className="flex flex-col w-full">
            <section className="pt-8 pb-10 text-center max-w-2xl mx-auto flex flex-col items-center px-margin-mobile">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Your Selection · Atelier Dispatch
                </span>
                <h1 className="font-display text-headline-lg md:text-display text-primary tracking-wide mb-3 font-normal">
                    A Considered Checkout
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg text-center leading-relaxed">
                    Each vessel is poured in limited seasonal batches, packed by hand in
                    our southern atelier, cradled in unbleached cotton.
                </p>
            </section>

            <section className="w-full max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin pb-space-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
                        {/* Items */}
                        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm">
                            <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-surface-container-high">
                                <div className="flex items-center gap-3">
                                    <h2 className="font-headline-md text-headline-md text-primary">
                                        Selected Vessels
                                    </h2>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-medium px-2 py-0.5 bg-secondary-container rounded-full">
                                        {items.length} Items
                                    </span>
                                </div>
                            </div>
                            {items.length === 0 ? (
                                <p className="font-body-md text-body-md text-on-surface-variant italic">
                                    Your vessel bag is empty. Return to the atelier to make a
                                    selection.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-5 items-start p-4 bg-surface rounded-lg shadow-sm"
                                        >
                                            <div className="w-28 h-36 rounded-md overflow-hidden bg-surface-container flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-headline-sm text-headline-sm text-primary">
                                                            {item.name}
                                                        </h3>
                                                        {item.variant && (
                                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                                                {item.variant}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-title text-title text-primary font-medium">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                        <span className="block font-label-sm text-label-sm text-outline mt-0.5">
                                                            Qty {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Gift Presentation */}
                        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm">
                            <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-surface-container-high">
                                <h2 className="font-headline-md text-headline-md text-primary">
                                    Bespoke Atelier Gift Presentation
                                </h2>
                            </div>
                            <div className="flex flex-col gap-3">
                                {[
                                    {
                                        id: "comp",
                                        title: "Complimentary Atelier Wrap",
                                        desc: "Embossed tissue wrap and raw cotton twine.",
                                        price: "Free",
                                    },
                                    {
                                        id: "keepsake",
                                        title: "Keepsake Linen Box & Wax Seal",
                                        desc: "Heavy ivory linen rigid box and hand-poured terracotta seal.",
                                        price: "+$14.00",
                                    },
                                    {
                                        id: "eco",
                                        title: "Minimalist Eco Presentation",
                                        desc: "100% recycled unprinted kraft cushion wrap.",
                                        price: "Free",
                                    },
                                ].map((opt) => (
                                    <label
                                        key={opt.id}
                                        className={`flex items-start gap-3.5 p-3.5 rounded-lg cursor-pointer ${opt.id === "keepsake" && giftWrap
                                            ? "bg-secondary-container/40 shadow-sm"
                                            : "bg-surface hover:bg-surface-container"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gift"
                                            checked={
                                                (opt.id === "keepsake" && giftWrap) ||
                                                (opt.id !== "keepsake" && !giftWrap)
                                            }
                                            onChange={() => setGiftWrap(opt.id === "keepsake")}
                                            className="mt-1 w-4 h-4 accent-primary"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-title text-title text-primary">
                                                    {opt.title}
                                                </span>
                                                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-medium">
                                                    {opt.price}
                                                </span>
                                            </div>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                                {opt.desc}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm">
                            <h2 className="font-headline-md text-headline-md text-primary mb-5">
                                Sensory Dispatch Method
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label
                                    className={`p-4 rounded-lg cursor-pointer flex flex-col ${shipping === "slow"
                                        ? "bg-secondary-container/40 shadow-sm"
                                        : "bg-surface hover:bg-surface-container"
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                checked={shipping === "slow"}
                                                onChange={() => setShipping("slow")}
                                                className="w-4 h-4 accent-primary"
                                            />
                                            <span className="font-title text-title text-primary">
                                                Slow Sensory Transit
                                            </span>
                                        </div>
                                        <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-medium">
                                            Free
                                        </span>
                                    </div>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 pl-7">
                                        3–5 business days. Carbon-neutral ground transport.
                                    </p>
                                </label>

                                <label
                                    className={`p-4 rounded-lg cursor-pointer flex flex-col ${shipping === "express"
                                        ? "bg-secondary-container/40 shadow-sm"
                                        : "bg-surface hover:bg-surface-container"
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                checked={shipping === "express"}
                                                onChange={() => setShipping("express")}
                                                className="w-4 h-4 accent-primary"
                                            />
                                            <span className="font-title text-title text-primary">
                                                Priority Express
                                            </span>
                                        </div>
                                        <span className="font-title text-title text-primary font-medium">
                                            $18.00
                                        </span>
                                    </div>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 pl-7">
                                        1–2 business days. Expedited temperature-monitored courier.
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right - Summary */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
                        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-md flex flex-col gap-6">
                            <div className="flex items-baseline justify-between border-b border-surface-container-high pb-4">
                                <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary font-medium">
                                    Order Summary
                                </span>
                                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                                    USD Currency
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 font-body-sm text-body-sm">
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span>Vessels Subtotal</span>
                                    <span className="font-title text-body-md text-primary">
                                        ${subtotal().toFixed(2)}
                                    </span>
                                </div>
                                {giftWrap && (
                                    <div className="flex items-center justify-between text-on-surface-variant">
                                        <span>Keepsake Linen Box & Wax Seal</span>
                                        <span className="text-primary">$14.00</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span>Match Striker & Ritual Guide</span>
                                    <span className="text-primary">$4.00</span>
                                </div>
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span>
                                        {shipping === "slow"
                                            ? "Slow Domestic Transit"
                                            : "Priority Express"}
                                    </span>
                                    <span className="text-secondary font-medium">
                                        {shipping === "slow" ? "$0.00" : "$18.00"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-on-surface-variant">
                                    <span>Estimated Local Tax</span>
                                    <span className="text-primary">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-surface-container-high flex items-baseline justify-between">
                                <div>
                                    <span className="font-title text-title text-primary uppercase tracking-wider block">
                                        Total Due
                                    </span>
                                    <span className="font-label-sm text-label-sm text-outline">
                                        Including taxes & botanical packaging
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="font-headline-md text-headline-md text-primary font-normal">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="w-full h-14 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg tracking-[0.16em] uppercase rounded transition-all duration-300 shadow-md flex items-center justify-center gap-3"
                                type="button"
                            >
                                <span>Complete Purchase</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                                <span>${total.toFixed(2)}</span>
                            </button>

                            <div className="pt-4 border-t border-surface-container-high grid grid-cols-2 gap-3 text-on-surface-variant">
                                {[
                                    { icon: "verified_user", label: "30-day return guarantee" },
                                    { icon: "spa", label: "100% botanical pure" },
                                    { icon: "landscape", label: "Handcrafted in Provence" },
                                    { icon: "nest_eco_leaf", label: "Carbon neutral dispatch" },
                                ].map((b) => (
                                    <div key={b.label} className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">
                                            {b.icon}
                                        </span>
                                        <span className="font-body-sm text-xs leading-tight">
                                            {b.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}