"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, type Product } from "@/lib/products";
import {
  VESSELS,
  ITEM_GIFT_WRAP_FEE,
  type VesselId,
} from "@/lib/pricing";
import { useCartStore } from "@/lib/cart-store";
import { PortableTextRenderer } from "@/components/portable-text-renderer";
import Accordion from "@/components/ui/Accordion";

// Vessel presentation labels are intentional static UI configuration.
// Prices always come from lib/pricing VESSELS (single source of truth),
// never from hardcoded numbers here.
const VESSEL_META: Record<
  VesselId,
  { name: string; desc: string; spec: string; badge?: string }
> = {
  standard: {
    name: "Standard Mouth-Blown Glass",
    desc: "290g / 10.2 oz · Heavy-base soda lime glassware",
    spec: "65 Hr Slow Burn",
    badge: "Atelier Favorite",
  },
  grand: {
    name: "Grand Hand-Poured Stoneware",
    desc: "450g / 15.8 oz · Textured porous ceramic",
    spec: "100 Hr Double-Wick Burn",
  },
  refill: {
    name: "Botanical Wax Drop-In Refill",
    desc: "290g pillar wrapped in unbleached seed paper",
    spec: "65 Hr Drop-in Burn",
    badge: "Zero-Waste",
  },
};

const VESSEL_ORDER: VesselId[] = ["standard", "grand", "refill"];

