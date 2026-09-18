"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";

export function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authTab, setAuthTab } = useCartStore();
  const { isSignedIn } = useUser();

  // Close modal automatically when user successfully signs in
  useEffect(() => {
    if (isSignedIn && isAuthOpen) {
      setIsAuthOpen(false);
    }
  }, [isSignedIn, isAuthOpen, setIsAuthOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthOpen) {
        setIsAuthOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthOpen, setIsAuthOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-primary/20 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative z-10 w-full max-w-[950px] overflow-hidden border border-on-surface-variant/20 bg-surface shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAuthOpen(false)}
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-on-surface-variant/20 bg-surface/80 text-on-surface-variant transition-colors hover:border-on-surface hover:text-on-surface"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Column: Atmospheric imagery */}
          <div className="relative hidden md:col-span-5 md:block h-full min-h-[620px] bg-surface-container">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-8 text-on-primary">
              <span className="text-[10px] uppercase tracking-[0.24em] text-secondary mb-2">
                Oryenna Atelier
              </span>
              <p className="font-headline-sm text-[16px] italic leading-snug text-on-primary">
                &ldquo;The scent fills the room like a quiet mist. It has completely transformed my evening unwind ritual.&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-on-primary/20 pt-3 text-[9px] uppercase tracking-[0.2em] text-on-primary/70">
                <span>Éléonore V.</span>
                <span>Paris, 6e</span>
              </div>
            </div>
          </div>

          {/* Right Column: Styled Clerk Components */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7 max-h-[90vh] overflow-y-auto">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-primary font-medium">
                Sanctuary Member Access
              </span>
              <h2
                id="auth-modal-title"
                className="mt-1 font-headline-md text-[28px] uppercase tracking-[0.06em] text-on-surface"
              >
                Return to Calm.
              </h2>
              <p className="mt-1 text-[13px] text-on-surface-variant">
                Access your personalized order archive, rituals, and private releases.
              </p>

              {/* Tabs */}
              <div className="mt-4 flex border-b border-on-surface-variant/20 text-[11px] uppercase tracking-[0.18em]">
                <button
                  type="button"
                  onClick={() => setAuthTab("signin")}
                  className={`pb-3 font-medium transition-colors ${
                    authTab === "signin"
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("register")}
                  className={`ml-8 pb-3 font-medium transition-colors ${
                    authTab === "register"
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Styled Clerk Widget */}
              <div className="mt-6 flex justify-center">
                {authTab === "signin" ? (
                  <SignIn
                    routing="hash"
                    appearance={{
                      elements: {
                        rootBox: "w-full shadow-none",
                        card: "bg-transparent shadow-none p-0 w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton:
                          "border border-on-surface-variant/30 bg-surface hover:bg-surface-container text-on-surface rounded-none h-11 uppercase tracking-[0.1em] text-[11px]",
                        formButtonPrimary:
                          "bg-primary hover:bg-primary/90 text-on-primary uppercase tracking-[0.18em] text-[11px] h-11 rounded-none",
                        formFieldInput:
                          "bg-surface-container border-on-surface-variant/30 rounded-none text-on-surface h-11 px-4 text-[13px]",
                        formFieldLabel: "text-[10px] uppercase tracking-[0.16em] text-on-surface-variant",
                        footerAction: "hidden",
                        identityAccount: "bg-surface-container border-on-surface-variant/20",
                      },
                    }}
                  />
                ) : (
                  <SignUp
                    routing="hash"
                    appearance={{
                      elements: {
                        rootBox: "w-full shadow-none",
                        card: "bg-transparent shadow-none p-0 w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton:
                          "border border-on-surface-variant/30 bg-surface hover:bg-surface-container text-on-surface rounded-none h-11 uppercase tracking-[0.1em] text-[11px]",
                        formButtonPrimary:
                          "bg-primary hover:bg-primary/90 text-on-primary uppercase tracking-[0.18em] text-[11px] h-11 rounded-none",
                        formFieldInput:
                          "bg-surface-container border-on-surface-variant/30 rounded-none text-on-surface h-11 px-4 text-[13px]",
                        formFieldLabel: "text-[10px] uppercase tracking-[0.16em] text-on-surface-variant",
                        footerAction: "hidden",
                        identityAccount: "bg-surface-container border-on-surface-variant/20",
                      },
                    }}
                  />
                )}
              </div>
            </div>

            {/* Member Perks Checklist */}
            <div className="mt-6 border-t border-on-surface-variant/20 pt-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-on-surface">
                Sanctuary Member Privileges:
              </p>
              <ul className="mt-1.5 space-y-1 text-[11px] text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Curated archive & early private pour access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Complimentary custom 2ml scent vials with every order
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}