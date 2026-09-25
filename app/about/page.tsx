import Link from "next/link";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "Our Craft & Story",
  description:
    "The Oryenna atelier story — wild botanicals, ethical harvests, and hand-poured candle craft from Grasse and Provence.",
});

const PILLARS = [
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

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-lg">
        <Reveal variant="up" className="max-w-4xl space-y-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary block">
            Discover / Our Story
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Beauty in a quieter world.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Oryenna was founded on the belief that scent is an invisible
            architecture — shaping the energy, stillness, and emotional
            landscape of the rooms we inhabit.
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-space-lg lg:gap-gutter items-start">
          <Reveal variant="up" className="lg:col-span-5">
            <h2 className="font-headline-lg text-headline-lg text-primary leading-tight uppercase font-serif tracking-wide">
              Poured by hand, cured with patience.
            </h2>
          </Reveal>
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <Reveal variant="up" delay={100}>
              <p className="font-body-lg text-body-lg text-on-surface-variant font-serif leading-relaxed">
                Between Grasse and Provence, our atelier cold-presses European
                rapeseed and coconut butter into a botanical wax base — never
                paraffin, never palm — then folds in steam-distilled essential
                oils, resinoid extracts, and enfleurage absolutes gathered from
                wild harvests.
              </p>
            </Reveal>
            <Reveal variant="up" delay={160}>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Each vessel is mouth-blown glass, heavy-based and made to be
                kept for life. Every pour is numbered, cured for a full fourteen
                days, and trimmed, wicked, and sealed by a single pair of hands
                before it leaves the atelier.
              </p>
            </Reveal>
            <Stagger
              className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md stagger-fill"
              step={110}
            >
              {PILLARS.map((s) => (
                <div
                  key={s.label}
                  className="bg-surface p-space-md rounded-DEFAULT h-full"
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
      </section>

      {/* Quote + CTA */}
      <section className="w-full bg-primary py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal variant="up">
            <div className="w-8 h-[2px] bg-secondary mx-auto mb-6" />
            <blockquote className="font-headline-md text-headline-md text-on-primary italic leading-snug">
              &ldquo;Each vessel is an invitation to pause, exhale, and arrive
              fully in the present.&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-[52px] px-8 bg-on-primary text-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/90 transition-colors"
              >
                Shop the Collection
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center h-[52px] px-8 border border-on-primary/40 text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/10 transition-colors"
              >
                Ritual Care
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
