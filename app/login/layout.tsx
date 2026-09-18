import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/login",
  title: "Sign In",
  description: "Sign in to your Oryenna sanctuary member account.",
  noindex: true,
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
