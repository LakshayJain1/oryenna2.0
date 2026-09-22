import { pageMetadata } from "@/lib/seo";
import { fetchPageBySlug } from "@/sanity/page-data";
import { SectionRenderer } from "@/components/section-renderer";

export const metadata = pageMetadata({
  path: "/about",
  title: "Our Craft & Story",
  description:
    "The Oryenna atelier story — wild botanicals, ethical harvests, and hand-poured candle craft from Grasse and Provence.",
});

export const revalidate = 60;

const SLUG = "about";

export default async function AboutPage() {
  // Single source of truth: `page` doc with pageType "about".
  // Allowed sections (see studio/schemaTypes/page.ts): hero, manifesto,
  // imageText, editorialImage, quote, testimonials, richText, textBlock,
  // newsletter, cta, faqList, divider.
  const pageDoc = await fetchPageBySlug(SLUG);
  const sections = pageDoc?.sections ?? [];

  if (!pageDoc || sections.length === 0) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Our Craft &amp; Story
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-4">
            This page has not been configured in Sanity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1">
      <SectionRenderer sections={sections} />
    </main>
  );
}
