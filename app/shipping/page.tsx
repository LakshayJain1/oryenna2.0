import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/shipping",
  title: "Shipping & Transit",
  description: "Slow sensory transit — how your vessels travel from the atelier to your door.",
});

const SECTIONS = [
  {
    h: "Slow sensory transit",
    p: "Orders leave the atelier within two working days in biodegradable boxes tied with raw linen cord. Botanical wax dislikes pressure shocks and unheated cargo holds, so we ship by climate-controlled ground routes rather than overnight air.",
  },
  {
    h: "Timelines",
    p: "Europe: 3–5 working days. Rest of world: 5–9 working days. Every parcel is tracked from the workbench to your door, and complimentary ritual samples travel in every box.",
  },
  {
    h: "Damaged in transit",
    p: "If a vessel arrives cracked or broken, send a photograph to care@oryenna.com within seven days. A replacement leaves the atelier immediately — no forms, no return shipping.",
  },
];

export default function ShippingPage() {
  return (
    <main className="flex-1 py-16 md:py-24 px-4 md:px-16">
      <div className="max-w-[800px] mx-auto">
        <Reveal variant="up">
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-[0.02em] mb-8">
            Shipping & Transit
          </h1>
        </Reveal>
        {SECTIONS.map((s) => (
          <Reveal key={s.h} variant="up">
            <h2 className="font-headline-md text-headline-md text-on-surface my-5">
              {s.h}
            </h2>
            <p className="font-body-md text-body-md text-on-surface my-4 leading-relaxed">
              {s.p}
            </p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
