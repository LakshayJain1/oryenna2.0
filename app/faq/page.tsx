import ConciergeView from "@/components/concierge/concierge-view";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { FAQ_GROUPS } from "@/lib/faq-groups";

export const metadata = pageMetadata({
  path: "/faq",
  title: "Frequently Asked Questions",
  description:
    "Answers on burn care, botanical wax, vessels, transit, and candle care at home.",
});

const QUICK_ANSWERS = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders leave the studio within 2 working days and travel by climate-controlled ground transit: 3–5 days in Europe, 5–9 days worldwide. Every parcel is tracked and packed in biodegradable materials with linen cord.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Unburned vessels may be returned within 30 days for a full refund. If a vessel arrives damaged, send a photograph within 7 days and a replacement leaves the studio immediately — no return shipping needed.",
  },
  {
    question: "Do you offer gift packaging?",
    answer:
      "Yes — select Signature Gift Packaging at checkout for a cotton-lined gift box with a wax seal and herb card. It fits every vessel in the collection.",
  },
  {
    question: "How can I reach the studio directly?",
    answer:
      "Write to contact@oryenna.in for orders and support, or use the contact desk — every message is read by a human at the workbench.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col w-full">
      <ConciergeView
        eyebrow="Questions / Candle Knowledge"
        title="Wax, Wick & Candle Care"
        tagline="A practical guide to burning, wax, vessels, shipping, and gifting. Search, or wander by discipline."
        groups={FAQ_GROUPS}
      />

      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-[800px] mx-auto">
          <Reveal variant="up">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-accent block mb-2">
              Quick Answers
            </span>
            <h2 className="font-headline-lg text-headline-lg text-ink uppercase tracking-wide mb-8">
              Orders, shipping & the studio
            </h2>
          </Reveal>
          <div className="space-y-4">
            {QUICK_ANSWERS.map((faq, i) => (
              <Reveal key={i} variant="up" delay={Math.min(i * 60, 300)}>
                <details className="group bg-surface rounded-2xl border border-on-surface-variant/10 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-title text-title text-on-surface pr-8">
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="px-6 pb-6 border-t border-on-surface-variant/10">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
