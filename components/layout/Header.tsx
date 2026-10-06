"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { ClerkAccountTrigger } from "@/components/auth/ClerkAccountTrigger";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Gallery", url: "/shop" },
  { label: "About", url: "/about" },
  { label: "FAQ", url: "/faq" },
  { label: "Journal", url: "/journal" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart, setIsAuthOpen } = useCartStore();
  const links = NAV_LINKS;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { 
    setIsExpanded(false); 
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname]);

  return (
    <header
      id="main-header"
      aria-label="Site navigation"
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        height: 64,
        // Dynamic width based on expansion state
        width: isMobile ? "calc(100% - 32px)" : (isExpanded ? "auto" : "auto"),
        minWidth: isMobile ? "auto" : (isExpanded ? "600px" : "200px"),
        maxWidth: "1200px",
        padding: "0 24px",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderRadius: "9999px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        border: "1px solid rgba(255,255,255,0.4)",
        transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        gap: isExpanded ? 32 : 16,
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Oryenna — Home"
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src="/images/oryenna-logo.jpg"
          alt="Oryenna logo"
          fill
          sizes="40px"
          style={{ objectFit: "cover" }}
          priority
        />
      </Link>

      {/* Nav links - Fixed Expansion Logic */}
      <nav
        aria-label="Main Navigation"
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: isMobile ? 12 : 24,
          overflow: "hidden",
          // Use max-width for smooth transition instead of width: auto
          maxWidth: isExpanded ? "800px" : "0px",
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? "translateX(0)" : "translateX(-20px)",
          transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isExpanded ? "auto" : "none",
          whiteSpace: "nowrap",
          flexShrink: 0
        }}
      >
        {links.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.label}
              href={link.url}
              style={{
                fontFamily: "var(--font-garamond), serif",
                fontSize: isMobile ? 11 : 13,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: isActive ? "#000000" : "#888888",
                textDecoration: "none",
                position: "relative",
                transition: "color 300ms ease",
                flexShrink: 0,
                padding: "0 4px"
              }}
            >
              {link.label}
              {isActive && (
                <span style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "#000",
                  transition: "all 300ms ease"
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Action Group */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        marginLeft: "auto",
        flexShrink: 0
      }}>
        {/* Mobile Menu Toggle */}
        {isMobile && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {isExpanded ? "close" : "menu"}
            </span>
          </button>
        )}

        <button
          aria-label="Open shopping bag"
          onClick={openCart}
          type="button"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666666",
            cursor: "pointer",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.1)";
            e.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.05)";
            e.currentTarget.style.color = "#666666";
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>shopping_bag</span>
          {count() > 0 && (
            <span
              style={{
                position: "absolute", top: 2, right: 2,
                width: 14, height: 14, borderRadius: "50%",
                background: "#000000", color: "#ffffff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, fontWeight: 700,
              }}>
                {count()}
              </span>
          )}
        </button>
        <ClerkAccountTrigger onOpenAuth={() => setIsAuthOpen(true)} />
      </div>
    </header>
  );
}