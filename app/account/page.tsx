import Link from "next/link";

export default function AccountPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Greeting */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-lg">
                <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-sm">
                    <span className="font-label-sm text-label-sm tracking-widest uppercase">
                        Atelier Portal
                    </span>
                    <span className="text-on-surface-variant/40">/</span>
                    <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary">
                        Patron Sanctuary
                    </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
                    <div>
                        <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full text-secondary font-label-sm text-label-sm tracking-widest uppercase mb-space-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            Patron Tier: Lunar Circle • Member No. 1402
                        </div>
                        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                            Welcome back, Julian Vane
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                            Your personal olfactory dossier, artisanal pour allocations, and
                            private concierge archives across Grasse and Kyoto ateliers.
                        </p>
                    </div>
                    <div className="flex items-center gap-space-sm self-start lg:self-end pt-space-xs">
                        <button className="h-[44px] px-space-md bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                                calendar_month
                            </span>
                            Atelier Booking: Oct 24
                        </button>
                        <button className="h-[44px] px-space-md bg-primary text-surface font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">
                                auto_stories
                            </span>
                            Sensory Vault
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-space-lg">
                    {[
                        { label: "Private Pours", value: "04", icon: "explore_off", sub: "Allocated in Autumn Batch" },
                        { label: "Transit Status", value: "01 Active", icon: "local_shipping", sub: "Low-Emission Ground Courier" },
                        { label: "Sanctuary Vault", value: "280 tokens", icon: "token", sub: "Redeemable for Bespoke Extraits" },
                        { label: "Private Session", value: "Oct 24", icon: "history_edu", sub: "Master Perfumer Dialogue" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm"
                        >
                            <div className="flex items-center justify-between text-on-surface-variant mb-space-sm">
                                <span className="font-label-sm text-label-sm tracking-widest uppercase">
                                    {s.label}
                                </span>
                                <span className="material-symbols-outlined text-[20px] text-secondary">
                                    {s.icon}
                                </span>
                            </div>
                            <div>
                                <div className="font-headline-md text-headline-md text-primary">
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
                                    <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary">
                                        Active Dispatch Manifest
                                    </span>
                                    <h2 className="font-headline-md text-headline-md text-primary">
                                        In-Flight Olfactory Allocation
                                    </h2>
                                </div>
                                <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider rounded-full">
                                    Dispatched
                                </span>
                            </div>

                            <div className="bg-surface-container-low p-space-md md:p-space-lg shadow-md flex flex-col gap-space-md">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2">
                                    <div>
                                        <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">
                                            Order Reference
                                        </span>
                                        <div className="font-headline-sm text-headline-sm text-primary">
                                            #ORY-84920
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">
                                            Vessel Pour Date
                                        </span>
                                        <div className="font-body-md text-body-md text-primary font-medium">
                                            October 12, 2025 • Kyoto Kiln Batch 09
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="bg-surface-container p-space-md space-y-space-xs">
                                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                                        <span>Grasse Studio</span>
                                        <span className="text-primary font-bold">
                                            Transit: Point Reyes Depot
                                        </span>
                                        <span>Sanctuary Delivery</span>
                                    </div>
                                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full rounded-full" style={{ width: "68%" }} />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
                                    <button className="h-[44px] px-space-md bg-primary text-surface font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">
                                            satellite_alt
                                        </span>
                                        Track Dispatch
                                    </button>
                                    <button className="h-[44px] px-space-md bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
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
                                <h2 className="font-headline-md text-headline-md text-primary">
                                    Archival Order History
                                </h2>
                            </div>
                            <div className="bg-surface-container-low p-space-md md:p-space-lg shadow-sm space-y-space-md">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-headline-sm text-headline-sm text-primary">
                                                #ORY-72104
                                            </span>
                                            <span className="px-2.5 py-0.5 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider rounded-full">
                                                Delivered
                                            </span>
                                        </div>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                                            Solstice Pour Cycle • Delivered August 28, 2025
                                        </span>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <span className="font-title text-title text-primary">
                                            $240.00
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-4 space-y-space-lg">
                        <div className="bg-surface-container-low p-space-md md:p-space-lg shadow-sm space-y-space-md">
                            <div>
                                <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary">
                                    Sensory Resonance
                                </span>
                                <h3 className="font-headline-sm text-headline-sm text-primary">
                                    Olfactory Architecture
                                </h3>
                            </div>
                            <div className="space-y-space-sm">
                                {[
                                    { name: "Smoked Resin & Amber", fit: 94 },
                                    { name: "Kyoto Hinoki & Cade Wood", fit: 88 },
                                    { name: "Wild Mediterranean Fig", fit: 72 },
                                ].map((note) => (
                                    <div key={note.name} className="bg-surface-container p-space-sm">
                                        <div className="flex items-center justify-between font-label-md text-label-md uppercase text-primary mb-1">
                                            <span>{note.name}</span>
                                            <span className="text-secondary font-bold">{note.fit}% Fit</span>
                                        </div>
                                        <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                                            <div className="bg-secondary h-full rounded-full" style={{ width: `${note.fit}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary text-on-primary p-space-md md:p-space-lg shadow-md space-y-space-sm">
                            <div className="flex items-center gap-space-sm">
                                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed">
                                    <span className="material-symbols-outlined text-[22px]">
                                        spatial_audio_off
                                    </span>
                                </div>
                                <div>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim">
                                        Dedicated Host
                                    </span>
                                    <h4 className="font-title text-title">Maison Concierge Claire</h4>
                                </div>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-primary/80">
                                For custom room-volume fragrance consultations, bespoke brass
                                vessel engraving, or private holiday gifting concierge.
                            </p>
                            <button className="w-full h-[44px] bg-primary-fixed text-on-primary-fixed font-label-md text-label-md uppercase tracking-wider hover:bg-surface transition-colors">
                                Initiate Private Dialogue
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}