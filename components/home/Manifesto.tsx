export default function Manifesto() {
    const stats = [
        {
            value: "100%",
            label: "Botanical Wax Blend",
            desc: "European rapeseed & clean soy without paraffin.",
        },
        {
            value: "65+ Hrs",
            label: "Clean Slow Burn",
            desc: "Double unbleached cotton core wick.",
        },
        {
            value: "Small Batch",
            label: "Handcrafted Atelier",
            desc: "Numbered pours made in southern Provence.",
        },
    ];

    return (
        <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-space-lg lg:gap-gutter items-start">
                    <div className="lg:col-span-4">
                        <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary block mb-space-xs">
                            01 / Manifeste
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-primary leading-tight uppercase font-serif tracking-wide">
                            Beauty in a quieter world.
                        </h2>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-space-lg">
                        <p className="font-body-lg text-body-lg text-on-surface-variant font-serif leading-relaxed">
                            Oryenna was founded on the belief that scent is an invisible
                            architecture — shaping the energy, stillness, and emotional
                            landscape of the rooms we inhabit. Hand-poured with pure renewable
                            soy wax and wild botanicals, each vessel is an invitation to
                            pause, exhale, and arrive fully in the present.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-surface-container-low p-space-md rounded-DEFAULT"
                                >
                                    <span className="font-headline-sm text-headline-sm text-primary block mb-1">
                                        {s.value}
                                    </span>
                                    <span className="font-label-md text-label-md text-on-surface-variant tracking-[0.14em] uppercase">
                                        {s.label}
                                    </span>
                                    <p className="font-body-sm text-body-sm text-outline mt-1">
                                        {s.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}