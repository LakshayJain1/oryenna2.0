"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";
import { toLibProduct } from "@/lib/sanity-adapters";
import ProductCard from "@/components/shop/ProductCard";
import Manifesto from "@/components/home/Manifesto";

interface SectionRendererProps {
  sections: any[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, index) => (
        <SectionComponent key={section._key || `${section._type}-${index}`} section={section} index={index} />
      ))}
    </>
  );
}

// --- Compatibility helpers: new inline objects use canonical names,
// --- legacy embedded documents used older ones. Both resolve identically.
const asString = (v: unknown): string | undefined =>
  typeof v === "string" && v.length > 0 ? v : undefined;

const headlineOf = (s: any): string | undefined =>
  asString(s.headline) ?? asString(s.title);

const taglineOf = (s: any): string | undefined =>
  asString(s.tagline) ?? asString(s.subtitle);

const descOf = (s: any): string | undefined =>
  asString(s.description) ?? asString(s.subtitle) ?? asString(s.text);

const ctaOf = (s: any): { label: string; url: string } | null => {
  if (s.cta && asString(s.cta.label)) {
    return { label: s.cta.label, url: asString(s.cta.url) || "#" };
  }
  if (asString(s.ctaText)) {
    return { label: s.ctaText, url: asString(s.ctaUrl) || "#" };
  }
  return null;
};

const blockTextOf = (blocks: any): string => {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b: any) => b?._type === "block")
    .map((b: any) =>
      (b.children ?? []).map((c: any) => c.text ?? "").join("")
    )
    .join("\n\n");
};

function SectionComponent({ section, index }: { section: any; index: number }) {
  const sectionType = section.sectionType || section._type;

  switch (sectionType) {
    case "hero":
      return <HeroSection section={section} />;
    case "manifesto":
      return (
        <Manifesto
          eyebrow={asString(section.eyebrow)}
          headline={asString(section.headline)}
          quote={asString(section.quote)}
          metrics={Array.isArray(section.metrics) ? section.metrics : undefined}
        />
      );
    case "featuredProducts":
    case "productGrid":
      return <ProductGridSection section={section} />;
    case "collectionGrid":
      return <CollectionGridSection section={section} />;
    case "richText":
      return <RichTextSection section={section} />;
    case "imageText":
    case "imageWithText":
      return <ImageWithTextSection section={section} />;
    case "editorialImage":
      return <EditorialImageSection section={section} />;
    case "journalGrid":
    case "journalArticles":
      return <JournalArticlesSection section={section} />;
    case "quote":
      return <QuoteSection section={section} />;
    case "testimonials":
      return <TestimonialsSection section={section} />;
    case "newsletter":
      return <NewsletterSection section={section} />;
    case "cta":
      return <CtaSection section={section} />;
    case "faqList":
      return <FaqListSection section={section} />;
    case "textBlock":
      return <TextBlockSection section={section} />;
    case "divider":
      return <DividerSection section={section} />;
    default:
      return (
        <div className="p-8 border-t border-on-surface-variant/10" data-section-type={sectionType}>
          <p className="text-on-surface-variant text-sm">
            Unknown section type: {sectionType}
          </p>
        </div>
      );
  }
}

