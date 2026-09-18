import type { Product } from "./products";
import type { JournalPost } from "./journal";

type SanitySlug = string | { current: string };

function slugOf(slug: SanitySlug | undefined): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current;
}

type SanityListProduct = {
  _id: string;
  name: string;
  slug: SanitySlug;
  price: number;
  badge?: string;
  notes?: string;
  description?: string;
  weight?: string;
  burnTime?: string;
  image?: { _id: string; url: string } | null;
  imageAlt?: string;
};

/** Map a Sanity product (list or detail query) onto the local Product shape. */
export function toLibProduct(p: SanityListProduct): Product {
  return {
    id: p._id,
    slug: slugOf(p.slug),
    name: p.name,
    scentNumber: "",
    notes: p.notes ?? "",
    description: p.description ?? "",
    price: p.price,
    image: p.image?.url ?? "",
    badge: p.badge,
    category: "botanical",
    burnTime: p.burnTime ?? "",
    weight: p.weight ?? "",
  };
}

type SanityJournalArticle = {
  _id: string;
  title: string;
  slug: SanitySlug;
  category?: string;
  readTime?: string;
  summary?: string;
  coverImage?: { _id: string; url: string } | null;
};

/** Map a Sanity journal article onto the local JournalPost shape. */
export function toJournalPost(a: SanityJournalArticle): JournalPost {
  return {
    slug: slugOf(a.slug),
    title: a.title,
    category: a.category ?? "Journal",
    readTime: a.readTime ?? "",
    excerpt: a.summary ?? "",
    image: a.coverImage?.url ?? "",
  };
}

export type SanityFooterColumn = {
  columnTitle: string;
  links?: Array<{ label: string; url: string }>;
};

export type FooterColumn = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

/** Map Sanity footer columns onto the local Footer shape. */
export function toFooterColumns(
  cols: SanityFooterColumn[] | undefined
): FooterColumn[] | null {
  if (!cols || cols.length === 0) return null;
  return cols.map((c) => ({
    title: c.columnTitle,
    links: (c.links ?? []).map((l) => ({ label: l.label, href: l.url })),
  }));
}
