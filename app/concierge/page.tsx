"use client";

import { useState } from "react";

const faqData = [
    {
        category: "burn",
        discipline: "Discipline 01",
        title: "The Art of the Burn & Wick Care",
        items: [
            {
                q: "Why is the initial burn ritual so critical to the life of the candle?",
                a: "Plant-based botanical waxes possess an olfactory 'wax memory.' On the first lighting, do not extinguish your candle until the liquefied pool has melted completely to the outer edge of the vessel. Allow between 2.5 and 3 hours.",
            },
            {
                q: "Why do you recommend trimming the unbleached cotton wick to 5mm before every lighting?",
                a: "Unbleached, braided organic wicks naturally form carbon blooms at their tips as they siphon rich essential oils. Trimming to exactly 5mm before each lighting ensures an untroubled, teardrop flame and eliminates black soot trails.",
            },
            {
                q: "How do I snuff out the candle without acrid smoke disrupting the room?",
                a: "Blowing directly upon a molten candle disturbs the essential oil vapor. Either place a conical bell snuffer gently over the flame for three breaths, or employ a brass wick-dipper to bend the burning wick into the warm wax pool.",
            },
        ],
    },
    {
        category: "wax",
        discipline: "Discipline 02",
        title: "Botanical Wax & Clean Formulations",
        items: [
            {
                q: "What is inside the proprietary ORYENNA botanical wax base?",
                a: "Our bespoke wax contains zero petroleum paraffin, zero pesticide monoculture soy, and zero palm oils. Instead, a cold-pressed European rapeseed and organic coconut butter base, balanced with a whisper of sustainably sourced wild French cera alba.",
            },
            {
                q: "Are your fragrances synthetic-free, phthalate-free, and safe around pets?",
                a: "Yes. We compose exclusively with pure steam-distilled essential oils, CO2 resinoid extracts, and artisanal enfleurage absolutes. Every formula adheres to rigorous IFRA Standards and remains free from phthalates, parabens, formaldehydes, and nitro-musks.",
            },
        ],
    },
    {
        category: "vessel",
        discipline: "Discipline 03",
        title: "Vessel Permanence & Refill Rituals",
        items: [
            {
                q: "How do I clean the stoneware ceramic or mouth-blown vessel once the wax is spent?",
                a: "Pour hot water (around 75°C, not boiling) directly into the vessel. The botanical wax will liquify and rise to the water's surface. Once cooled overnight, the hardened wax disc can be popped out and composted.",
            },
            {
                q: "How does the Zero-Waste Wax Drop-In Refill system function?",
                a: "Every vessel in the ORYENNA catalog is precision-engineered to accommodate our cylindrical Wax Drop-In refills. Arriving enclosed in wild chamomile-seeded compostable paper, you merely peel away the wrapping and slide the cold wax block into place.",
            },
        ],
    },
    {
        category: "transit",
        discipline: "Discipline 04",
        title: "Slow Sensory Transit & Gifting",
        items: [
            {
                q: "Why do you offer dedicated Slow Sensory Transit rather than overnight air freight?",
                a: "Sudden atmospheric pressure drops and uninsulated cargo holds during rapid air transit shock fragile vegetable waxes, inducing 'frosting' and premature essential oil sweat. We curate ground transit routes with climate-controlled staging.",
            },
            {
                q: "Can I request a personalized handwritten calligraphy parchment note?",
                a: "Indubitably. During checkout, select 'Atelier Scribe Note.' Our in-house archivist inscribes your personal dedication using oak gall ink onto handmade hemp rag paper, folded and hand-stamped with our botanical monogram in terracotta beeswax.",
            },
        ],
    },
];

export default function ConciergePage() {
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [openKey, setOpenKey] = useState<string | null>("burn-0");

    const filteredGroups = faqData
        .filter((g) => filter === "all" || g.category === filter)
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
                    <div className="flex items-center justify-center gap-space-xs text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span className="font-label-sm text-label-sm uppercase tracking-widest">
                            Knowledge & Atelier Inquiries
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </div>
                    <h1 className="font-display text-display text-primary tracking-tight">
                        Questions on Cadence, Wax & Care
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                        A contemplative guide to botanical flame stewardship, clean burning
                        rituals, solventless formulations, and slow sensory transit.
                    </p>

                    <div className="pt-space-sm max-w-2xl mx-auto">
                        <div className="relative flex items-center bg-surface-container-lowest shadow-[0_12px_28px_-6px_rgba(75,58,46,0.06)] px-space-md py-space-sm focus-within:shadow-[0_16px_36px_-6px_rgba(75,58,46,0.1)]">
                            <span className="material-symbols-outlined text-outline text-[22px] mr-space-sm">
                                search
                            </span>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none"
                                placeholder="Search our knowledge sanctuary..."
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
                        { id: "burn", label: "The Art of the Burn" },
                        { id: "wax", label: "Botanical Wax" },
                        { id: "vessel", label: "Vessel Permanence" },
                        { id: "transit", label: "Slow Sensory Transit" },
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${filter === cat.id
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
                        <div key={group.category} className="space-y-space-sm">
                            <div className="flex items-center justify-between pb-space-xs">
                                <div>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                                        {group.discipline}
                                    </span>
                                    <h3 className="font-headline-md text-headline-md text-primary">
                                        {group.title}
                                    </h3>
                                </div>
                                <span className="font-label-md text-label-md text-on-surface-variant font-mono">
                                    {String(group.items.length).padStart(2, "0")} Records
                                </span>
                            </div>
                            <div className="space-y-space-xs">
                                {group.items.map((item, i) => {
                                    const key = `${group.category}-${i}`;
                                    const open = openKey === key;
                                    return (
                                        <div key={key} className="bg-surface-container-low">
                                            <button
                                                onClick={() => setOpenKey(open ? null : key)}
                                                className="w-full text-left p-space-md flex items-center justify-between gap-space-sm group"
                                                type="button"
                                            >
                                                <span className="font-headline-sm text-headline-sm text-primary pr-space-sm group-hover:text-primary-container transition-colors">
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
                <div className="max-w-4xl mx-auto bg-primary text-on-primary p-space-lg md:p-space-xl">
                    <div className="max-w-2xl space-y-space-md">
                        <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary-fixed">
                            Direct Guidance
                        </span>
                        <h3 className="font-headline-lg text-headline-lg text-surface-bright">
                            Unanswered Curiosities?
                        </h3>
                        <p className="font-body-md text-body-md text-surface-variant max-w-lg">
                            Our atelier specialists hold daily dialogues concerning scent
                            pairings, seasonal vessel care, and bespoke olfactory
                            installations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
                            <button className="h-[52px] px-space-lg bg-surface-bright text-primary font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container transition-colors">
                                Inquire via Atelier Desk              </button>
                            <button className="h-[52px] px-space-lg bg-transparent text-surface-bright font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-bright/10 transition-colors">
                                Schedule Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}