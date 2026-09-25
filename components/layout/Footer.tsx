import Link from "next/link";
import { FOOTER_COLUMNS, COPYRIGHT_TEXT, BRAND_TAGLINE } from "@/lib/site";

export default function Footer() {
    const footerColumns = FOOTER_COLUMNS;

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
                            {BRAND_TAGLINE}
                        </p>
                        {/* Newsletter provider is not connected yet — link to
                            Contact instead of faking a signup. */}
                        <div className="flex flex-col gap-space-xs pt-space-xs max-w-md">
                            <Link
                                href="/contact"
                                className="h-[52px] px-space-lg bg-primary-container text-surface font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary transition-colors duration-300 inline-flex items-center justify-center"
                            >
                                Request the Gazette via Contact
                            </Link>
                            <p className="font-body-sm text-body-sm text-on-surface-variant/80">
                                Gazette subscriptions are handled through the
                                atelier until the newsletter provider is
                                connected.
                            </p>
                        </div>
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
                        {COPYRIGHT_TEXT}
                    </div>
                    <div className="flex items-center gap-space-md font-label-sm text-label-sm uppercase tracking-wider">
                        <Link
                            href="/terms"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Terms
                        </Link>
                        <span className="text-on-surface-variant/40">•</span>
                        <Link
                            href="/privacy-policy"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Privacy
                        </Link>
                        <span className="text-on-surface-variant/40">•</span>
                        <Link
                            href="/shipping"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Shipping
                        </Link>
                        <span className="text-on-surface-variant/40">•</span>
                        <Link
                            href="/returns"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Returns
                        </Link>
                        <span className="text-on-surface-variant/40">•</span>
                        <Link
                            href="/contact"
                            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}