import type { Product } from "./products";
import type { JournalPost } from "./journal";

type SanitySlug = string | { current: string };

function slugOf(slug: SanitySlug | undefined): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current;
}

type SanityImageRef = { _id?: string; url?: string } | null | undefined;

type SanityListProduct = {
  _id: string;
  name: string;
  slug: SanitySlug;
  price: number;
  priceINR?: number;
  comparePrice?: number;
  badge?: string;
  notes?: string;
  description?: string;
  longDescription?: any[];
  weight?: string;
  size?: string;
  sku?: string;
  burnTime?: string;
  accentNotes?: string[];
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  ingredients?: string[];
  inStock?: boolean;
  featured?: boolean;
  orderRank?: number;
  gallery?: Array<{ asset?: { _id: string; url: string }; url?: string; alt?: string; caption?: string }>;
  image?: SanityImageRef;
  imageAlt?: string;
  collection?: { name?: string; slug?: SanitySlug } | null;
  insiderInfo?: {
    title?: string;
    provenanceStory?: string;
    topNotes?: string;
    heartNotes?: string;
    baseNotes?: string;
    ingredientsList?: string[];
  } | null;
  seo?: { title?: string; description?: string };
};

function imageUrlOf(image: SanityImageRef): string {
  if (!image || typeof image !== "object") return "";
  return (image as { url?: string }).url ?? "";
}

function galleryOf(
  gallery: SanityListProduct["gallery"]
): Product["gallery"] {
  if (!Array.isArray(gallery)) return undefined;
  const mapped = gallery
    .map((g: any) => {
      const url =
        g?.asset?.url ?? (typeof g?.url === "string" ? g.url : undefined);
      if (!url) return null;
      return {
        url,
        alt: g?.alt,
        caption: g?.caption,
      };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);
  return mapped.length > 0 ? mapped : undefined;
}

/** Map a Sanity product (list or detail query) onto the local Product shape.
 *  Preserves every field the PDP needs — price, gallery, pyramid notes,
 *  ingredients, insider info, collection — instead of discarding them. */
export function toLibProduct(p: SanityListProduct): Product {
  const insider = p.insiderInfo ?? null;
  return {
    id: p._id,
    slug: slugOf(p.slug),
    name: p.name,
    scentNumber: "",
    notes: p.notes ?? "",
    description: p.description ?? "",
    price: p.price,
    priceINR: p.priceINR,
    comparePrice: p.comparePrice,
    image: imageUrlOf(p.image),
    imageAlt: p.imageAlt,
    badge: p.badge,
    category: "botanical",
    burnTime: p.burnTime ?? "",
    weight: p.weight ?? "",
    size: p.size,
    sku: p.sku,
    accentNotes: p.accentNotes,
    topNotes: p.topNotes ?? insider?.topNotes,
    heartNotes: p.heartNotes ?? insider?.heartNotes,
    baseNotes: p.baseNotes ?? insider?.baseNotes,
    ingredients: p.ingredients ?? insider?.ingredientsList,
    longDescription: p.longDescription,
    gallery: galleryOf(p.gallery),
    inStock: p.inStock,
    featured: p.featured,
    collection: p.collection
      ? {
          name: p.collection.name,
          slug: p.collection.slug ? slugOf(p.collection.slug) : undefined,
        }
      : undefined,
    insiderInfo: insider
      ? {
          title: insider.title,
          provenanceStory: insider.provenanceStory,
          topNotes: insider.topNotes,
          heartNotes: insider.heartNotes,
          baseNotes: insider.baseNotes,
          ingredientsList: insider.ingredientsList,
        }
      : null,
    seo: p.seo,
  };
}

export type SanityJournalArticle = {
  _id: string;
  title: string;
  slug: SanitySlug;
  summary?: string;
  publishedAt?: string;
  publishedBy?: string;
  content?: any[];
  closingNote?: string;
  coverImage?: { _id: string; url: string } | null;
};

function formatPublishDate(value?: string): string {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Map a Sanity journal insider article onto the local JournalPost shape. */
export function toJournalPost(a: SanityJournalArticle): JournalPost {
  return {
    slug: slugOf(a.slug),
    title: a.title,
    category: a.publishedBy ?? "",
    readTime: formatPublishDate(a.publishedAt),
    excerpt: a.summary ?? "",
    image: a.coverImage?.url ?? "",
    content: a.content,
    closingNote: a.closingNote,
    publishedAt: a.publishedAt,
    publishedBy: a.publishedBy,
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
