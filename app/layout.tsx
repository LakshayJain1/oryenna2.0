import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientChrome from "@/components/layout/ClientChrome";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";
import { client } from "@/sanity/client";
import { NAVBAR_QUERY } from "@/sanity/queries_footer_navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ORYENNA — Fine Fragrance & Slow Living",
    template: "%s | ORYENNA",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "luxury candles",
    "botanical candles",
    "hand-poured candles",
    "slow living",
    "home fragrance",
    "Oryenna",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "ORYENNA — Fine Fragrance & Slow Living",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ORYENNA — Fine Fragrance & Slow Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORYENNA — Fine Fragrance & Slow Living",
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation content is fetched server-side so the client bundle
  // never ships the Sanity client for the header.
  let navLinks: Array<{ label: string; url: string }> | undefined;
  let announcementText: string | undefined;
  try {
    const data = await client.fetch(NAVBAR_QUERY);
    if (data?.navLinks?.length > 0) navLinks = data.navLinks;
    if (data?.announcementText) announcementText = data.announcementText;
  } catch {
    // Header falls back to local links.
  }

  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSans.variable} ${garamond.variable}`}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..24,400..700,0..1&display=swap"
          />
        </head>
        <body className="bg-surface font-body-md text-body-md text-on-surface antialiased">
          <Header navLinks={navLinks} announcementText={announcementText} />
          <main className="w-full pt-20 bg-surface min-h-screen">{children}</main>
          <Footer />
          <ClientChrome />
        </body>
      </html>
    </ClerkProvider>
  );
}