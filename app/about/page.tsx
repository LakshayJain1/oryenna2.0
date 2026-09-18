import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "Our Craft & Story",
  description:
    "The Oryenna atelier story — wild botanicals, ethical harvests, and hand-poured candle craft from Grasse and Provence.",
});

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-lg bg-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center space-y-space-md mb-space-xl">
                        <div className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface-container-high rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                                Atelier Provenance & Philosophy
                            </span>
                        </div>
                        <h1 className="font-display text-display max-w-4xl text-primary leading-[1.08] tracking-tight">
                            The Architecture of{" "}
                            <span className="italic font-normal">Unhurried Scent</span>
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                            Conceived between the ancient rose terraces of Grasse and the
                            sun-bleached coastal hills of Northern California, ORYENNA is a
                            quiet rebellion against manufactured urgency.
                        </p>
                        <div className="flex items-center gap-space-lg pt-space-xs font-label-md text-label-md tracking-widest text-outline uppercase">
                            <span>Est. 2018</span>
                            <span className="inline-block w-1 h-1 rounded-full bg-outline-variant" />
                            <span>43°40′N 6°55′E</span>
                            <span className="inline-block w-1 h-1 rounded-full bg-outline-variant" />
                            <span>38°04′N 122°48′W</span>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-stretch">
                        <div className="md:col-span-7 relative group overflow-hidden bg-surface-container-low">
                            <div className="aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/5] w-full relative">
                                <img
                                    alt="Hands lighting an ivory wax scented candle"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV9Y3EXHpl6uz79SbViNJFYMkTxCnvmHueLwBKfgBZiSU76Mw-FJyKQLVm5ev2eRIFHrvB6XFEQhuXhFJYXmt9ukU6znfApfVJc9oxfcVzVYQadbOURyKg-uZu0tmJOy55rGR62g_6mEzxVmmlFLj71BxXU6xmWM816Wf6YJB7jJaRXpeDu70IcEfA6i6zPuJgcPMWKYCS1i5nV61eBaZYtCAwtYfA7sy0SvG8s4toMGoUjkdwjn-k1A"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed block mb-1">
                                        Plate I • The Lighting Ritual
                                    </span>
                                    <p className="font-display text-headline-sm italic">
                                        "Flame, porous stone, and the suspension of measured hours."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-5 flex flex-col justify-between gap-gutter">
                            <div className="relative group overflow-hidden bg-surface-container h-full">
                                <div className="aspect-[4/3] w-full h-full relative">
                                    <img
                                        alt="Santal candle on raw linen"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD9wSwqipCw5JIAg3qUTnFliG_-4a47u7fuYZvmI-cx9lf8B5gkEdaJKf3DCNrBW-EgCW1ZwKTxZIGv7nDWrNzg6bnW2mDhAeYPR4Nv8_rG3MeTCUFfrQEXvT7ndGsWOYqQOSnprLkRq7CCe_PRFgubQajevPOi2ecpsXVbW3wlgwrYTzyZYt3RXS_5zbEKAJARDvGvZQ5diG5pZ3wQRdrKG9BaVgFy8QG8W8oYu2P6TwPRlpr9mnTjA"
                                    />
                                </div>
                            </div>
                            <div className="bg-surface-container-low p-space-lg">
                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-space-xs">
                                    The Scent Manifesto
                                </span>
                                <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">
                                    Formulated without synthetic velocity.
                                </h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                    In an era dominated by instantaneous synthetic reproduction,
                                    we honor the botanical latency of living matter. Every batch
                                    rests in temperature-disciplined cellars until natural accords
                                    settle into quiet equilibrium.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl bg-surface-container-low">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-space-xl space-y-space-xs">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                            Uncompromising Standards
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-primary">
                            Four Pillars of{" "}
                            <span className="italic font-normal">Quiet Craftsmanship</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                        {[
                            {
                                num: "01",
                                icon: "eco",
                                label: "Alchemy",
                                title: "Pure Botanical Wax",
                                desc: "Zero paraffin, zero soy monoculture, zero petroleum derivatives. Non-GMO European rapeseed and wild cold-pressed coconut wax.",
                                footer: "• 65–100 Hour Slow Burn",
                            },
                            {
                                num: "02",
                                icon: "hourglass_top",
                                label: "Maturation",
                                title: "28-Day Barrique Aging",
                                desc: "We steep whole cedar shavings, crushed cardamom, and benzoin resin in aged French oak casks for four full lunar cycles.",
                                footer: "• Oak-Barrel Macerated",
                            },
                            {
                                num: "03",
                                icon: "wine_bar",
                                label: "Permanence",
                                title: "Vessels Made to Endure",
                                desc: "Hand-blown heavyweight lead-free glass or hand-turned ceramic bisques. Once the flame expires, the vessel transforms.",
                                footer: "• 100% Repurposable",
                            },
                            {
                                num: "04",
                                icon: "inventory_2",
                                label: "Circularity",
                                title: "Zero Plastic Unboxing",
                                desc: "Deckle-edged archival papers, raw unbleached cotton ribbons, stamped botanical wax seals, and seed-infused sleeves.",
                                footer: "• Plantable Seed Packaging",
                            },
                        ].map((p) => (
                            <div
                                key={p.num}
                                className="bg-surface-container p-space-lg flex flex-col justify-between min-h-[380px] group hover:bg-surface-container-high transition-colors duration-300"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-space-lg">
                                        <span className="font-display text-headline-lg text-outline/40">
                                            {p.num}
                                        </span>
                                        <span className="material-symbols-outlined text-secondary text-[22px]">
                                            {p.icon}
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">
                                        {p.label}
                                    </span>
                                    <h3 className="font-headline-sm text-headline-sm text-primary mb-space-sm">
                                        {p.title}
                                    </h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                        {p.desc}
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                                        {p.footer}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder's Letter */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl bg-surface">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-surface-container-low p-space-lg md:p-space-xl shadow-md">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-sm">
                            Letter from the Founders
                        </span>
                        <h2 className="font-display text-headline-lg md:text-display text-primary leading-tight mb-space-lg">
                            "We do not formulate scents to perfume a room; we compose scents
                            to <span className="italic">alter the weight of an hour.</span>"
                        </h2>
                        <div className="space-y-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
                            <p>
                                In our former architectural practice, we designed spaces with
                                limestone, bleached timber, and linen scrims. Yet we found that
                                no physical partition could shape an atmosphere as intimately as
                                the ephemeral movement of scent through air.
                            </p>
                            <p>
                                When we founded ORYENNA, our goal was simple: treat spatial
                                fragrance with the solemn discipline of fine art. No mass
                                marketing focus groups. No shortcuts with petroleum wax.
                            </p>
                            <p>
                                Thank you for welcoming our work into your quietest hours. May
                                the flame remind you to breathe deeply and move slowly.
                            </p>
                        </div>
                        <div className="pt-space-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-lg">
                            <div className="flex items-center gap-space-md">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-display text-headline-sm">
                                    H
                                </div>
                                <div>
                                    <span className="font-title text-title text-primary block">
                                        Hélène de Saint-Germain
                                    </span>
                                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                        Master Perfumer • Grasse
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-space-md">
                                <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-display text-headline-sm">
                                    J
                                </div>
                                <div>
                                    <span className="font-title text-title text-primary block">
                                        Julian Vane
                                    </span>
                                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                        Creative Director • California
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}