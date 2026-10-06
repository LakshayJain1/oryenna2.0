import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact the Studio",
  description:
    "Reach the Oryenna studio in Jaipur for order care, bulk orders, and press enquiries.",
});

const DETAILS = [
  {
    icon: "mail",
    label: "Email",
    value: "contact@oryenna.in",
    href: "mailto:contact@oryenna.in",
  },
  {
    icon: "call",
    label: "Phone",
    value: "+91-6378146202",
    href: "tel:+916378146202",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-lg">
        <Reveal variant="up" className="max-w-4xl space-y-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-accent block">
            Contact / The Studio
          </span>
          <h1 className="font-headline-lg text-headline-lg text-ink tracking-tight">
            Write to the studio.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Every message is read by a human at the workbench — never a queue,
            never a bot.
          </p>
        </Reveal>
      </section>

      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pb-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-lg items-start">
          {/* Form */}
          <Reveal variant="up" className="lg:col-span-7">
            <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-[1.75rem]">
              <ContactForm />
            </div>
          </Reveal>

          {/* Direct details */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {DETAILS.map((d, i) => (
              <Reveal key={d.label} variant="up" delay={Math.min(i * 80, 240)}>
                <div className="bg-surface border border-on-surface-variant/10 rounded-2xl p-space-md flex gap-space-md items-center">
                  <span className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px] text-accent">
                      {d.icon}
                    </span>
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
                      {d.label}
                    </p>
                    <Link
                      href={d.href}
                      className="font-headline-sm text-headline-sm text-ink hover:text-accent transition-colors break-all"
                    >
                      {d.value}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Studio map */}
            <Reveal variant="up" delay={160}>
              <div className="bg-surface border border-on-surface-variant/10 rounded-2xl p-space-md">
                <div className="flex gap-space-md items-center mb-space-sm">
                  <span className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px] text-accent">
                      location_on
                    </span>
                  </span>
                  <div>
                    <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
                      Studio
                    </p>
                    <p className="font-headline-sm text-headline-sm text-ink">
                      Mandalora Studios, Jaipur
                    </p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    title="Mandalora Studios, Jaipur on the map"
                    src="https://www.google.com/maps?q=Mandalora%20Studios%20Jaipur&output=embed"
                    className="w-full h-[280px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                  Visits by appointment, Monday–Friday · 9h–18h IST.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
