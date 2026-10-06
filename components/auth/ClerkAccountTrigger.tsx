'use client';

import Link from "next/link";
import { useAuth, useUser } from '@clerk/nextjs';

export function ClerkAccountTrigger({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (isSignedIn) {
    // Signed in — the account tab always opens the member page, where
    // order history, saved addresses, details, and sign-out live.
    return (
      <Link
        href="/account"
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-on-surface"
        aria-label="Open your account"
      >
        <span className="hidden sm:inline">Account</span>
        <div className="flex size-7 items-center justify-center rounded-full border border-on-surface-variant/30 bg-surface-container hover:border-on-surface overflow-hidden">
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt="" className="size-7 object-cover" />
          ) : (
            <span className="material-symbols-outlined text-[16px] opacity-70">person</span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpenAuth}
      className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-on-surface"
    >
      <span className="hidden sm:inline">Account</span>
      <div className="flex size-7 items-center justify-center rounded-full border border-on-surface-variant/30 bg-surface-container hover:border-on-surface">
        <span className="material-symbols-outlined text-[16px] opacity-70">person</span>
      </div>
    </button>
  );
}
