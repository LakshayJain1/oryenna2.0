import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/checkout",
  title: "Checkout",
  description: "Complete your considered Oryenna purchase with secure checkout.",
  noindex: true,
});

export const revalidate = 60;

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
