import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/journal";

export default async function JournalArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

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
            </div>
        </article>
    );
}