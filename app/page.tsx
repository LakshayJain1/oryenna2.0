import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Link from "next/link";
import { products as fallbackProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
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
  let settings: any = null;
  let products = fallbackProducts;
  let journalTitle: string | undefined;
  let journalPosts: ReturnType<typeof toJournalPost>[] = [];
  let homeDoc = null;
  try {
    const [s, p, journalPage, h] = await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(PRODUCTS_LIST_QUERY),
      client.fetch(JOURNAL_PAGE_QUERY),
      fetchHomePageDoc(),
    ]);
    if (s) settings = s;
    if (p && p.length > 0) products = p.map(toLibProduct);
    journalTitle = journalPage?.title;
    journalPosts = (journalPage?.articles ?? []).filter(Boolean).map(toJournalPost);
    homeDoc = h;
  } catch {
    // keep hardcoded fallbacks
  }

  // Unified `page` document wins when present; legacy site settings next.
  const heroSection = sectionOf(homeDoc, "hero");
  const manifestoSection = sectionOf(homeDoc, "manifesto");

  return (
    <div className="flex flex-col w-full">
      <Hero
        eyebrow={heroSection?.eyebrow ?? settings?.heroEyebrow}
        headline={heroSection?.headline ?? settings?.heroHeadline}
        tagline={heroSection?.tagline ?? settings?.heroTagline}
        subtext={heroSection?.subtext ?? settings?.heroSubtext}
      />
      <Manifesto
        eyebrow={manifestoSection?.eyebrow ?? settings?.manifestoEyebrow}
        headline={manifestoSection?.headline ?? settings?.manifestoHeadline}
        quote={manifestoSection?.quote ?? settings?.manifestoQuote}
        metrics={manifestoSection?.metrics ?? settings?.manifestoMetrics}
      />

      {/* Featured Collection */}
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

      {/* Philosophy */}
      <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-space-xl lg:gap-gutter items-center">
            <div className="lg:col-span-7 relative">
              <div className="relative overflow-hidden shadow-xl rounded-DEFAULT aspect-[4/5] md:aspect-[16/12]">
                <img
                  alt="Hands carefully striking a long matchstick to light an ivory ceramic candle"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxqnrH6N24MlY6mFo1DPx0jZITfxFkj2HaAjMz7YFogTdLmBCyz7s5XK8GqHpBrAa8BxrZVXVggUtI24blt7MjCKeGHtdNFpSEJzxX-m6QG5610SiMNX1Bogxppnm9cDbCjp9SxhuipYw8JZsCDh9TVMAgb_P0jmCHtQZEGcBrXw5HW-0lEjTei1hNWLqjgHuARnkoOVruVutmigKLnVvW-xDTgWgPKqBhPEnaCAD2APNQeQqvLGySVQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                <div className="absolute bottom-space-md left-space-md right-space-md p-space-md bg-surface/90 backdrop-blur-md">
                  <p className="font-headline-sm text-headline-sm font-serif italic text-primary">
                    "The strike of a match is a boundary line between the noise
                    outside and your quiet haven within."
                  </p>
                  <span className="font-label-sm text-label-sm tracking-[0.18em] uppercase text-outline mt-2 block">
                    Atelier Manual · Chapter II
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center pl-0 lg:pl-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary mb-space-xs block">
                03 / Slow Living
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-serif tracking-wide mb-space-md">
                A ritual, not just a scent.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                In a culture that measures life by speed, Oryenna chooses cadence
                over rush. Lighting a candle should never be passive background
                noise. It is an intentional gesture.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                We honor raw materials in their honest tactile weight: coarse
                travertine, raw linen, unglazed earthenware, and pure botanical
                essences harvested under ethical stewardship.
              </p>
              <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
                {[
                  { icon: "texture", label: "Raw Linen" },
                  { icon: "interests", label: "Travertine" },
                  { icon: "spa", label: "Soy Botanical" },
                ].map((el) => (
                  <div
                    key={el.label}
                    className="bg-surface-container p-space-sm text-center"
                  >
                    <span className="material-symbols-outlined text-secondary block mb-1 text-[22px]">
                      {el.icon}
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                      {el.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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