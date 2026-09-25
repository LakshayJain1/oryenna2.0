import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import ProductView from "./product-view";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const product = getProductBySlug(slug);
    if (!product) return {};
    return pageMetadata({
      path: `/product/${product.slug}`,
      title: product.seo?.title || `${product.name} — ${product.scentNumber || "Signature Pour"}`,
      description: product.seo?.description || product.description,
      image: product.image,
    });
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductView slug={slug} initialProduct={product} />;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
