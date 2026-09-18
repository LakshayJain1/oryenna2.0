import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { JOURNAL_INSIDER_BY_SLUG_QUERY, JOURNAL_INSIDER_SLUGS_QUERY } from "@/sanity/queries";
import { toJournalPost } from "@/lib/sanity-adapters";

export const revalidate = 60;

async function getArticle(slug: string) {
  const data = await client.fetch(JOURNAL_INSIDER_BY_SLUG_QUERY, { slug });
  if (!data) return null;
  return { post: toJournalPost(data), content: data.content as any[] | undefined };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const { post } = article;
  return pageMetadata({
    path: `/journal/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.image,
  });
}

function SanityBody({ content }: { content: any[] }) {
  return (
    <>
      {content.map((block: any, i: number) => {
        if (block?._type !== "block") return null;
        const text = (block.children ?? [])
          .map((c: any) => c.text ?? "")
          .join("");
        if (!text) return null;
        const style = block.style || "normal";
        if (style === "h2" || style === "h3") {
          return (
            <h2
              key={block._key || i}
              className="font-display text-headline-lg text-primary pt-space-md"
            >
              {text}
            </h2>
          );
        }
        if (style === "blockquote") {
          return (
            <blockquote
              key={block._key || i}
              className="font-display text-headline-lg text-primary italic leading-tight border-l-2 border-secondary pl-space-md"
            >
              {text}
            </blockquote>
          );
        }
        return (
          <p key={block._key || i} className="text-on-surface-variant">
            {text}
          </p>
        );
      })}
    </>
  );
}

export default async function JournalArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) notFound();
    const { post, content } = article;
    const byline = [post.category, post.readTime].filter(Boolean);

    return (
        <article className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-xl">
            <header className="max-w-4xl mx-auto text-center space-y-space-md pb-space-lg">
                {byline.length > 0 ? (
                <div className="flex items-center justify-center gap-space-xs text-secondary font-label-md uppercase tracking-widest">
                    {byline.map((item, i) => (
                      <span key={`${item}-${i}`}>
                        {i > 0 ? " • " : ""}
                        {item}
                      </span>
                    ))}
                </div>
                ) : null}
                <h1 className="font-display text-display text-primary leading-[1.12]">
                    {post.title}
                </h1>
                {post.excerpt ? (
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                    {post.excerpt}
                </p>
                ) : null}
            </header>

            {post.image ? (
            <div className="max-w-5xl mx-auto pb-space-xl">
                <div className="relative bg-surface-container overflow-hidden">
                    <img
                        className="w-full h-[520px] md:h-[640px] object-cover"
                        src={post.image}
                        alt={post.title}
                    />
                </div>
            </div>
            ) : null}

            <div className="max-w-[700px] mx-auto space-y-space-lg text-on-surface font-body-md leading-relaxed">
                {content && content.length > 0 ? (
                    <SanityBody content={content} />
                ) : null}
                {post.closingNote ? (
                    <p className="text-on-surface-variant">{post.closingNote}</p>
                ) : null}
            </div>
        </article>
    );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(JOURNAL_INSIDER_SLUGS_QUERY);
  return (slugs ?? []).map((p) => ({ slug: p.slug }));
}
