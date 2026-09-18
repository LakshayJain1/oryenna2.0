import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

export const revalidate = 3600; // revalidate sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://oryennaweb.vercel.app";

  // Static pages
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

  // Fetch dynamic slugs from Sanity
  try {
    const data = await client.fetch<{
      products: Array<{ slug: string; _updatedAt?: string }>;
      collections: Array<{ slug: string; _updatedAt?: string }>;
      articles: Array<{ slug: string; _updatedAt?: string }>;
    }>(groq`{
      "products": *[_type == "product" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "collections": *[_type == "collection" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "articles": *[_type == "journalArticle" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
    }`);

    const productUrls = (data?.products || []).map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    const collectionUrls = (data?.collections || []).map((c) => ({
      url: `${baseUrl}/collections/${c.slug}`,
      lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const articleUrls = (data?.articles || []).map((a) => ({
      url: `${baseUrl}/journal/${a.slug}`,
      lastModified: a._updatedAt ? new Date(a._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productUrls, ...collectionUrls, ...articleUrls];
  } catch (err) {
    console.error("Failed to generate dynamic sitemap entries:", err);
    return staticPages;
  }
}
