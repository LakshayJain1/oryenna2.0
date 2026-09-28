// Server-only order pricing. Resolves client-supplied cart lines against
// the trusted local catalogue and recomputes the chargeable total.
// Never trusts client-supplied prices or totals.

import { products, type Product } from "@/lib/products";
import {
  toMinor,
  MAX_ORDER_MINOR,
  type CurrencyCode,
  VESSEL_IDS,
  vesselPrice,
  feeFor,
  computeTotals,
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
  currency?: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

async function loadCatalogue(): Promise<Product[]> {
  return products;
}

function resolveUnit(
  cartId: string,
  gift: boolean,
  catalogue: Product[],
  code: CurrencyCode
): number | null {
  const giftFee = feeFor("gift", code);
  // Product-page adds carry a vessel suffix: "<productId>-<vessel>".
  for (const vessel of VESSEL_IDS) {
    const suffix = `-${vessel}`;
    if (cartId.endsWith(suffix)) {
      const baseId = cartId.slice(0, -suffix.length);
      const base = catalogue.find((p) => p.id === baseId);
      if (!base) return null;
      return vesselPrice(vessel, code) + (gift ? giftFee : 0);
    }
  }
  // Shop adds carry the plain catalogue id — price comes from catalogue.
  const product = catalogue.find((p) => p.id === cartId);
  if (!product) return null;
  return code === "INR" ? (product.priceINR ?? product.price) : product.price;
}

/**
 * Validate client lines and recompute the Razorpay minor-unit amount in
 * the order currency. Catalogue numbers are prices in the shown currency
 * ($78 in Europe, ₹78 in India). Throws on any invalid input.
 */
export async function priceOrder(input: OrderInput) {
  const { lines, giftWrap, shipping, currency } = input;

  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) {
    throw new Error("Invalid cart lines.");
  }
  if (typeof giftWrap !== "boolean") {
    throw new Error("Invalid gift option.");
  }
  if (shipping !== "slow" && shipping !== "express") {
    throw new Error("Invalid shipping option.");
  }
  const code: CurrencyCode = currency === "USD" ? "USD" : "INR";

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
    const unit = resolveUnit(id, giftFlag, catalogue, code);
    if (unit === null || unit <= 0) {
      throw new Error("Unknown catalogue item.");
    }
    return { unitUsd: unit, qty: qty as number };
  });

  const totals = computeTotals(
    priced,
    {
      keepsake: giftWrap,
      express: shipping === "express",
    },
    code
  );

  const minor = toMinor(totals.totalUsd, code);
  if (!Number.isFinite(minor) || minor <= 0) {
    throw new Error("Invalid order total.");
  }
  if (minor > MAX_ORDER_MINOR[code]) {
    throw new Error("Order total exceeds the allowed maximum.");
  }
  return { ...totals, currency: code, minor };
}
