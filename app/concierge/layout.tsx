import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/concierge",
  title: "Concierge · Scent Guidance",
  description:
    "Personal scent guidance from the Oryenna atelier — find the pour that matches your mood and space.",
});

export const revalidate = 60;

export default function ConciergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
