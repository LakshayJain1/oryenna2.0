import { products } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
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