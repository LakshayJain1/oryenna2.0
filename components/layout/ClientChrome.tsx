"use client";

import dynamic from "next/dynamic";

// Deferred below-the-interaction: the cart drawer and Clerk's
// SignIn/SignUp UI load on demand instead of in the initial bundle.
// Both render null until opened, so server HTML is unchanged.
const CartDrawer = dynamic(
  () => import("@/components/layout/CartDrawer").then((m) => m.default),
  { ssr: false }
);
const AuthModal = dynamic(
  () => import("@/components/auth/AuthModal").then((m) => m.AuthModal),
  { ssr: false }
);

export default function ClientChrome() {
  return (
    <>
      <CartDrawer />
      <AuthModal />
    </>
  );
}
