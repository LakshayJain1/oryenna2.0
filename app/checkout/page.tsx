"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useUser } from "@clerk/nextjs";

export default function CheckoutPage() {
    const { user } = useUser();
    const { items, updateQuantity, removeItem, subtotal, clearCart } = useCartStore();
    
    const [giftWrap, setGiftWrap] = useState(true);
    const [shipping, setShipping] = useState("slow");
    const [email, setEmail] = useState("astrid.lind@atelier.com");
    const [phone, setPhone] = useState("+1 (555) 382-9014");
    const [firstName, setFirstName] = useState("Astrid");
    const [lastName, setLastName] = useState("Lind");
    const [address, setAddress] = useState("742 Evergreen Terrace");
    const [city, setCity] = useState("Portland");
    const [zip, setZip] = useState("97201");
    const [saveAddress, setSaveAddress] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const giftFee = giftWrap ? 14 : 0;
    const shippingFee = shipping === "express" ? 18 : 0;
    const tax = (subtotal() + giftFee + shippingFee) * 0.087;
    const total = subtotal() + giftFee + shippingFee + tax + 4;
    const totalINR = Math.round(total * 83);

    const handleCompleteOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setCheckoutError("");

        // Only item references leave the browser — the payable total is
        // recomputed server-side from the trusted catalogue.
        const lines = items.map((i) => ({
            id: i.id,
            qty: i.quantity,
            gift: !!i.giftWrap,
        }));

        try {
            const res = await fetch("/api/razorpay/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lines, giftWrap, shipping }),
            });

            const orderData = await res.json();
            if (!orderData.success) {
                throw new Error(orderData.message || "Failed to initiate Razorpay order");
            }

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Oryenna Atelier",
                description: "Hand-poured Luxury Fragrance & Candles",
                image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=150&auto=format&fit=crop&q=80",
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                orderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                                userId: user?.id,
                                orderPayload: {
                                    id: "ORY-" + Math.floor(100000 + Math.random() * 900000),
                                    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                                    summary: items.map((i) => `${i.name} (x${i.quantity})`).join(", "),
                                    pin: zip,
                                    address,
                                    city,
                                    saveAddress,
                                },
                                customerEmail: email,
                                lines,
                                giftWrap,
                                shipping,
                            }),
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            setIsSubmitting(false);
                            setOrderComplete(true);
                        } else {
                            setCheckoutError(verifyData.message || "Payment verification failed. Please contact support.");
                            setIsSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        setCheckoutError("Could not confirm payment. Please contact support with your payment reference.");
                        setIsSubmitting(false);
                    }
                },
                prefill: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: "#2C2A29",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                setCheckoutError(response?.error?.description || "Payment failed. Please try again.");
                setIsSubmitting(false);
            });
            rzp.open();
            setIsSubmitting(false);
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
            setCheckoutError(err instanceof Error && err.message ? err.message : "Unable to connect to Razorpay. Please try again.");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <section className="pt-8 pb-10 text-center max-w-2xl mx-auto flex flex-col items-center px-4">
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

            {orderComplete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg border border-on-surface-variant/20 bg-surface p-8 text-center shadow-2xl">
                        <span className="text-[28px]">🌿</span>
                        <h2 className="mt-4 font-headline-md text-[28px] uppercase tracking-wider text-primary">
                            Your Sanctuary Awaits.
                        </h2>
                        <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-secondary font-medium">
                            Order Confirmed Successfully
                        </p>
                        <p className="mt-4 text-[14px] leading-relaxed text-on-surface-variant">
                            We have received your order. Our team in Grasse will hand-pour, pack, and prepare your dispatch within 24 hours. A tracking notification will be dispatched to <strong className="text-primary">{email}</strong>.
                        </p>
                        <Link
                            href="/"
                            onClick={() => clearCart()}
                            className="mt-6 inline-flex h-12 items-center justify-center bg-primary px-8 text-[11px] uppercase tracking-[0.2em] text-on-primary transition-all hover:bg-primary-container"
                        >
                            Return to Oryenna Flagship
                        </Link>
                    </div>
                </div>
            )}

            <form onSubmit={handleCompleteOrder} className="w-full max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16 pb-16">
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
                                            <div className="w-28 h-36 rounded-md overflow-hidden bg-surface-container flex-shrink-0 relative">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
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
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex h-7 items-center border border-on-surface-variant/30 bg-surface">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-2.5 text-on-surface hover:text-primary text-[12px]"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-6 text-center text-[11px] font-medium text-primary">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-2.5 text-on-surface hover:text-primary text-[12px]"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="font-label-sm text-label-sm text-error hover:text-error/80 uppercase tracking-wider"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Shipping details form */}
                        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm space-y-4">
                            <h2 className="font-headline-md text-headline-md text-primary mb-4">
                                Shipping Destination
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Address</label>
                                <input
                                    type="text"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">ZIP Code</label>
                                    <input
                                        type="text"
                                        required
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        className="w-full h-11 px-3 bg-surface border border-on-surface-variant/20 rounded text-on-surface text-[13px]"
                                    />
                                </div>
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

                            {checkoutError && (
                                <div className="p-3 bg-error/10 border border-error/30 text-error font-body-sm text-body-sm">
                                    {checkoutError}
                                </div>
                            )}

                            <button
                                disabled={isSubmitting || items.length === 0}
                                className="w-full h-14 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg tracking-[0.16em] uppercase rounded transition-all duration-300 shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
                                type="submit"
                            >
                                <span>{isSubmitting ? "Connecting to Razorpay..." : "Complete Purchase"}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                                <span>${total.toFixed(2)}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}