function HeroSection({ section }: { section: any }) {
  const bgUrl =
    asString(section.backgroundImageUrl) ||
    (section.backgroundImage ? urlForImage(section.backgroundImage)?.width(1920).url() : undefined);
  const cta = ctaOf(section);
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-surface">
      {bgUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgUrl}
            alt={asString(section.imageAlt) || ""}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
      )}
      <div className="relative z-10 px-4 md:px-16 text-center">
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-on-primary/80 mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h1 className="font-headline-lg text-headline-lg text-on-primary uppercase tracking-[0.02em] mb-4">
            {headlineOf(section)}
          </h1>
        )}
        {taglineOf(section) && (
          <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto mb-6">
            {taglineOf(section)}
          </p>
        )}
        {asString(section.subtext) && (
          <p className="font-body-md text-body-md text-on-primary/80 max-w-xl mx-auto">
            {section.subtext}
          </p>
        )}
        {cta && (
          <Link
            href={cta.url}
            className="inline-flex items-center gap-2 mt-6 h-[52px] px-8 bg-on-primary text-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/90 transition-colors"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

function ProductGridSection({ section }: { section: any }) {
  const raw =
    section.products && section.products.length > 0
      ? section.products
      : section.collection?.products || [];
  const count =
    typeof section.count === "number" && section.count > 0 ? section.count : raw.length;
  const products = raw.slice(0, count).map((p: any) => {
    try {
      return toLibProduct(p);
    } catch {
      return null;
    }
  }).filter(Boolean);
  const cta = ctaOf(section);
  const cols =
    section.layout === "2"
      ? "lg:grid-cols-2"
      : section.layout === "3"
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4";

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {asString(section.eyebrow) && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {headlineOf(section) && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-4">
          {headlineOf(section)}
        </h2>
      )}
      {descOf(section) && (
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
          {descOf(section)}
        </p>
      )}
      {headlineOf(section) && !descOf(section) && <div className="mb-12" />}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-6 md:gap-8 max-w-[1280px] mx-auto`}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {cta && (
        <div className="text-center mt-12">
          <Link
            href={cta.url}
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </section>
  );
}

function CollectionGridSection({ section }: { section: any }) {
  const collections =
    section.collections && section.collections.length > 0
      ? section.collections
      : section.collection
        ? [section.collection]
        : [];

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {asString(section.eyebrow) && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {headlineOf(section) && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-4">
          {headlineOf(section)}
        </h2>
      )}
      {descOf(section) && (
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
          {descOf(section)}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {collections.map((collection: any, i: number) => (
          <CollectionCard key={collection._id || i} collection={collection} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({ collection }: { collection: any }) {
  const imageUrl =
    asString(collection.imageUrl) ||
    (collection.image ? urlForImage(collection.image)?.width(600).height(600).url() : undefined);

  // Collections resolve to the shop listing filtered by collection slug.
  // There is no standalone /collections/[slug] route; /shop?collection=
  // is the single source of truth for collection browsing.
  const collectionSlug =
    collection.slug?.current || collection.slug || "";
  return (
    <Link
      href={collectionSlug ? `/shop?collection=${collectionSlug}` : "/shop"}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container mb-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-on-primary">
        <h3 className="font-headline-sm text-headline-sm uppercase tracking-[0.02em]">
          {collection.name}
        </h3>
        {collection.description && (
          <p className="font-body-sm text-body-sm text-on-primary/80 mt-1 line-clamp-2">
            {collection.description}
          </p>
        )}
      </div>
    </Link>
  );
}

function RichTextSection({ section }: { section: any }) {
  const cta = ctaOf(section);
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[800px] mx-auto prose prose-on-surface">
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] mb-6">
            {headlineOf(section)}
          </h2>
        )}
        {section.content && (
          <PortableText content={section.content} />
        )}
        {cta && (
          <div className="mt-8">
            <Link
              href={cta.url}
              className="inline-flex items-center gap-2 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ImageWithTextSection({ section }: { section: any }) {
  const imageUrl =
    asString(section.imageUrl) ||
    (section.image ? urlForImage(section.image)?.width(800).url() : undefined);
  const cta = ctaOf(section);
  const imageRight = section.imagePosition === "right" || section.imageAlignment === "right";

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={`relative aspect-[4/5] ${imageRight ? "lg:order-2" : ""}`}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={asString(section.imageAlt) || ""}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className={imageRight ? "lg:order-1" : ""}>
            {asString(section.eyebrow) && (
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-2">
                {section.eyebrow}
              </p>
            )}
            {headlineOf(section) && (
              <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] mb-4">
                {headlineOf(section)}
              </h2>
            )}
            {descOf(section) && (
              <p className="font-body-md text-body-md text-on-surface-variant">
                {descOf(section)}
              </p>
            )}
            {section.body && (
              <PortableText content={section.body} />
            )}
            {cta && (
              <Link
                href={cta.url}
                className="inline-flex items-center gap-2 mt-6 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialImageSection({ section }: { section: any }) {
  const imageUrl =
    asString(section.imageUrl) ||
    (section.image ? urlForImage(section.image)?.width(1600).url() : undefined);

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[1280px] mx-auto text-center">
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] mb-8">
            {headlineOf(section)}
          </h2>
        )}
        {imageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
            <Image
              src={imageUrl}
              alt={asString(section.imageAlt) || headlineOf(section) || ""}
              fill
              className="object-cover"
            />
          </div>
        )}
        {asString(section.caption) && (
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-4 italic">
            {section.caption}
          </p>
        )}
      </div>
    </section>
  );
}

function JournalArticlesSection({ section }: { section: any }) {
  const articles = section.articles || [];
  const cta = ctaOf(section);

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {asString(section.eyebrow) && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {headlineOf(section) && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-4">
          {headlineOf(section)}
        </h2>
      )}
      {descOf(section) && (
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
          {descOf(section)}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {articles.map((article: any, i: number) => (
          <ArticleCard key={article._id || i} article={article} />
        ))}
      </div>
      {cta && (
        <div className="text-center mt-12">
          <Link
            href={cta.url}
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </section>
  );
}

function ArticleCard({ article }: { article: any }) {
  const imageUrl =
    article.coverImage && urlForImage(article.coverImage)?.width(600).height(400).url();

  return (
    <Link href={`/journal/${article.slug?.current || article.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-surface-container mb-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      {article.category && (
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">
          {article.category}
        </p>
      )}
      <h3 className="font-title text-title text-on-surface mb-1 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      {article.summary && (
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {article.summary}
        </p>
      )}
    </Link>
  );
}

