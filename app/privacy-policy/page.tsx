import { client } from "@/sanity/client";
import { PRIVACY_POLICY_PAGE_QUERY } from "@/sanity/queries";
import type { SanityPrivacyPolicyPage } from "@/sanity/types";
import { fetchPageBySlug, contentSectionOf } from "@/sanity/page-data";
import { PortableTextRenderer } from "@/components/portable-text-renderer";

export const revalidate = 60;

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description: "How Oryenna collects, uses, and protects your personal information.",
});

const SLUG = "privacy-policy";

export default async function PrivacyPolicyPage() {
  // New model first: unified `page` doc with an inline richText section.
  const pageDoc = await fetchPageBySlug(SLUG);
  const richText = contentSectionOf(pageDoc);
  const legacyPage: SanityPrivacyPolicyPage | null =
    richText?.content && richText.content.length > 0
      ? null
      : await client
          .fetch<SanityPrivacyPolicyPage>(PRIVACY_POLICY_PAGE_QUERY, { slug: SLUG })
          .catch(() => null);

  const title = pageDoc?.title ?? legacyPage?.title;
  const content = richText?.content ?? legacyPage?.content;

  if (!title || !content) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Privacy Policy</h1>
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
          {title}
        </h1>
        <PortableTextRenderer content={content} />
      </div>
    </main>
  );
}