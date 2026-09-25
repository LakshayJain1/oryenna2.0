import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/returns",
  title: "Returns & Exchanges",
  description: "Uncomplicated returns — thirty days on unburned vessels.",
});

const SECTIONS = [
  {
    h: "Thirty quiet days",
    p: "Unburned vessels in their original packaging may be returned within thirty days of delivery for a full refund. Write to care@oryenna.com with your order number and we will arrange collection.",
  },
  {
    h: "Burned vessels",
    p: "Because scent is personal, lightly burned vessels cannot be resold — but if a composition truly does not belong in your home, tell us within fourteen days and we will offer an exchange for another pour or atelier credit.",
  },
  {
    h: "Refunds",
    p: "Refunds return to the original payment method within five working days of the vessel reaching the atelier. Return transit on us for damaged parcels; otherwise a modest label fee applies.",
  },
];

export default function ReturnsPage() {
  return (
    <main className="flex-1 py-16 md:py-24 px-4 md:px-16">
      <div className="max-w-[800px] mx-auto">
        <Reveal variant="up">
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-[0.02em] mb-8">
            Returns & Exchanges
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
