import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/account",
  title: "Sanctuary Member Account",
  description: "Your Oryenna order archive, rituals, and private releases.",
  noindex: true,
});

export const revalidate = 60;

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
