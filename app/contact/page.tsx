import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact the Atelier",
  description:
    "Reach the Oryenna atelier for order care, bespoke requests, and press enquiries.",
});

const DETAILS = [
  {
    icon: "mail",
    label: "Order Care",
    value: "care@oryenna.com",
    href: "mailto:care@oryenna.com",
    note: "Orders, transit & returns · replies within 2 working days",
  },
  {
    icon: "palette",
    label: "Bespoke & Gifting",
    value: "atelier@oryenna.com",
    href: "mailto:atelier@oryenna.com",
    note: "Large-format pours, weddings & corporate scenting",
  },
  {
    icon: "newspaper",
    label: "Press & Stockists",
    value: "press@oryenna.com",
    href: "mailto:press@oryenna.com",
    note: "Editorial loans, samples & wholesale",
  },
  {
    icon: "location_on",
    label: "The Atelier",
    value: "Route de Grasse, Provence",
    href: undefined,
    note: "Visits by appointment, Monday–Friday · 9h–18h CET",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-lg">
        <Reveal variant="up" className="max-w-4xl space-y-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary block">
            Contact / The Atelier
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Write to the atelier.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Every message is read by a human at the workbench — never a queue,
            never a bot. Send a note below, or reach the right desk directly.
          </p>
        </Reveal>
      </section>

      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pb-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-lg items-start">
          {/* Form */}
          <Reveal variant="up" className="lg:col-span-7">
            <div className="bg-surface-container-low p-space-md md:p-space-lg">
              <ContactForm />
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {DETAILS.map((d, i) => (
              <Reveal key={d.label} variant="up" delay={Math.min(i * 80, 240)}>
                <div className="bg-surface border border-on-surface-variant/10 p-space-md flex gap-space-md">
                  <span className="material-symbols-outlined text-[22px] text-secondary shrink-0">
                    {d.icon}
                  </span>
                  <div className="space-y-1">
                    <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
                      {d.label}
                    </p>
                    {d.href ? (
                      <Link
                        href={d.href}
                        className="font-headline-sm text-headline-sm text-primary hover:text-secondary transition-colors"
                      >
                        {d.value}
                      </Link>
                    ) : (
                      <p className="font-headline-sm text-headline-sm text-primary">
                        {d.value}
                      </p>
                    )}
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {d.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
