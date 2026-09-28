import { products } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/shop",
  title: "The Collection — All Vessels & Objects",
  description:
    "Slow seasonal botanical candles hand-poured in mouth-blown glass, unglazed stoneware, and travertine. Shop the Oryenna collection.",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const q = typeof params?.q === "string" ? params.q.trim() : "";
  const needle = q.toLowerCase();
  const visible = needle
    ? products.filter((p) =>
        [p.name, p.notes, p.description, p.scentNumber, p.category]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
    : products;

  return (
    <div className="flex flex-col w-full">
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-lg">
        <Reveal variant="up" className="max-w-4xl space-y-space-sm">
          <div className="flex items-center gap-space-sm text-accent font-label-sm text-label-sm uppercase tracking-widest">
            <span>
              {q ? `Search / “${q}”` : "Collection / Archive Vol. 04"}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-ink tracking-tight">
            {q ? `${visible.length} result${visible.length === 1 ? "" : "s"}` : "The Collection"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {q
              ? "Vessels matching your search across names, notes, and descriptions."
              : "Slow seasonal botanical candles, composed for contemplative and unhurried living."}
          </p>
          {q ? (
            <a
              href="/shop"
              className="inline-flex items-center gap-1 font-label-md text-label-md uppercase tracking-[0.16em] text-ink hover:text-accent transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Clear search</span>
            </a>
          ) : null}
        </Reveal>
      </section>

      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        {visible.length > 0 ? (
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg stagger-fill">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Stagger>
        ) : (
          <div className="max-w-xl mx-auto text-center py-space-lg">
            <p className="font-headline-md text-headline-md text-ink">
              Nothing in the archive matches “{q}”.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Try “amber”, “fig”, “linen”, or “brass”.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
