import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { products } from "@/lib/products";
import { journalPosts } from "@/lib/journal-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticPages = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/journal",
    "/shipping",
    "/returns",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const articleUrls = journalPosts.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productUrls, ...articleUrls];
}
