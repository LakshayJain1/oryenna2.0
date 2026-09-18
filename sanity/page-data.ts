import { client } from "./client";
import { PAGE_BY_SLUG_QUERY, HOME_PAGE_DOC_QUERY } from "./queries";
import type { PageDoc, PageSection } from "./types";

/** Fetch a unified `page` document by slug. Null when missing/unreachable. */
export async function fetchPageBySlug(slug: string): Promise<PageDoc | null> {
  try {
    const page = await client.fetch<PageDoc | null>(PAGE_BY_SLUG_QUERY, { slug });
    return page ?? null;
  } catch {
    return null;
  }
}

/** Fetch the Home `page` document by pageType (slug-independent). */
export async function fetchHomePageDoc(): Promise<PageDoc | null> {
  try {
    const page = await client.fetch<PageDoc | null>(HOME_PAGE_DOC_QUERY);
    return page ?? null;
  } catch {
    return null;
  }
}

/** First section of a given object type, if present. */
export function sectionOf(doc: PageDoc | null, type: string): PageSection | undefined {
  return doc?.sections?.find((s) => s._type === type);
}

/** First section carrying portable-text `content` (e.g. richText). */
export function contentSectionOf(doc: PageDoc | null): PageSection | undefined {
  return doc?.sections?.find(
    (s) => Array.isArray(s.content) && s.content.length > 0
  );
}

/** First faqList section, if present. */
export function faqSectionOf(doc: PageDoc | null): PageSection | undefined {
  return sectionOf(doc, "faqList");
}
