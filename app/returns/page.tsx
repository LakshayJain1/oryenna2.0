import { client } from "@/sanity/client";
import { RETURNS_PAGE_QUERY } from "@/sanity/queries";
import type { SanityReturnsPage } from "@/sanity/types";
import { PortableTextRenderer } from "@/components/portable-text-renderer";

export const revalidate = 60;

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/returns",
  title: "Returns Policy",
  description: "The 30-day calm guarantee — returns and exchanges, harmonised.",
});

const SLUG = "returns";

export default async function ReturnsPage() {
  const page: SanityReturnsPage | null = await client.fetch<SanityReturnsPage>(
    RETURNS_PAGE_QUERY,
    { slug: SLUG }
  );

  if (!page) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Returns Policy</h1>
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
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-[0.02em] mb-8">
          {page.title}
        </h1>
        {page.content && <PortableTextRenderer content={page.content} />}
      </div>
    </main>
  );
}