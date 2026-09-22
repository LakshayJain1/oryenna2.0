import { products as fallbackProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { SectionRenderer } from "@/components/section-renderer";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  PRODUCTS_LIST_QUERY,
  COLLECTION_BY_SLUG_QUERY,
} from "@/sanity/queries";
import { fetchPageBySlug, sectionOf } from "@/sanity/page-data";
import { toLibProduct } from "@/lib/sanity-adapters";

export const metadata = pageMetadata({
  path: "/shop",
  title: "The Collection — All Vessels & Objects",
  description:
    "Slow seasonal botanical candles hand-poured in mouth-blown glass, unglazed stoneware, and Roman travertine. Shop the Oryenna collection.",
});

export const revalidate = 60;

const SLUG = "shop";

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ collection?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const collectionSlug =
    typeof params?.collection === "string" && params.collection.length > 0
      ? params.collection
      : undefined;

  // Emergency/offline fallback only — Sanity is the source of truth.
  let products = fallbackProducts;
  let collection: {
    name?: string;
    description?: string;
  } | null = null;
  let shopDoc = null;
  try {
    const [shop, data, collectionDoc] = await Promise.all([
      fetchPageBySlug(SLUG),
      collectionSlug
        ? Promise.resolve(null)
        : client.fetch(PRODUCTS_LIST_QUERY),
      collectionSlug
        ? client
            .fetch(COLLECTION_BY_SLUG_QUERY, { slug: collectionSlug })
            .catch(() => null)
        : Promise.resolve(null),
    ]);
    shopDoc = shop;
    if (collectionDoc) {
      collection = {
        name: collectionDoc.name,
        description: collectionDoc.description,
      };
      const collectionProducts = (collectionDoc.products ?? []).filter(
        Boolean
      );
      if (collectionProducts.length > 0) {
        products = collectionProducts.map(toLibProduct);
      }
    } else if (data && data.length > 0) {
      products = data.map(toLibProduct);
    }
  } catch {
    // keep emergency offline fallback
  }

  // Header is Sanity-driven: the shop `page` doc's hero section wins, then
  // the active collection, then the page doc title. Static strings below are
  // emergency offline fallbacks only — add a hero section in Studio to own
  // this header from the CMS.
  const heroSection = sectionOf(shopDoc, "hero");
  const heroTitle =
    (heroSection as any)?.headline ??
    (heroSection as any)?.title ??
    collection?.name ??
    (shopDoc as any)?.title ??
    "The Collection";
  const heroTagline =
    (heroSection as any)?.tagline ??
    collection?.description ??
    "Slow seasonal botanical candles, composed for contemplative and unhurried living.";
  const heroEyebrow =
    (heroSection as any)?.eyebrow ??
    (collectionSlug ? `Collection / ${collectionSlug}` : undefined);

  const renderedKeys = new Set(
    [heroSection].filter(Boolean).map((s: any) => s._key)
  );
  const extraSections = (shopDoc?.sections ?? []).filter(
    (s: any) => !renderedKeys.has(s._key)
  );

  return (
    <div className="flex flex-col w-full">
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-lg">
        <div className="max-w-4xl space-y-space-sm">
          {heroEyebrow ? (
            <div className="flex items-center gap-space-sm text-secondary font-label-sm text-label-sm uppercase tracking-widest">
              <span>{heroEyebrow}</span>
            </div>
          ) : null}
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            {heroTitle}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {heroTagline}
          </p>
        </div>
      </section>

      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {extraSections.length > 0 ? (
        <SectionRenderer sections={extraSections} />
      ) : null}
    </div>
  );
}
