import Image from "next/image";
import Link from "next/link";

type HeroProps = {
    eyebrow?: string;
    headline?: string;
    tagline?: string;
    subtext?: string;
    imageUrl?: string;
    imageAlt?: string;
};

// Default hero background (self-hosted).
const FALLBACK_HERO_IMAGE = "/images/hero-linen.jpg";

export default function Hero({
    eyebrow = "Atelier de Parfum d'Intérieur",
    headline = "ORYENNA",
    tagline = "Light a calmer you.",
    subtext = "Scents and spaces designed for slower moments. Poured by hand into hand-blown vessels from wild botanicals.",
    imageUrl,
    imageAlt,
}: HeroProps) {
    return (
        <section className="relative w-full overflow-hidden bg-surface-container-low min-h-[92vh] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Image
                    alt={
                        imageAlt ||
                        "Oryenna signature candle seen from directly above surrounded by rippling raw linen and dry olive botanical leaves"
                    }
                    className="object-cover object-center scale-105"
                    src={imageUrl || FALLBACK_HERO_IMAGE}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/40 to-surface/90 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-32 text-center flex flex-col items-center">
                <div className="hero-enter inline-flex items-center gap-space-xs mb-space-md" style={{ animationDelay: "50ms" }}>
                    <span className="w-8 h-[1px] bg-outline-variant" />
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary">
                        {eyebrow}
                    </span>
                    <span className="w-8 h-[1px] bg-outline-variant" />
                </div>

                <h1 className="hero-enter font-display text-display md:text-[72px] md:leading-[80px] text-primary tracking-[0.14em] uppercase mb-space-sm select-none" style={{ animationDelay: "150ms" }}>
                    {headline}
                </h1>
                <p className="hero-enter font-headline-md text-headline-md italic text-on-surface-variant font-serif max-w-xl mb-space-md" style={{ animationDelay: "260ms" }}>
                    {tagline}
                </p>
                <p className="hero-enter font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-xl tracking-wide" style={{ animationDelay: "340ms" }}>
                    {subtext}
                </p>

                <div className="hero-enter flex flex-col sm:flex-row items-center justify-center gap-space-md w-full sm:w-auto" style={{ animationDelay: "430ms" }}>
                    <Link
                        href="/shop"
                        className="w-full sm:w-auto h-[52px] px-10 inline-flex items-center justify-center bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.16em] hover:bg-primary-container transition-colors shadow-sm"
                    >
                        Shop Candles
                    </Link>
                    <Link
                        href="/about"
                        className="w-full sm:w-auto h-[52px] px-10 inline-flex items-center justify-center bg-surface-container/60 hover:bg-surface-container text-primary font-label-lg text-label-lg uppercase tracking-[0.16em] backdrop-blur-sm transition-colors"
                    >
                        Discover Oryenna
                    </Link>
                </div>

                <div className="hero-enter mt-space-xl flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity" style={{ animationDelay: "550ms" }}>
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-outline">
                        Scroll to inhabit
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-primary animate-bounce">
                        south
                    </span>
                </div>
            </div>
        </section>
    );
}