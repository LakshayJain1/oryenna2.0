"use client";

import { useState } from "react";
import Link from "next/link";

export type ConciergeGroup = {
  id: string;
  discipline: string;
  title: string;
  items: Array<{ q: string; a: string }>;
};

type ConciergeViewProps = {
  eyebrow?: string;
  title?: string;
  tagline?: string;
  groups: ConciergeGroup[];
};

export default function ConciergeView({
  eyebrow = "Knowledge & Studio Inquiries",
  title = "Questions on Cadence, Wax & Care",
  tagline = "A practical guide to burning, wax, vessels, shipping, and gifting.",
  groups,
}: ConciergeViewProps) {
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [openKey, setOpenKey] = useState<string | null>(
      groups[0] ? `${groups[0].id}-0` : null
    );

    const filteredGroups = groups
        .filter((g) => filter === "all" || g.id === filter)
        .map((g) => ({
            ...g,
            items: g.items.filter(
                (item) =>
                    item.q.toLowerCase().includes(query.toLowerCase()) ||
                    item.a.toLowerCase().includes(query.toLowerCase())
            ),
        }))
        .filter((g) => g.items.length > 0);

    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-xl">
                <div className="max-w-4xl mx-auto text-center space-y-space-md">
                    <div className="flex items-center justify-center gap-space-xs text-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="font-label-sm text-label-sm uppercase tracking-widest">
                            {eyebrow}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <h1 className="font-display text-display text-ink tracking-tight">
                        {title}
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                        {tagline}
                    </p>

                    <div className="pt-space-sm max-w-2xl mx-auto">
                        <div className="relative flex items-center bg-surface-container-lowest shadow-[0_12px_28px_-6px_rgba(75,58,46,0.06)] rounded-full px-space-md py-space-sm focus-within:shadow-[0_16px_36px_-6px_rgba(75,58,46,0.1)]">
                            <span className="material-symbols-outlined text-outline text-[22px] mr-space-sm">
                                search
                            </span>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none"
                                placeholder="Search help topics..."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin mb-space-lg">
                <div className="flex items-center overflow-x-auto no-scrollbar gap-space-xs pb-space-xs">
                    {[
                        { id: "all", label: "All Inquiries" },
                        ...groups.map((g) => ({ id: g.id, label: g.title })),
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`pressable px-space-md py-space-sm rounded-full font-label-md text-label-md uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${filter === cat.id
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                                }`}
                            type="button"
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Accordions */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin mb-space-xl">
                <div className="max-w-4xl mx-auto space-y-space-xl">
                    {filteredGroups.map((group) => (
                        <div key={group.id} className="space-y-space-sm">
                            <div className="flex items-center justify-between pb-space-xs">
                                <div>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-accent">
                                        {group.discipline}
                                    </span>
                                    <h3 className="font-headline-md text-headline-md text-ink">
                                        {group.title}
                                    </h3>
                                </div>
                                <span className="font-label-md text-label-md text-on-surface-variant font-mono">
                                    {String(group.items.length).padStart(2, "0")} Records
                                </span>
                            </div>
                            <div className="space-y-space-xs">
                                {group.items.map((item, i) => {
                                    const key = `${group.id}-${i}`;
                                    const open = openKey === key;
                                    return (
                                        <div key={key} className="bg-surface-container-low rounded-2xl overflow-hidden">
                                            <button
                                                onClick={() => setOpenKey(open ? null : key)}
                                                className="w-full text-left p-space-md flex items-center justify-between gap-space-sm group"
                                                type="button"
                                            >
                                                <span className="font-headline-sm text-headline-sm text-ink pr-space-sm group-hover:text-primary-container transition-colors">
                                                    {item.q}
                                                </span>
                                                <span
                                                    className={`material-symbols-outlined text-outline transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""
                                                        }`}
                                                >
                                                    keyboard_arrow_down
                                                </span>
                                            </button>
                                            <div
                                                className={`px-space-md transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] pb-space-md" : "max-h-0"
                                                    }`}
                                            >
                                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Concierge Contact */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin mb-space-xl">
                <div className="max-w-4xl mx-auto bg-primary-container text-on-primary p-space-lg md:p-space-xl rounded-[1.75rem]">
                    <div className="max-w-2xl space-y-space-md">
                        <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary-fixed">
                            Direct Guidance
                        </span>
                        <h3 className="font-headline-lg text-headline-lg text-surface-bright">
                            Still stuck?
                        </h3>
                        <p className="font-body-md text-body-md text-surface-variant max-w-lg">
                            Write to us about orders, candle care, shipping, or
                            gifting — a real person replies within two working days.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
                            <Link
                                href="/contact"
                                className="pressable h-[52px] px-space-lg rounded-full bg-surface-bright text-ink font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container transition-colors inline-flex items-center justify-center"
                            >
                                Contact the Studio
                            </Link>
                            <Link
                                href="/shop"
                                className="pressable h-[52px] px-space-lg rounded-full bg-transparent text-surface-bright font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-bright/10 transition-colors inline-flex items-center justify-center"
                            >
                                Browse Candles
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
