"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";

interface SectionRendererProps {
  sections: any[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, index) => (
        <SectionComponent key={`${section._type}-${index}`} section={section} index={index} />
      ))}
    </>
  );
}

function SectionComponent({ section, index }: { section: any; index: number }) {
  const sectionType = section.sectionType || section._type;

  switch (sectionType) {
    case "hero":
      return <HeroSection section={section} />;
    case "productGrid":
      return <ProductGridSection section={section} />;
    case "collectionGrid":
      return <CollectionGridSection section={section} />;
    case "richText":
      return <RichTextSection section={section} />;
    case "imageWithText":
      return <ImageWithTextSection section={section} />;
    case "moodRecommendations":
      return <MoodRecommendationsSection section={section} />;
    case "journalArticles":
      return <JournalArticlesSection section={section} />;
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
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-surface">
      {section.backgroundImage && urlForImage(section.backgroundImage) && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlForImage(section.backgroundImage)?.width(1920).url() || ""}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
      )}
      <div className="relative z-10 px-4 md:px-16 text-center">
        {section.eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-on-primary/80 mb-2">
            {section.eyebrow}
          </p>
        )}
        {section.headline && (
          <h1 className="font-headline-lg text-headline-lg text-on-primary uppercase tracking-[0.02em] mb-4">
            {section.headline}
          </h1>
        )}
        {section.tagline && (
          <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto mb-6">
            {section.tagline}
          </p>
        )}
        {section.subtext && (
          <p className="font-body-md text-body-md text-on-primary/80 max-w-xl mx-auto">
            {section.subtext}
          </p>
        )}
        {section.cta?.label && section.cta?.url && (
          <Link
            href={section.cta.url}
            className="inline-flex items-center gap-2 mt-6 h-[52px] px-8 bg-on-primary text-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-on-primary/90 transition-colors"
          >
            {section.cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

function ProductGridSection({ section }: { section: any }) {
  const products = section.collection?.products || [];

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {section.eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {section.headline && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-12">
          {section.headline}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {products.map((product: any, i: number) => (
          <ProductCard key={product._id || i} product={product} />
        ))}
      </div>
      {section.cta?.label && section.cta?.url && (
        <div className="text-center mt-12">
          <Link
            href={section.cta.url}
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
          >
            {section.cta.label}
          </Link>
        </div>
      )}
    </section>
  );
}

function CollectionGridSection({ section }: { section: any }) {
  const collections = section.collections || [];

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {section.eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {section.headline && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-12">
          {section.headline}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {collections.map((collection: any, i: number) => (
          <CollectionCard key={collection._id || i} collection={collection} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  const imageUrl = urlForImage(product.image)?.width(600).height(600).url();

  return (
    <Link href={`/product/${product.slug?.current || product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-surface-container mb-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.imageAlt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>
      <h3 className="font-title text-title text-on-surface mb-1 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      {product.notes && (
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
          {product.notes}
        </p>
      )}
      <p className="font-label-md text-label-md text-primary">
        ${product.price?.toFixed(2) || product.price}
      </p>
    </Link>
  );
}

function CollectionCard({ collection }: { collection: any }) {
  const imageUrl = urlForImage(collection.image)?.width(600).height(600).url();

  return (
    <Link href={`/collections/${collection.slug?.current || collection.slug}`} className="group block">
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
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[800px] mx-auto prose prose-on-surface">
        {section.content && (
          <PortableText content={section.content} />
        )}
      </div>
    </section>
  );
}

function ImageWithTextSection({ section }: { section: any }) {
  const imageUrl = urlForImage(section.image)?.width(800).url();

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={section.imageAlt || ""}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            {section.eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-2">
                {section.eyebrow}
              </p>
            )}
            {section.headline && (
              <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] mb-4">
                {section.headline}
              </h2>
            )}
            {section.body && (
              <PortableText content={section.body} />
            )}
            {section.cta?.label && section.cta?.url && (
              <Link
                href={section.cta.url}
                className="inline-flex items-center gap-2 mt-6 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
              >
                {section.cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MoodRecommendationsSection({ section }: { section: any }) {
  const recommendations = section.recommendations || [];

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {section.eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {section.headline && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-12">
          {section.headline}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {recommendations.map((rec: any, i: number) => (
          <MoodCard key={rec._id || i} recommendation={rec} />
        ))}
      </div>
    </section>
  );
}

function MoodCard({ recommendation }: { recommendation: any }) {
  const product = recommendation.product;
  const imageUrl = product && urlForImage(product.image)?.width(400).height(400).url();

  return (
    <Link
      href={product ? `/product/${product.slug?.current || product.slug}` : "#"}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-container mb-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product?.name || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">
        {recommendation.mood}
      </p>
      <h3 className="font-title text-title text-on-surface mb-1 group-hover:text-primary transition-colors">
        {recommendation.label}
      </h3>
      {recommendation.tagline && (
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
          {recommendation.tagline}
        </p>
      )}
      {product && (
        <p className="font-label-md text-label-md text-primary">
          ${product.price?.toFixed(2) || product.price}
        </p>
      )}
    </Link>
  );
}

function JournalArticlesSection({ section }: { section: any }) {
  const articles = section.articles || [];

  return (
    <section className="py-16 md:py-24 px-4 md:px-16 bg-surface">
      {section.eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary text-center mb-2">
          {section.eyebrow}
        </p>
      )}
      {section.headline && (
        <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] text-center mb-12">
          {section.headline}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {articles.map((article: any, i: number) => (
          <ArticleCard key={article._id || i} article={article} />
        ))}
      </div>
      {section.cta?.label && section.cta?.url && (
        <div className="text-center mt-12">
          <Link
            href={section.cta.url}
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors"
          >
            {section.cta.label}
          </Link>
        </div>
      )}
    </section>
  );
}

function ArticleCard({ article }: { article: any }) {
  const imageUrl = article.coverImage && urlForImage(article.coverImage)?.width(600).height(400).url();

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

function TextBlockSection({ section }: { section: any }) {
  return (
    <section className="py-12 md:py-16 px-4 md:px-16 bg-surface">
      <div className="max-w-[800px] mx-auto text-center">
        {section.eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-2">
            {section.eyebrow}
          </p>
        )}
        {section.headline && (
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-[0.02em] mb-4">
            {section.headline}
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
    case "block":
      const style = block.style || "normal";
      const Tag = style === "h1" ? "h1" : style === "h2" ? "h2" : style === "h3" ? "h3" : "p";
      return (
        <Tag className={`font-${style.startsWith("h") ? "headline" : "body"}-md text-on-surface my-4`}>
          {block.children?.map((child: any) => (
            <PortableTextSpan key={child._key} span={child} />
          ))}
        </Tag>
      );
    default:
      return null;
  }
}

function PortableTextSpan({ span }: { span: any }) {
  let style: React.CSSProperties = {};
  if (span.marks?.includes("strong")) style = { ...style, fontWeight: 700 };
  if (span.marks?.includes("em")) style = { ...style, fontStyle: "italic" };
  return <span style={style}>{span.text}</span>;
}