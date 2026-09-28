"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { useCurrency } from "@/context/CurrencyContext";
import AddToBagButton from "./AddToBagButton";

export default function ProductCard({ product }: { product: Product }) {
    const { format } = useCurrency();
    return (
        <article className="pressable group relative flex flex-col bg-surface-container-lowest rounded-[1.5rem] shadow-[0_2px_12px_-2px_rgba(52,37,26,0.08)] hover:shadow-[0_20px_44px_-12px_rgba(52,37,26,0.22)] hover:-translate-y-1 transition-all duration-500 ease-out overflow-hidden h-full">
            <div className="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden rounded-t-[1.5rem]">
                <Link href={`/product/${product.slug}`} aria-label={product.name}>
                    <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        src={product.image}
                        loading="lazy"
                        decoding="async"
                    />
                </Link>

                {product.badge && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        <span className="bg-primary/90 backdrop-blur-sm text-on-primary px-3 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-widest">
                            {product.badge}
                        </span>
                    </div>
                )}

                <button
                    aria-label="Save to curated list"
                    className="absolute top-3 right-3 w-9 h-9 bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface-variant hover:text-ink hover:bg-surface transition-colors"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        favorite
                    </span>
                </button>

                <div className="absolute inset-x-3 bottom-3 translate-y-[130%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <AddToBagButton
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="space-y-space-xs">
                    <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-ink group-hover:text-tertiary-container transition-colors">
                            <Link href={`/product/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <span className="font-title text-title text-ink font-medium shrink-0 bg-surface-container px-3 py-1 rounded-full">
                            {format(product.price, product.priceINR)}
                        </span>
                    </div>
                    <p className="font-label-md text-label-md uppercase text-accent tracking-widest">
                        {product.notes}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed pt-1 line-clamp-2">
                        {product.description}
                    </p>
                </div>
                <div className="mt-4 pt-4 border-t border-on-surface-variant/10 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant/80">
                    <span>
                        {product.weight} • {product.burnTime}
                    </span>
                    <Link
                        href={`/product/${product.slug}`}
                        className="text-ink font-medium flex items-center gap-1 pl-3 pr-1 py-1 rounded-full hover:bg-surface-container transition-colors"
                    >
                        View Notes{" "}
                        <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
