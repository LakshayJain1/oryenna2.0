import HomeWaxExperience from "@/components/home/HomeWaxExperience";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import Link from "next/link";
import { products } from "@/lib/products";
import { journalPosts } from "@/lib/journal-posts";
import { JOURNAL_TITLE } from "@/lib/site";
import ProductCard from "@/components/shop/ProductCard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "ORYENNA — Fine Fragrance & Slow Living",
  description:
    "Hand-poured botanical candles and slow living objects from Grasse and Provence. Curated releases, atelier craft, and essays on slow living.",
});

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      <HomeWaxExperience />

      {/* Featured Collection */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <Reveal variant="up">
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
            </Reveal>
            <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md uppercase tracking-[0.18em]">
              <span>Archive Vol. 04</span>
              <span className="w-6 h-[1px] bg-outline-variant" />
              <span>In Stock</span>
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter stagger-fill">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Atelier interlude */}
      <section className="w-full bg-primary py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal variant="up">
            <div className="w-8 h-[2px] bg-secondary mx-auto mb-6" />
            <blockquote className="font-headline-md text-headline-md text-on-primary italic leading-snug">
              &ldquo;Scent is an invisible architecture — shaping the energy,
              stillness, and emotional landscape of the rooms we inhabit.&rdquo;
            </blockquote>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-on-primary/70">
              The Oryenna Atelier · Grasse & Provence
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center mt-8 h-[52px] px-8 bg-on-primary text-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/90 transition-colors"
            >
              Our Craft & Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Journal */}
      <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <Reveal variant="up">
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-serif tracking-wider">
                {JOURNAL_TITLE}
              </h2>
            </Reveal>
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

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter stagger-fill">
            {journalPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex flex-col h-full"
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
          </Stagger>
        </div>
      </section>
    </div>
  );
}
