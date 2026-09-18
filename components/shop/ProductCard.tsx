import Link from "next/link";
import { Product } from "@/lib/products";
import AddToBagButton from "./AddToBagButton";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="group relative flex flex-col bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-500">
            <div className="relative w-full aspect-[3/4] bg-surface-container-high overflow-hidden">
                <Link href={`/product/${product.slug}`}>
                    <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        src={product.image}
                    />
                </Link>

                {product.badge && (
                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 z-10">
                        <span className="bg-primary text-surface px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-widest">
                            {product.badge}
                        </span>
                    </div>
                )}

                <button
                    aria-label="Save to curated list"
                    className="absolute top-space-sm right-space-sm w-9 h-9 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        favorite
                    </span>
                </button>

                <div className="absolute inset-x-0 bottom-0 p-space-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-primary/80 to-transparent">
                    <AddToBagButton
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                </div>
            </div>

            <div className="p-space-md flex flex-col flex-1 justify-between bg-surface-container-lowest">
                <div className="space-y-space-xs">
                    <div className="flex items-baseline justify-between">
                        <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-tertiary-container transition-colors">
                            <Link href={`/product/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <span className="font-title text-title text-primary font-medium">
                            ${product.price}
                        </span>
                    </div>
                    <p className="font-label-md text-label-md uppercase text-secondary tracking-widest">
                        {product.notes}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed pt-1 line-clamp-2">
                        {product.description}
                    </p>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant/80">
                    <span>
                        {product.weight} • {product.burnTime}
                    </span>
                    <Link
                        href={`/product/${product.slug}`}
                        className="text-primary font-medium flex items-center gap-1 hover:underline"
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