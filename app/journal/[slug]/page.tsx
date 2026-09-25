import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { journalPosts, getJournalPostBySlug } from "@/lib/journal-posts";
import { Reveal } from "@/components/ui/Reveal";
import { PortableTextRenderer } from "@/components/portable-text-renderer";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getJournalPostBySlug(slug);
    if (!post) return {};
    return pageMetadata({
      path: `/journal/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      image: post.image,
    });
  });
}

export default async function JournalArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getJournalPostBySlug(slug);
    if (!post) notFound();
    const content = post.content;
    const byline = [post.category, post.readTime].filter(Boolean);

    return (
        <article className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-xl">
            <Reveal variant="up">
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
            </Reveal>

            {post.image ? (
            <Reveal variant="fade">
              <div className="max-w-5xl mx-auto pb-space-xl">
                  <div className="relative bg-surface-container overflow-hidden">
                      <img
                          className="w-full h-[520px] md:h-[640px] object-cover"
                          src={post.image}
                          alt={post.title}
                      />
                  </div>
              </div>
            </Reveal>
            ) : null}

            <div className="max-w-[700px] mx-auto space-y-space-lg text-on-surface font-body-md leading-relaxed">
                {content && content.length > 0 ? (
                    <PortableTextRenderer content={content} />
                ) : null}
                {post.closingNote ? (
                    <p className="text-on-surface-variant">{post.closingNote}</p>
                ) : null}
            </div>
        </article>
    );
}

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}
