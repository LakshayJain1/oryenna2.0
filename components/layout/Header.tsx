"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

const navItems = [
    { label: "Shop", href: "/shop" },
    { label: "Discover", href: "/#discover" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Concierge", href: "/concierge" },
];

export default function Header() {
    const pathname = usePathname();
    const { count, openCart } = useCartStore();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin h-20 flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                    <Link href="/" className="flex items-center gap-space-sm group">
                        <span className="font-headline-sm text-headline-sm tracking-wide text-primary uppercase select-none">
                            Oryenna
                        </span>
                    </Link>
                </div>

                <nav className="hidden lg:flex items-center gap-space-lg">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`font-label-lg text-label-lg uppercase transition-colors duration-300 ${isActive
                                        ? "text-primary font-bold"
                                        : "text-on-surface-variant hover:text-on-surface"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-space-md">
                    <button
                        aria-label="Search"
                        className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors duration-300 flex items-center"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </button>
                    <button
                        aria-label="Bag"
                        onClick={openCart}
                        className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors duration-300 flex items-center relative"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            shopping_bag
                        </span>
                        {count() > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-surface rounded-full flex items-center justify-center font-label-sm text-label-sm leading-none">
                                {count()}
                            </span>
                        )}
                    </button>
                    <Link
                        href="/account"
                        aria-label="Sanctuary Member Account"
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs hover:bg-primary-container transition-colors duration-300"
                    >
                        <span className="material-symbols-outlined text-on-primary text-[18px]">
                            person
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}