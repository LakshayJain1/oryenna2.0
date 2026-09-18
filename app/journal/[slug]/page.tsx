import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, journalPosts as fallbackPosts } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { JOURNAL_ARTICLE_BY_SLUG_QUERY } from "@/sanity/queries";
import { toJournalPost } from "@/lib/sanity-adapters";

export const revalidate = 60;

async function getArticle(slug: string) {
  try {
    const data = await client.fetch(JOURNAL_ARTICLE_BY_SLUG_QUERY, { slug });
    if (data) {
      return { post: toJournalPost(data), content: data.content as any[] | undefined };
    }
  } catch {
    // fall through to local journal
  }
  const post = getPostBySlug(slug);
  return post ? { post, content: undefined } : null;
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

    return (
        <article className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-xl">
            <header className="max-w-4xl mx-auto text-center space-y-space-md pb-space-lg">
                <div className="flex items-center justify-center gap-space-xs text-secondary font-label-md uppercase tracking-widest">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>
                <h1 className="font-display text-display text-primary leading-[1.12]">
                    {post.title}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                    {post.excerpt}
                </p>
            </header>

            <div className="max-w-5xl mx-auto pb-space-xl">
                <div className="relative bg-surface-container overflow-hidden">
                    <img
                        className="w-full h-[520px] md:h-[640px] object-cover"
                        src={post.image}
                        alt={post.title}
                    />
                </div>
            </div>

            <div className="max-w-[700px] mx-auto space-y-space-lg text-on-surface font-body-md leading-relaxed">
                {content && content.length > 0 ? (
                    <SanityBody content={content} />
                ) : (
                    <>
                        <p className="first-letter:font-display first-letter:text-[64px] first-letter:leading-[52px] first-letter:float-left first-letter:mr-space-sm first-letter:text-primary">
                            There is an ancient cadence to fire that modern life has
                            systematically erased. For millennia, the illumination of flame was an
                            irrevocable transition: the cessation of labor, the gathering of
                            spirits, the softening of spatial perception.
                        </p>
                        <p className="text-on-surface-variant">
                            When an artisan candle is ignited, we are not merely choosing scent;
                            we are consenting to a rhythmic deceleration. The wick demands
                            deliberate attention—it cannot be rushed, automated, or accelerated
                            through algorithmic demand.
                        </p>

                        <div className="my-space-xl py-space-lg px-space-lg bg-surface-container-low">
                            <div className="w-8 h-[2px] bg-secondary mb-space-md" />
                            <blockquote className="font-display text-headline-lg text-primary italic leading-tight">
                                "To light a candle is not merely to scent a space. It is an
                                agreement with yourself that for the next hour, nothing else is
                                required of you."
                            </blockquote>
                            <div className="mt-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                                — Hélène de Saint-Germain
                            </div>
                        </div>

                        <p className="text-on-surface-variant">
                            Unlike visual furnishings that occupy fixed dimensional volumes,
                            fragrance is ambient architecture. It partitions the air without
                            walls, defining the threshold between our professional vigilance and
                            domestic grace.
                        </p>
                    </>
                )}
            </div>
        </article>
    );
}

export async function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}
