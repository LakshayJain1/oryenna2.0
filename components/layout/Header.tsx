"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { ClerkAccountTrigger } from "@/components/auth/ClerkAccountTrigger";
import { NAV_LINKS, ANNOUNCEMENT_TEXT } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const { count, openCart, setIsAuthOpen } = useCartStore();
  const links = NAV_LINKS;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Bar */}
      <div className="px-margin-mobile md:px-margin-tablet lg:px-margin h-8 flex items-center justify-center bg-primary text-on-primary text-[10px] uppercase tracking-[0.24em]">
        {ANNOUNCEMENT_TEXT}
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin h-20 flex items-center justify-between border-b border-on-surface-variant/10">
        <div className="flex items-center gap-space-sm">
          <Link href="/" className="flex items-center gap-space-sm group">
            <span className="font-headline-sm text-headline-sm tracking-wide text-primary uppercase select-none">
              Oryenna
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-space-lg" aria-label="Main Navigation">
          {links.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.label}
                href={link.url}
                className={`font-label-lg text-label-lg uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-md">
          <Link
            aria-label="Search the collection"
            href="/shop"
            className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors duration-300 flex items-center"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </Link>
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
          <ClerkAccountTrigger onOpenAuth={() => setIsAuthOpen(true)} />
        </div>
      </div>
    </header>
  );
}