export default function ProductView({
  slug,
  initialProduct,
}: {
  slug: string;
  initialProduct?: Product;
}) {
    const product = initialProduct ?? getProductBySlug(slug);
    if (!product) notFound();

    const [vesselId, setVesselId] = useState<VesselId>("standard");
    const [quantity, setQuantity] = useState(1);
    const [gifting, setGifting] = useState(false);
    const { addItem, openCart } = useCartStore();

    const vesselOptions = useMemo(
      () =>
        VESSEL_ORDER.map((id) => ({
          id,
          ...VESSEL_META[id],
          price: VESSELS[id],
        })),
      []
    );
    const vessel =
      vesselOptions.find((v) => v.id === vesselId) ?? vesselOptions[0];

    const unitPrice = vessel.price + (gifting ? ITEM_GIFT_WRAP_FEE : 0);
    const total = unitPrice * quantity;

    // Olfactory pyramid comes from Sanity (product fields, with insider
    // fallback already merged by toLibProduct). No hardcoded notes.
    const pyramid = [
      { tier: "Head", notes: product.topNotes },
      { tier: "Heart", notes: product.heartNotes },
      { tier: "Base", notes: product.baseNotes },
    ].filter((n) => n.notes && n.notes.length > 0);

    const gallery =
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : product.image
          ? [{ url: product.image, alt: product.imageAlt || product.name }]
          : [];

    const handleAdd = () => {
        addItem({
            id: `${product.id}-${vessel.id}`,
            name: `${product.name} — ${vessel.name}`,
            price: unitPrice,
            quantity,
            image: product.image,
            variant: vessel.name,
            giftWrap: gifting,
        });
        openCart();
    };

    return (
        <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-start">
                {/* Gallery — Sanity gallery[] with primary image fallback */}
                <div className="lg:col-span-7 flex flex-col gap-space-md">
                    {gallery.map((img, i) => (
                      <div
                        key={`${img.url}-${i}`}
                        className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden rounded-sm"
                      >
                        <img
                          alt={img.alt || product.name}
                          className="w-full h-full object-cover"
                          src={img.url}
                        />
                        {i === 0 && product.badge ? (
                          <div className="absolute top-space-md left-space-md bg-surface/85 backdrop-blur-md px-space-md py-space-xs rounded-sm">
                            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                              {product.badge}
                            </span>
                          </div>
                        ) : null}
                        {img.caption ? (
                          <div className="absolute bottom-space-md left-space-md right-space-md">
                            <p className="font-body-sm text-body-sm bg-surface/85 backdrop-blur-md px-space-md py-space-xs rounded-sm text-primary">
                              {img.caption}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>

                {/* Product Info */}
                <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
                    <div className="space-y-space-xs">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                            {product.collection?.name || "Signature Composition"}
                        </span>
                        <h1 className="font-headline-lg text-headline-lg text-primary">
                            {product.name}
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant italic">
                            {product.notes}
                        </p>
                        <div className="pt-space-xs flex items-baseline gap-space-md">
                            <span className="font-display-mobile text-display-mobile text-primary font-normal">
                                ${vessel.price}
                            </span>
                            {product.comparePrice && product.comparePrice > vessel.price ? (
                              <span className="font-body-md text-body-md text-on-surface-variant line-through">
                                ${product.comparePrice}
                              </span>
                            ) : null}
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                                USD / {product.weight}
                            </span>
                        </div>
                        {product.sku || product.size ? (
                          <p className="font-label-sm text-[11px] text-on-surface-variant/80 uppercase tracking-wider">
                            {[product.sku, product.size].filter(Boolean).join(" · ")}
                          </p>
                        ) : null}
                    </div>

                    {/* Vessel Selection — prices from lib/pricing */}
                    <div className="space-y-space-sm pt-space-xs">
                        <label className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                            Select Medium &amp; Vessel Form
                        </label>
                        <div className="grid grid-cols-1 gap-space-xs">
                            {vesselOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setVesselId(opt.id)}
                                    className={`w-full p-space-md text-left flex items-center justify-between transition-all duration-300 ${vessel.id === opt.id
                                        ? "ring-1 ring-primary bg-surface-container"
                                        : "bg-surface-container-low hover:bg-surface-container"
                                        }`}
                                    type="button"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-space-xs">
                                            <span className="font-title text-title text-primary">
                                                {opt.name}
                                            </span>
                                            {opt.badge && (
                                                <span className="bg-secondary/15 text-secondary px-space-xs py-0.5 font-label-sm text-[10px] uppercase tracking-wider rounded-sm">
                                                    {opt.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                            {opt.desc}
                                        </p>
                                        <p className="font-label-sm text-[11px] text-on-surface-variant/80">
                                            {opt.spec}
                                        </p>
                                    </div>
                                    <span className="font-label-lg text-label-lg text-primary font-bold ml-space-md shrink-0">
                                        ${opt.price}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Olfactory Pyramid — Sanity only, hidden when empty */}
                    {pyramid.length > 0 ? (
                    <div className="space-y-space-sm bg-surface-container-low p-space-md rounded-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                            Olfactory Note Architecture
                        </span>
                        <div className="space-y-space-sm pt-space-xs">
                            {pyramid.map((note) => (
                                <div key={note.tier} className="flex items-start gap-space-md">
                                    <div className="w-16 shrink-0 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                                        {note.tier}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-body-sm text-body-sm text-primary font-medium">
                                            {note.notes}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    ) : null}

                    {product.accentNotes && product.accentNotes.length > 0 ? (
                      <div className="flex flex-wrap gap-space-xs">
                        {product.accentNotes.map((note) => (
                          <span
                            key={note}
                            className="bg-surface-container-low px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-primary"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Purchasing */}
                    <div className="space-y-space-md pt-space-xs">
                        <div
                            className="p-space-sm bg-surface-container rounded-sm flex items-center justify-between cursor-pointer"
                            onClick={() => setGifting(!gifting)}
                        >
                            <div className="flex items-center gap-space-sm">
                                <div
                                    className={`w-4 h-4 rounded-sm flex items-center justify-center text-primary ring-1 ring-outline ${gifting ? "bg-primary text-surface" : "bg-surface"
                                        }`}
                                >
                                    {gifting && (
                                        <span className="material-symbols-outlined text-[14px]">
                                            check
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className="font-body-sm text-body-sm text-primary font-medium block">
                                        Slow Living Presentation Packaging
                                    </span>
                                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                                        Linen gift box, wax seal, hand-pressed herb card (+ ${ITEM_GIFT_WRAP_FEE})
                                    </span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                                card_giftcard
                            </span>
                        </div>

                        <div className="flex gap-space-sm">
                            <div className="h-[52px] bg-surface-container flex items-center px-space-sm rounded-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors text-lg"
                                    type="button"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center font-title text-title text-primary">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors text-lg"
                                    type="button"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex-1 h-[52px] px-space-lg bg-primary text-surface font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all duration-300 flex items-center justify-between rounded-sm shadow-sm group"
                                type="button"
                            >
                                <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                                    Reserve For Bag
                                </span>
                                <span className="font-medium">${total}</span>
                            </button>
                        </div>
                    </div>

                    {/* Accordions — Sanity longDescription + insider story */}
                    <div className="space-y-space-xs pt-space-md">
                        <Accordion title="Sensory Profile & Atmosphere" defaultOpen>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                {product.description}
                            </p>
                            {product.longDescription && product.longDescription.length > 0 ? (
                              <div className="mt-space-sm">
                                <PortableTextRenderer content={product.longDescription} />
                              </div>
                            ) : null}
                        </Accordion>
                        {product.ingredients && product.ingredients.length > 0 ? (
                        <Accordion title="Botanical Ingredients">
                            <ul className="list-disc pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                {product.ingredients.map((ing) => (
                                  <li key={ing}>{ing}</li>
                                ))}
                            </ul>
                        </Accordion>
                        ) : null}
                        {product.insiderInfo?.provenanceStory ? (
                        <Accordion title="Provenance & Craft">
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                {product.insiderInfo.provenanceStory}
                            </p>
                        </Accordion>
                        ) : null}
                        <Accordion title="The Art of the Burn & Vessel Care">
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Allow the wax to liquefy to the glass rim during the
                                foundational first burn to ensure uniform memory depth.
                                Trim the wick to 5mm before each lighting.
                            </p>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