function QuoteSection({ section }: { section: any }) {
  if (!asString(section.text)) return null;
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[800px] mx-auto text-center">
        <div className="w-8 h-[2px] bg-secondary mx-auto mb-6" />
        <blockquote className="font-headline-md text-headline-md text-primary italic leading-snug">
          &ldquo;{section.text}&rdquo;
        </blockquote>
        {(asString(section.author) || asString(section.role)) && (
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
            {section.author}
            {section.author && section.role ? " · " : ""}
            {section.role}
          </p>
        )}
      </div>
    </section>
  );
}

function TestimonialsSection({ section }: { section: any }) {
  const list = Array.isArray(section.testimonials) ? section.testimonials : [];
  if (list.length === 0) return null;
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-12">
            {headlineOf(section)}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {list.map((t: any, i: number) => (
            <div key={t._key || i} className="bg-surface-container p-6 md:p-8">
              {typeof t.rating === "number" && (
                <p className="text-[11px] tracking-[0.2em] text-secondary mb-3">
                  {"★".repeat(Math.max(1, Math.min(5, t.rating)))}
                </p>
              )}
              <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                &ldquo;{typeof t.content === "string" ? t.content : blockTextOf(t.content)}&rdquo;
              </p>
              {asString(t.author) && (
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  — {t.author}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection({ section }: { section: any }) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface-container-low">
      <div className="max-w-[640px] mx-auto text-center">
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-secondary mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            {headlineOf(section)}
          </h2>
        )}
        {descOf(section) && (
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            {descOf(section)}
          </p>
        )}
        {/* Newsletter backend is not connected yet — the form is
            intentionally disabled so it never fakes a signup. Editors:
            connect a provider and replace this block; shoppers: use
            Contact for Gazette requests. */}
        <form
          className="flex flex-col sm:flex-row gap-3 opacity-90"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            disabled
            placeholder="Gazette signups via Contact for now"
            aria-label="Email address (newsletter not yet connected)"
            className="flex-1 bg-surface px-4 py-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none disabled:opacity-70"
          />
          <Link
            href="/contact"
            className="h-[52px] px-8 inline-flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
          >
            {asString(section.ctaLabel) || "Contact Atelier"}
          </Link>
        </form>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
          Gazette subscriptions are handled through the atelier until the
          newsletter provider is connected.
        </p>
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: any }) {
  const cta = ctaOf(section);
  const secondary =
    section.secondaryCta && asString(section.secondaryCta.label)
      ? {
          label: section.secondaryCta.label as string,
          url: asString(section.secondaryCta.url) || "#",
        }
      : null;
  const centered = section.alignment !== "left";
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-primary">
      <div className={`max-w-[800px] mx-auto ${centered ? "text-center" : ""}`}>
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-secondary mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-on-primary uppercase tracking-[0.02em] mb-4">
            {headlineOf(section)}
          </h2>
        )}
        {descOf(section) && (
          <p className="font-body-md text-body-md text-on-primary/80 mb-8">
            {descOf(section)}
          </p>
        )}
        {(cta || secondary) && (
          <div className={`flex flex-col sm:flex-row gap-3 ${centered ? "justify-center" : ""}`}>
            {cta && (
              <Link
                href={cta.url}
                className="inline-flex items-center justify-center h-[52px] px-8 bg-on-primary text-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/90 transition-colors"
              >
                {cta.label}
              </Link>
            )}
            {secondary && (
              <Link
                href={secondary.url}
                className="inline-flex items-center justify-center h-[52px] px-8 border border-on-primary/40 text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/10 transition-colors"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function FaqListSection({ section }: { section: any }) {
  const items = Array.isArray(section.items) ? section.items : [];
  if (items.length === 0) return null;
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[800px] mx-auto">
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-12">
            {headlineOf(section)}
          </h2>
        )}
        <div className="space-y-4">
          {items.map((faq: any, i: number) => (
            <details
              key={faq._key || i}
              className="group bg-surface-container rounded-none border border-on-surface-variant/10 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-title text-title text-on-surface pr-8">
                  {faq.question}
                </span>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 border-t border-on-surface-variant/10">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function TextBlockSection({ section }: { section: any }) {
  return (
    <section className="py-12 md:py-16 px-4 md:px-16 bg-surface">
      <div className="max-w-[800px] mx-auto text-center">
        {asString(section.eyebrow) && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-2">
            {section.eyebrow}
          </p>
        )}
        {headlineOf(section) && (
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] mb-4">
            {headlineOf(section)}
          </h2>
        )}
        {section.body && (
          <PortableText content={section.body} />
        )}
      </div>
    </section>
  );
}

function DividerSection({ section }: { section: any }) {
  return (
    <hr className="border-on-surface-variant/10 my-8" />
  );
}

function PortableText({ content }: { content: any[] }) {
  if (!content?.length) return null;

  return (
    <div className="prose prose-on-surface max-w-none">
      {content.map((block: any, i: number) => (
        <PortableTextBlock key={block._key || i} block={block} />
      ))}
    </div>
  );
}

function PortableTextBlock({ block }: { block: any }) {
  switch (block._type) {
    case "block": {
      const style = block.style || "normal";
      const Tag = style === "h1" ? "h1" : style === "h2" ? "h2" : style === "h3" ? "h3" : "p";
      return (
        <Tag className={`font-${style.startsWith("h") ? "headline" : "body"}-md text-on-surface my-4`}>
          {block.children?.map((child: any) => (
            <PortableTextSpan key={child._key} span={child} />
          ))}
        </Tag>
      );
    }
    default:
      return null;
  }
}

function PortableTextSpan({ span }: { span: any }) {
  let style: React.CSSProperties = {};
  if (span.marks?.includes("strong")) style = { ...style, fontWeight: 700 };
  if (span.marks?.includes("em")) style = { ...style, fontStyle: "italic" };
  // Honor Studio soft breaks (Shift+Enter stores "\n" in the span text).
  const parts: string[] =
    typeof span.text === "string" ? span.text.split("\n") : [];
  return (
    <span style={style}>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {part}
        </span>
      ))}
    </span>
  );
}
