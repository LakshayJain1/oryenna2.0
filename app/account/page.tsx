"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

type OrderTuple = [string, string, number, number, string, string, string?];

function formatArchiveTotal(total: number, cur?: string): string {
  if (cur === "USD") return `$${total.toFixed(2)}`;
  return `₹${Math.round(total).toLocaleString("en-IN")}`;
}

function memberNo(id?: string): string {
    if (!id) return "1402";
    let h = 0;
    for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 10000;
    return String(h).padStart(4, "0");
}

function statusText(status: number): string {
    return status === 0 ? "Processing" : status === 1 ? "Dispatched" : "Delivered";
}

export default function AccountPage() {
    const { user, isLoaded } = useUser();

    // Compact archives written by /api/razorpay/verify into Clerk
    // unsafeMetadata (kept tiny for the ~8kb metadata limit):
    // o: [[id, date, status, total, summary, pin, currency?], ...]
    // a: [[address, city, state, pin], ...]
    const metadata = (user?.unsafeMetadata || {}) as {
        o?: OrderTuple[];
        a?: Array<[string, string, string, string]>;
    };
    const orders = metadata.o || [];
    const latest = orders[0];
    const archived = orders.slice(1);
    const addresses = (metadata.a || []).filter((a) => a && a[0]);

    const displayName = user?.fullName || "Aarav Mehta";
    const transitValue =
        orders.length > 0
            ? `${String(orders.length).padStart(2, "0")} Active`
            : "01 Active";

    return (
        <div className="flex flex-col w-full">
            {/* Greeting */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-lg">
                <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-sm">
                    <span className="font-label-sm text-label-sm tracking-widest uppercase">
                        Studio Portal
                    </span>
                    <span className="text-on-surface-variant/40">/</span>
                    <span className="font-label-sm text-label-sm tracking-widest uppercase text-ink">
                        My Account
                    </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
                    <div>
                        <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full text-accent font-label-sm text-label-sm tracking-widest uppercase mb-space-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            Member • Member No. {memberNo(user?.id)}
                        </div>
                        <h1 className="font-headline-lg text-headline-lg text-ink tracking-tight">
                            Welcome back, {!isLoaded ? "…" : displayName}
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                            Your personal olfactory dossier, artisanal pour allocations, and
                            private archives from the Jaipur studio.
                        </p>
                    </div>
                    <div className="flex items-center gap-space-sm self-start lg:self-end pt-space-xs">
                        <Link
                            href="/shop"
                            className="h-[44px] px-space-md bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container hover:text-surface transition-colors flex items-center gap-2 shadow-sm rounded-full"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                shopping_bag
                            </span>
                            Shop Candles
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-space-lg">
                    {[
                        { label: "Orders Placed", value: String(orders.length).padStart(2, "0"), icon: "shopping_bag", sub: "Across all time" },
                        { label: "In Transit", value: transitValue, icon: "local_shipping", sub: "Tracked ground courier" },
                        { label: "Saved Addresses", value: String(addresses.length).padStart(2, "0"), icon: "location_on", sub: "Stored at checkout" },
                        { label: "Member No.", value: memberNo(user?.id), icon: "badge", sub: "Since your first order" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-sm"
                        >
                            <div className="flex items-center justify-between text-on-surface-variant mb-space-sm">
                                <span className="font-label-sm text-label-sm tracking-widest uppercase">
                                    {s.label}
                                </span>
                                <span className="material-symbols-outlined text-[20px] text-accent">
                                    {s.icon}
                                </span>
                            </div>
                            <div>
                                <div className="font-headline-md text-headline-md text-ink">
                                    {s.value}
                                </div>
                                <div className="font-body-sm text-body-sm text-on-surface-variant">
                                    {s.sub}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Order History */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                    <div className="lg:col-span-8 space-y-space-xl">
                        <div>
                            <div className="flex items-center justify-between mb-space-md">
                                <div>
                                    <span className="font-label-sm text-label-sm tracking-widest uppercase text-accent">
                                        Current Order
                                    </span>
                                    <h2 className="font-headline-md text-headline-md text-ink">
                                        Your Latest Order
                                    </h2>
                                </div>
                                <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider rounded-full">
                                    {latest ? statusText(latest[2]) : "Dispatched"}
                                </span>
                            </div>

                            <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-[1.5rem] shadow-md flex flex-col gap-space-md">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2">
                                    <div>
                                        <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">
                                            Order Reference
                                        </span>
                                        <div className="font-headline-sm text-headline-sm text-ink">
                                            #{latest ? latest[0] : "ORY-84920"}
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">
                                            Vessel Pour Date
                                        </span>
                                        <div className="font-body-md text-body-md text-ink font-medium">
                                            {latest
                                                ? `${latest[1]} • Studio Dispatch ${latest[5]}`
                                                : "October 12, 2025 • Jaipur Kiln Batch 09"}
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="bg-surface-container p-space-md rounded-2xl space-y-space-xs">
                                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                                        <span>Jaipur Studio</span>
                                        <span className="text-ink font-bold">
                                            Transit: Point Reyes Depot
                                        </span>
                                        <span>Doorstep Delivery</span>
                                    </div>
                                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full rounded-full" style={{ width: "68%" }} />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
                                    <button className="h-[44px] px-space-md bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container hover:text-surface transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">
                                            satellite_alt
                                        </span>
                                        Track Dispatch
                                    </button>
                                    <button className="h-[44px] px-space-md bg-surface-container hover:bg-surface-container-high text-ink font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">
                                            download
                                        </span>
                                        Manifest (PDF)
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Past Order */}
                        <div>
                            <div className="flex items-center justify-between mb-space-md">
                                <h2 className="font-headline-md text-headline-md text-ink">
                                    Archival Order History
                                </h2>
                            </div>
                            <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-[1.5rem] shadow-sm space-y-space-md">
                                {(archived.length > 0
                                    ? archived
                                    : [["ORY-72104", "August 28, 2025", 2, 240, "Solstice Pour Cycle", ""] as OrderTuple]
                                ).map(([id, date, status, total, summary, , cur]) => (
                                    <div
                                        key={id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-headline-sm text-headline-sm text-ink">
                                                    #{id}
                                                </span>
                                                <span className="px-2.5 py-0.5 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider rounded-full">
                                                    {archived.length > 0 ? statusText(status) : "Delivered"}
                                                </span>
                                            </div>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                                                {summary} • {archived.length > 0 ? `Ordered ${date}` : `Delivered ${date}`}
                                            </span>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <span className="font-title text-title text-ink">
                                                {archived.length > 0
                                                    ? formatArchiveTotal(total, cur)
                                                    : "$240.00"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-4 space-y-space-lg">
                        {/* Member details */}
                        <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-[1.5rem] shadow-sm space-y-space-md">
                            <span className="font-label-sm text-label-sm tracking-widest uppercase text-accent">
                                Member Details
                            </span>
                            <div className="flex items-center gap-space-sm">
                                <div className="w-12 h-12 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center overflow-hidden shrink-0">
                                    {user?.imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={user.imageUrl} alt="" className="w-12 h-12 object-cover" />
                                    ) : (
                                        <span className="font-headline-sm text-headline-sm">
                                            {(displayName || "A").charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-headline-sm text-headline-sm text-ink truncate">
                                        {displayName}
                                    </p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                        {user?.primaryEmailAddress?.emailAddress || "Guest"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                                <span>Member No.</span>
                                <span className="font-medium text-ink">{memberNo(user?.id)}</span>
                            </div>
                            <SignOutButton>
                                <button className="pressable w-full h-[44px] rounded-full bg-surface-container hover:bg-surface-container-high text-ink font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        logout
                                    </span>
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </div>

                        {/* Saved addresses */}
                        <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-[1.5rem] shadow-sm space-y-space-md">
                            <span className="font-label-sm text-label-sm tracking-widest uppercase text-accent">
                                Saved Addresses
                            </span>
                            {addresses.length > 0 ? (
                                <ul className="space-y-space-sm">
                                    {addresses.map((a, i) => (
                                        <li key={i} className="bg-surface-container p-space-sm rounded-xl flex gap-space-sm">
                                            <span className="material-symbols-outlined text-[18px] text-accent shrink-0">
                                                location_on
                                            </span>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                                {a[0]}, {a[1]}
                                                {a[2] && a[2] !== "Region" ? `, ${a[2]}` : ""} — {a[3]}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    No saved addresses yet — tick “save address” at checkout
                                    and your destinations will appear here.
                                </p>
                            )}
                        </div>

                        <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-[1.5rem] shadow-sm space-y-space-md">
                            <div>
                                <span className="font-label-sm text-label-sm tracking-widest uppercase text-accent">
                                    Sensory Resonance
                                </span>
                                <h3 className="font-headline-sm text-headline-sm text-ink">
                                    Olfactory Architecture
                                </h3>
                            </div>
                            <div className="space-y-space-sm">
                                {[
                                    { name: "Smoked Resin & Amber", fit: 94 },
                                    { name: "Jaipur Cedar & Cade Wood", fit: 88 },
                                    { name: "Wild Mediterranean Fig", fit: 72 },
                                ].map((note) => (
                                    <div key={note.name} className="bg-surface-container p-space-sm rounded-xl">
                                        <div className="flex items-center justify-between font-label-md text-label-md uppercase text-ink mb-1">
                                            <span>{note.name}</span>
                                            <span className="text-accent font-bold">{note.fit}% Fit</span>
                                        </div>
                                        <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                                            <div className="bg-accent h-full rounded-full" style={{ width: `${note.fit}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary text-on-primary p-space-md md:p-space-lg rounded-[1.5rem] shadow-md space-y-space-sm">
                            <div className="flex items-center gap-space-sm">
                                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed">
                                    <span className="material-symbols-outlined text-[22px]">
                                        support_agent
                                    </span>
                                </div>
                                <div>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary/70">
                                        Order Support
                                    </span>
                                    <h4 className="font-title text-title">Need help with an order?</h4>
                                </div>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-primary/80">
                                Damaged parcel, wrong item, or a question about your
                                delivery — write to us and we will sort it out.
                            </p>
                            <Link
                                href="/contact"
                                className="pressable w-full h-[44px] rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider hover:bg-surface transition-colors flex items-center justify-center"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}