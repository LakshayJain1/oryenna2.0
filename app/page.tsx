import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Link from "next/link";
import { products as fallbackProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { SectionRenderer } from "@/components/section-renderer";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  PRODUCTS_LIST_QUERY,
  JOURNAL_PAGE_QUERY,
} from "@/sanity/queries";
import { fetchHomePageDoc, sectionOf } from "@/sanity/page-data";
import { toLibProduct, toJournalPost } from "@/lib/sanity-adapters";

export const metadata = pageMetadata({
  path: "/",
  title: "ORYENNA — Fine Fragrance & Slow Living",
  description:
    "Hand-poured botanical candles and slow living objects from Grasse and Provence. Curated releases, atelier craft, and essays on slow living.",
});

// Safety net so Sanity edits land without a rebuild
// (publishes also trigger instant updates via /api/revalidate).
export const revalidate = 60;

export default async function HomePage() {
  // Emergency/offline fallback only — Sanity is the source of truth.
  let products = fallbackProducts;
  let journalTitle: string | undefined;
  let journalPosts: ReturnType<typeof toJournalPost>[] = [];
  let homeDoc = null;
  try {
    const [p, journalPage, h] = await Promise.all([
      client.fetch(PRODUCTS_LIST_QUERY),
      client.fetch(JOURNAL_PAGE_QUERY),
      fetchHomePageDoc(),
    ]);
    if (p && p.length > 0) products = p.map(toLibProduct);
    journalTitle = journalPage?.title;
    journalPosts = (journalPage?.articles ?? []).filter(Boolean).map(toJournalPost);
    homeDoc = h;
  } catch {
    // keep emergency offline fallbacks
  }

  // Unified `page` document wins when present.
  const heroSection = sectionOf(homeDoc, "hero");
  const manifestoSection = sectionOf(homeDoc, "manifesto");
  // Remaining page sections (imageText, editorialImage, quote,
  // journalGrid, testimonials, newsletter, cta, ...) render through the
  // shared SectionRenderer so editors fully control homepage storytelling.
  // Hero + manifesto are rendered above via dedicated components.
  const renderedKeys = new Set(
    [heroSection, manifestoSection].filter(Boolean).map((s: any) => s._key)
  );
  const extraSections = (homeDoc?.sections ?? []).filter(
    (s: any) => !renderedKeys.has(s._key)
  );

  return (
    <div className="flex flex-col w-full">
      <Hero
        eyebrow={heroSection?.eyebrow}
        headline={heroSection?.headline}
        tagline={heroSection?.tagline}
        subtext={heroSection?.subtext}
        imageUrl={(heroSection as any)?.backgroundImageUrl}
        imageAlt={(heroSection as any)?.imageAlt}
      />
      <Manifesto
        eyebrow={manifestoSection?.eyebrow}
        headline={manifestoSection?.headline}
        quote={manifestoSection?.quote}
        metrics={manifestoSection?.metrics}
      />

      {/* Featured Collection — Sanity products, offline fallback only */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary mb-space-xs block">
                02 / Signature Pours
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-serif tracking-wider">
                Curated Releases
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                Four distinct olfactory landscapes poured into mouth-blown
                glass vessels.
              </p>
            </div>
            <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md uppercase tracking-[0.18em]">
              <span>Archive Vol. 04</span>
              <span className="w-6 h-[1px] bg-outline-variant" />
              <span>In Stock</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Editor-controlled storytelling sections from the home `page` doc. */}
      {extraSections.length > 0 ? (
        <SectionRenderer sections={extraSections} />
      ) : null}

      {journalPosts.length > 0 ? (
      <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              {journalTitle ? (
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-serif tracking-wider">
                {journalTitle}
              </h2>
              ) : null}
            </div>
            <Link
              href="/journal"
              className="font-label-md text-label-md uppercase tracking-[0.16em] text-primary hover:text-secondary transition-colors inline-flex items-center gap-1"
            >
              <span>Read All Dispatches</span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {journalPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-[16/11] bg-surface-container overflow-hidden mb-space-sm">
                  {post.image ? (
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    src={post.image}
                    alt={post.title}
                  />
                  ) : null}
                </div>
                {(post.category || post.readTime) ? (
                <div className="flex items-center gap-2 mb-1">
                  {post.category ? (
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.16em] text-secondary">
                    {post.category}
                  </span>
                  ) : null}
                  {post.category && post.readTime ? (
                  <span className="w-1 h-1 rounded-full bg-outline" />
                  ) : null}
                  {post.readTime ? (
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {post.readTime}
                  </span>
                  ) : null}
                </div>
                ) : null}
                <h3 className="font-headline-sm text-headline-sm text-primary font-serif uppercase tracking-wide group-hover:text-secondary transition-colors mb-2">
                  {post.title}
                </h3>
                {post.excerpt ? (
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                  {post.excerpt}
                </p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
      ) : null}
    </div>
  );
}
