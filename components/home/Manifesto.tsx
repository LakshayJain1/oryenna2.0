import { Reveal, Stagger } from "@/components/ui/Reveal";

type ManifestoMetric = { value: string; label: string; description: string };

type ManifestoProps = {
    eyebrow?: string;
    headline?: string;
    quote?: string;
    metrics?: ManifestoMetric[];
};

const FALLBACK_METRICS: ManifestoMetric[] = [
    {
        value: "100%",
        label: "Botanical Wax Blend",
        description: "European rapeseed & clean soy without paraffin.",
    },
    {
        value: "65+ Hrs",
        label: "Clean Slow Burn",
        description: "Double unbleached cotton core wick.",
    },
    {
        value: "Small Batch",
        label: "Handcrafted Atelier",
        description: "Numbered pours made in southern Provence.",
    },
];

export default function Manifesto({
    eyebrow = "01 / Manifeste",
    headline = "Beauty in a quieter world.",
    quote = "Oryenna was founded on the belief that scent is an invisible architecture — shaping the energy, stillness, and emotional landscape of the rooms we inhabit. Hand-poured with pure renewable soy wax and wild botanicals, each vessel is an invitation to pause, exhale, and arrive fully in the present.",
    metrics = FALLBACK_METRICS,
}: ManifestoProps) {
    const stats = metrics && metrics.length > 0 ? metrics : FALLBACK_METRICS;

    return (
        <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-space-lg lg:gap-gutter items-start">
                    <div className="lg:col-span-4">
                        <Reveal variant="up">
                            <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary block mb-space-xs">
                                {eyebrow}
                            </span>
                        </Reveal>
                        <Reveal variant="up" delay={100}>
                            <h2 className="font-headline-lg text-headline-lg text-primary leading-tight uppercase font-serif tracking-wide">
                                {headline}
                            </h2>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-space-lg">
                        <Reveal variant="up" delay={150}>
                            <p className="font-body-lg text-body-lg text-on-surface-variant font-serif leading-relaxed">
                                {quote}
                            </p>
                        </Reveal>

                        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md stagger-fill" step={110}>
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-surface-container-low p-space-md rounded-DEFAULT h-full"
                                >
                                    <span className="font-headline-sm text-headline-sm text-primary block mb-1">
                                        {s.value}
                                    </span>
                                    <span className="font-label-md text-label-md text-on-surface-variant tracking-[0.14em] uppercase">
                                        {s.label}
                                    </span>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                        {s.description}
                                    </p>
                                </div>
                            ))}
                        </Stagger>
                    </div>
                </div>
            </div>
        </section>
    );
}