import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/terms",
  title: "Terms of Service",
  description: "The terms governing your use of the Oryenna boutique and atelier services.",
});

const SECTIONS = [
  {
    h: "The boutique",
    p: "ORYENNA Parfums & Bougies offers hand-poured botanical candles and ritual objects through this boutique. By placing an order you agree to these terms, our shipping policy, and our returns policy. Prices are shown in USD and INR, inclusive of applicable taxes where stated at checkout.",
  },
  {
    h: "Orders & availability",
    p: "Every vessel is poured in small numbered batches. If a pour sells through while your order is being prepared, we will offer the next batch, an equivalent composition, or a full refund — your choice, always. We reserve the right to decline orders that cannot be fulfilled to atelier standard.",
  },
  {
    h: "Payment",
    p: "Payments are processed securely via Razorpay. Your card details never touch our servers. An order is confirmed only once payment is captured and you receive an order number.",
  },
  {
    h: "Intellectual property",
    p: "All compositions, names, texts, and imagery are the property of the atelier. You may enjoy them in your home; you may not reproduce them commercially without written consent.",
  },
];

export default function TermsPage() {
  return (
    <main className="flex-1 py-16 md:py-24 px-4 md:px-16">
      <div className="max-w-[800px] mx-auto">
        <Reveal variant="up">
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-[0.02em] mb-8">
            Terms of Service
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
