import { fetchPageBySlug, faqSectionOf } from "@/sanity/page-data";

export const revalidate = 60;

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/faq",
  title: "Frequently Asked Questions",
  description:
    "Answers on burn care, shipping, returns, and the Oryenna slow living ritual.",
});

const SLUG = "faq";

export default async function FAQPage() {
  // Single source of truth: `page` doc with an inline faqList section.
  const pageDoc = await fetchPageBySlug(SLUG);
  const faqSection = faqSectionOf(pageDoc);

  const title = pageDoc?.title;
  const faqs = faqSection?.items;

  if (!title || !faqs || faqs.length === 0) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Frequently Asked Questions</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-4">
            This page has not been configured in Sanity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 py-16 md:py-24 px-4 md:px-16">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-[0.02em] mb-12">
          {title}
        </h1>
        <div className="space-y-4">
          {faqs.map((faq: any, i: number) => (
            <details
              key={faq._key || i}
              className="group bg-surface-container rounded-none border border-on-surface-variant/10 overflow-hidden"
            >
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
          ))}
        </div>
      </div>
    </main>
  );
}
