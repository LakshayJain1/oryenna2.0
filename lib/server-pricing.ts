// Server-only order pricing. Resolves client-supplied cart lines against
// the trusted local catalogue and recomputes the chargeable total.
// Never trusts client-supplied prices or totals.

import { products, type Product } from "@/lib/products";
import {
  VESSELS,
  VESSEL_IDS,
  ITEM_GIFT_WRAP_FEE,
  computeTotals,
  MAX_ORDER_PAISE,
} from "@/lib/pricing";

export type CartLineInput = {
  id: unknown;
  qty: unknown;
  gift?: unknown;
};

export type OrderInput = {
  lines: unknown;
  giftWrap: unknown;
  shipping: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

async function loadCatalogue(): Promise<Product[]> {
  return products;
}

function resolveUnitUsd(
  cartId: string,
  gift: boolean,
  catalogue: Product[]
): number | null {
  // Product-page adds carry a vessel suffix: "<productId>-<vessel>".
  for (const vessel of VESSEL_IDS) {
    const suffix = `-${vessel}`;
    if (cartId.endsWith(suffix)) {
      const baseId = cartId.slice(0, -suffix.length);
      const base = catalogue.find((p) => p.id === baseId);
      if (!base) return null;
      return VESSELS[vessel] + (gift ? ITEM_GIFT_WRAP_FEE : 0);
    }
  }
  // Shop adds carry the plain catalogue id — price comes from catalogue.
  const product = catalogue.find((p) => p.id === cartId);
  return product ? product.price : null;
}

/**
 * Validate client lines and recompute the Razorpay paise amount.
 * Throws an Error describing the problem for any invalid input.
 */
export async function priceOrder(input: OrderInput) {
  const { lines, giftWrap, shipping } = input;

  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) {
    throw new Error("Invalid cart lines.");
  }
  if (typeof giftWrap !== "boolean") {
    throw new Error("Invalid gift option.");
  }
  if (shipping !== "slow" && shipping !== "express") {
    throw new Error("Invalid shipping option.");
  }

  const catalogue = await loadCatalogue();
  const priced = (lines as CartLineInput[]).map((line) => {
    if (!isRecord(line)) throw new Error("Invalid cart line.");
    const { id, qty, gift } = line;
    if (typeof id !== "string" || id.length === 0 || id.length > 160) {
      throw new Error("Invalid item id.");
    }
    if (!Number.isInteger(qty) || (qty as number) < 1 || (qty as number) > 99) {
      throw new Error("Invalid item quantity.");
    }
    const giftFlag = gift === undefined ? false : gift;
    if (typeof giftFlag !== "boolean") throw new Error("Invalid gift flag.");
    const unitUsd = resolveUnitUsd(id, giftFlag, catalogue);
    if (unitUsd === null || unitUsd <= 0) {
      throw new Error("Unknown catalogue item.");
    }
    return { unitUsd, qty: qty as number };
  });

  const totals = computeTotals(priced, {
    keepsake: giftWrap,
    express: shipping === "express",
  });

  if (!Number.isFinite(totals.paise) || totals.paise <= 0) {
    throw new Error("Invalid order total.");
  }
  if (totals.paise > MAX_ORDER_PAISE) {
    throw new Error("Order total exceeds the allowed maximum.");
  }
  return totals;
}
