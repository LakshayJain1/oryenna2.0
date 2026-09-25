import { products } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/shop",
  title: "The Collection — All Vessels & Objects",
  description:
    "Slow seasonal botanical candles hand-poured in mouth-blown glass, unglazed stoneware, and Roman travertine. Shop the Oryenna collection.",
});

export default function ShopPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-lg">
        <Reveal variant="up" className="max-w-4xl space-y-space-sm">
          <div className="flex items-center gap-space-sm text-secondary font-label-sm text-label-sm uppercase tracking-widest">
            <span>Collection / Archive Vol. 04</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            The Collection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Slow seasonal botanical candles, composed for contemplative and unhurried living.
          </p>
        </Reveal>
      </section>

      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg stagger-fill">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Stagger>
      </section>
    </div>
  );
}
