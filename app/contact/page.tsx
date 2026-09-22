import { fetchPageBySlug } from "@/sanity/page-data";
import { SectionRenderer } from "@/components/section-renderer";

export const revalidate = 60;

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact the Atelier",
  description:
    "Reach the Oryenna atelier for order care, bespoke requests, and press enquiries.",
});

const CONTACT_SLUG = "contact";

export default async function ContactPage() {
  // Single source of truth: unified `page` doc with inline sections.
  const pageDoc = await fetchPageBySlug(CONTACT_SLUG);

  const sections = (pageDoc?.sections ?? []);

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Page not found</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            The contact page has not been configured in Sanity.
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
