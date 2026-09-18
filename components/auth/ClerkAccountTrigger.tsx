'use client';

import { useAuth, UserButton } from '@clerk/nextjs';

export function ClerkAccountTrigger({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-[11px] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-on-surface sm:inline">
          Account
        </span>
        <UserButton />
      </div>
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