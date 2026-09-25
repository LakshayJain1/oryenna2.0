import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description: "How Oryenna collects, uses, and protects your personal information.",
});

const SECTIONS = [
  {
    h: "What we collect",
    p: "To fulfil your order we collect your name, contact details, shipping address, and order history. Authentication is handled by Clerk; payments by Razorpay. We never see or store your card numbers.",
  },
  {
    h: "How we use it",
    p: "Your details are used to process and deliver orders, provide order care, and — only with your consent — send the Olfactory Gazette. We never sell personal data, and we share it only with the processors required to run the boutique.",
  },
  {
    h: "Your rights",
    p: "Write to care@oryenna.com at any time to review, correct, export, or delete your data. We respond within thirty days. Marketing messages always carry an unsubscribe link, honoured immediately.",
  },
  {
    h: "Retention",
    p: "Order records are kept for seven years to satisfy tax and accounting obligations, then anonymised. Gazette subscriptions are deleted on request without delay.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 py-16 md:py-24 px-4 md:px-16">
      <div className="max-w-[800px] mx-auto">
        <Reveal variant="up">
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-[0.02em] mb-8">
            Privacy Policy
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
