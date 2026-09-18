import type { Metadata } from "next";

export const SITE_URL = "https://oryennaweb.vercel.app";

export const SITE_NAME = "ORYENNA";

export const DEFAULT_DESCRIPTION =
  "Hand-poured botanical candles and slow living objects. Crafted for contemplative spaces.";

type PageMetadataOptions = {
  path: string;
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
};

export function pageMetadata({
  path,
  title,
  description = DEFAULT_DESCRIPTION,
  image = "/opengraph-image",
  noindex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
