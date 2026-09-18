import { products as fallbackProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { PRODUCTS_LIST_QUERY } from "@/sanity/queries";
import { toLibProduct } from "@/lib/sanity-adapters";

export const metadata = pageMetadata({
  path: "/shop",
  title: "The Collection — All Vessels & Objects",
  description:
    "Slow seasonal botanical candles hand-poured in mouth-blown glass, unglazed stoneware, and Roman travertine. Shop the Oryenna collection.",
});

export const revalidate = 60;

export default async function ShopPage() {
  let products = fallbackProducts;
  try {
    const data = await client.fetch(PRODUCTS_LIST_QUERY);
    if (data && data.length > 0) {
      products = data.map(toLibProduct);
    }
  } catch {
    // keep hardcoded fallback
  }

    return (
        <div className="flex flex-col w-full">
            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-space-lg pb-space-lg">
                <div className="max-w-4xl space-y-space-sm">
                    <div className="flex items-center gap-space-sm text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                        <span>Catalogue Vol. IV</span>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>Harvest & Solstice Edition</span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                        The Collection — All Vessels & Objects
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                        Slow seasonal botanical candles hand-poured in mouth-blown glass,
                        unglazed stoneware, and solid Roman travertine. Composed for
                        contemplative and unhurried living.
                    </p>
                </div>
            </section>

            <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>
        </div>
    );
}