"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "oryenna-wishlist";

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export default function WishlistButton({ id, name }: { id: string; name: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readWishlist().includes(id));
  }, [id]);

  const toggle = () => {
    const list = readWishlist();
    const next = list.includes(id)
      ? list.filter((v) => v !== id)
      : [...list, id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // private mode — session-only wishlist
    }
    setSaved(next.includes(id));
    window.dispatchEvent(new CustomEvent("oryenna:wishlist", { detail: next }));
  };

  return (
    <button
      aria-label={saved ? `Remove ${name} from curated list` : `Save ${name} to curated list`}
      aria-pressed={saved}
      onClick={toggle}
      type="button"
      className={`pressable absolute top-3 right-3 w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center transition-colors ${
        saved
          ? "bg-primary text-on-primary"
          : "bg-surface/80 text-on-surface-variant hover:text-primary hover:bg-surface"
      }`}
    >
      <span
        className="material-symbols-outlined text-[18px]"
        style={saved ? { fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" } : undefined}
      >
        favorite
      </span>
    </button>
  );
}
