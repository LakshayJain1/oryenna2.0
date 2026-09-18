import Link from "next/link";
import { client } from "@/sanity/client";
import { FOOTER_QUERY } from "@/sanity/queries_footer_navbar";
import { toFooterColumns } from "@/lib/sanity-adapters";

const FALLBACK_FOOTER_COLUMNS = [
    {
        title: "Collections",
        links: [
            { label: "Scented Vessels", href: "/shop" },
            { label: "Atmospheric Mists", href: "/shop" },
            { label: "Raw Botanical Extrait", href: "/shop" },
            { label: "Brass Wick Cutters", href: "/shop" },
            { label: "Ceramic Trays", href: "/shop" },
        ],
    },
    {
        title: "Living Rituals",
        links: [
            { label: "Wax & Wick Care", href: "/concierge" },
            { label: "The Art of the Burn", href: "/journal/the-art-of-slowing-down" },
            { label: "Vessel Repurposing", href: "/journal" },
            { label: "Member Sanctuary", href: "/account" },
        ],
    },
    {
        title: "Atelier",
        links: [
            { label: "Grasse & Kyoto Origin", href: "/about" },
            { label: "Atelier Inquiries", href: "/concierge" },
            { label: "Concierge Support", href: "/concierge" },
            { label: "Care & Sustainability", href: "/about" },
        ],
    },
];

export default async function Footer() {
    let footerColumns = FALLBACK_FOOTER_COLUMNS;
    let copyrightText =
        "© 2025 ORYENNA Parfums & Bougies. Crafted for contemplative spaces.";
    try {
        const data = await client.fetch(FOOTER_QUERY);
        const mapped = toFooterColumns(data?.footerColumns);
        if (mapped) footerColumns = mapped;
        if (data?.copyrightText) copyrightText = data.copyrightText;
    } catch {
        // keep hardcoded fallback
    }

    return (
        <footer className="w-full bg-surface-container-low">
            <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-xl pb-space-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter lg:gap-space-lg mb-space-xl">
                    <div className="lg:col-span-5 space-y-space-md">
                        <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary">
                            Olfactory Gazette
                        </span>
                        <h3 className="font-headline-md text-headline-md text-primary">
                            An Invitation to Slow Down
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                            Receive sensory vignettes, private atelier batch release notices,
                            and quiet reflections on spatial fragrance architecture.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-space-sm pt-space-xs max-w-md">
                            <input
                                className="flex-1 bg-surface-container px-space-md py-space-sm font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-surface-container-high transition-colors duration-300"
                                placeholder="Your email address"
                                type="email"
                            />
                            <button
                                className="h-[52px] px-space-lg bg-primary-container text-surface font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary transition-colors duration-300 flex items-center justify-center"
                                type="button"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {footerColumns.map((col) => (
                        <div
                            key={col.title}
                            className="lg:col-span-2 space-y-space-sm"
                        >
                            <h4 className="font-label-md text-label-md uppercase text-primary tracking-widest">
                                {col.title}
                            </h4>
                            <ul className="space-y-space-xs">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-space-lg gap-space-md text-on-surface-variant">
                    <div className="font-body-sm text-body-sm">
                        {copyrightText}
                    </div>
                    <div className="flex items-center gap-space-md font-label-sm text-label-sm uppercase tracking-wider">
                        <Link
                            href="/concierge"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            House Terms & Privacy
                        </Link>
                        <span className="text-on-surface-variant/40">•</span>
                        <Link
                            href="/concierge"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Shipping Rituals
                        </Link>
                        <span className="text-on-surface-variant/40">•</span>
                        <Link
                            href="/concierge"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Direct Dialogue
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}