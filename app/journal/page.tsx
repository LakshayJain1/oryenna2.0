import Link from "next/link";
import { journalPosts } from "@/lib/journal";

export default function JournalPage() {
    const featured = journalPosts[0];
    const rest = journalPosts.slice(1);

    return (
        <div className="flex flex-col w-full">
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-lg">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-space-sm">
                    <div className="inline-flex items-center gap-space-xs">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                            The Journal · Oryenna Gazette
                        </span>
                    </div>
                    <h1 className="font-display text-display md:text-[68px] text-primary leading-tight font-normal">
                        Words on Cadence, Flame & Fragrance
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant italic max-w-2xl pt-space-xs">
                        "Notes on the unhurried life, the quiet architecture of domestic
                        ritual, and the alchemy of botanical scent."
                    </p>
                </div>
            </section>

            {/* Featured */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-lg">
                <Link
                    href={`/journal/${featured.slug}`}
                    className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-low overflow-hidden group"
                >
                    <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[580px] overflow-hidden">
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                    </div>
                    <div className="lg:col-span-5 p-space-lg md:p-space-xl flex flex-col justify-between bg-surface-container-low">
                        <div className="space-y-space-md">
                            <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-widest">
                                <span>Essay 01</span>
                                <span>•</span>
                                <span>{featured.readTime}</span>
                            </div>
                            <h2 className="font-display text-headline-lg lg:text-[44px] lg:leading-[52px] text-primary font-normal">
                                {featured.title}
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                {featured.excerpt}
                            </p>
                        </div>
                        <div className="pt-space-lg">
                            <span className="inline-flex items-center justify-center h-[52px] px-space-lg bg-primary text-surface font-label-lg text-label-lg uppercase tracking-wider group-hover:bg-primary-container transition-colors duration-300">
                                Read Dispatch
                                <span className="material-symbols-outlined ml-space-xs text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Grid */}
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-lg pb-space-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
                    {rest.map((post) => (
                        <article
                            key={post.slug}
                            className="flex flex-col bg-surface-container-low overflow-hidden group"
                        >
                            <Link
                                href={`/journal/${post.slug}`}
                                className="flex flex-col h-full"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute bottom-space-xs left-space-xs bg-surface/90 px-space-sm py-space-xs font-label-sm text-label-sm text-primary uppercase tracking-wider">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-space-md lg:p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                                    <div className="space-y-space-xs">
                                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                            {post.readTime}
                                        </span>
                                        <h4 className="font-headline-sm text-headline-sm text-primary group-hover:text-tertiary transition-colors duration-300">
                                            {post.title}
                                        </h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="pt-space-xs">
                                        <span className="inline-flex items-center text-primary font-label-sm text-label-sm uppercase tracking-widest">
                                            Read Essay
                                            <span className="material-symbols-outlined text-[14px] ml-1">
                                                arrow_outward
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}