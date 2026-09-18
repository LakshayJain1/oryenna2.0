import Image from "next/image";
import Link from "next/link";

type HeroProps = {
    eyebrow?: string;
    headline?: string;
    tagline?: string;
    subtext?: string;
};

export default function Hero({
    eyebrow = "Atelier de Parfum d'Intérieur",
    headline = "ORYENNA",
    tagline = "Light a calmer you.",
    subtext = "Scents and spaces designed for slower moments. Poured by hand into hand-blown vessels from wild botanicals.",
}: HeroProps) {
    return (
        <section className="relative w-full overflow-hidden bg-surface-container-low min-h-[92vh] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Image
                    alt="Oryenna signature candle seen from directly above surrounded by rippling raw linen and dry olive botanical leaves"
                    className="object-cover object-center scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3zyjgjfRUXUwV4h73FZ3cw6_qOKqZuxz7eFeNKhk49R8CSlpe1K0TV1DDMMfXnxRhH6OMM5Y45XUKSNTcR0j8rutnpO7UM7R6BTw3l6YIl7XVEhKESWc5yzhlv2pxI1B8pIUhzAbaw09Cy0b9SJSz31eqArxHzujVtrARWIa9i80D_3wc7XOPhJBvWqvLHw4xfx7UtRzRR3R2z8M9t_MiyLkE_4RhkpDNV7shMnRYtKrZeam1fc9pog"
                    fill
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/40 to-surface/90 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-32 text-center flex flex-col items-center">
                <div className="inline-flex items-center gap-space-xs mb-space-md">
                    <span className="w-8 h-[1px] bg-outline-variant" />
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary">
                        {eyebrow}
                    </span>
                    <span className="w-8 h-[1px] bg-outline-variant" />
                </div>

                <h1 className="font-display text-display md:text-[72px] md:leading-[80px] text-primary tracking-[0.14em] uppercase mb-space-sm select-none">
                    {headline}
                </h1>
                <p className="font-headline-md text-headline-md italic text-on-surface-variant font-serif max-w-xl mb-space-md">
                    {tagline}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-xl tracking-wide">
                    {subtext}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full sm:w-auto">
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

                <div className="mt-space-xl flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
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