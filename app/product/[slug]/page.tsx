import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries";
import { toLibProduct } from "@/lib/sanity-adapters";
import ProductView from "./product-view";

async function getProduct(slug: string) {
  try {
    const data = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
    if (data) return toLibProduct(data);
  } catch {
    // fall through to local catalogue
  }
  return getProductBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    path: `/product/${product.slug}`,
    title: product.seo?.title || `${product.name} — ${product.scentNumber || "Signature Pour"}`,
    description: product.seo?.description || product.description,
    image: product.image,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductView slug={slug} initialProduct={product} />;
}
