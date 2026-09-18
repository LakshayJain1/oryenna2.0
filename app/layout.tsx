import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { AuthModal } from "@/components/auth/AuthModal";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSans.variable} ${garamond.variable}`}>
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        </head>
        <body className="bg-surface font-body-md text-body-md text-on-surface antialiased">
          <Header />
          <main className="w-full pt-20 bg-surface min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <AuthModal />
        </body>
      </html>
    </ClerkProvider>
  );
}