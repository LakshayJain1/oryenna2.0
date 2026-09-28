// Shared, server-authoritative pricing. Pure functions + constants only —
// safe to import from both client components (display) and API routes
// (verification). The API routes recompute from these so a client can
// never dictate what gets charged.

export const VESSELS = {
  standard: 78,
  grand: 118,
  refill: 52,
} as const;

/** Region-variable vessel prices for India (edit to taste). */
export const VESSELS_INR = {
  standard: 2400,
  grand: 3600,
  refill: 1600,
} as const;

export type VesselId = keyof typeof VESSELS;

export const VESSEL_IDS = Object.keys(VESSELS) as VesselId[];

export function vesselPrice(id: VesselId, currency: CurrencyCode): number {
  return currency === "INR" ? VESSELS_INR[id] : VESSELS[id];
}

export const ITEM_GIFT_WRAP_FEE = 14;
export const KEEPSAKE_FEE = 14;
export const STRIKER_FEE = 4;
export const EXPRESS_SHIPPING_FEE = 18;

/** Region-variable fees for India (edit to taste). */
export const FEES_INR = {
  gift: 499,
  keepsake: 499,
  striker: 149,
  express: 599,
} as const;

export function feeFor(
  kind: keyof typeof FEES_INR,
  currency: CurrencyCode
): number {
  if (currency === "INR") return FEES_INR[kind];
  if (kind === "gift" || kind === "keepsake") return KEEPSAKE_FEE;
  if (kind === "striker") return STRIKER_FEE;
  return EXPRESS_SHIPPING_FEE;
}

export const TAX_RATE = 0.087;
export const USD_TO_INR = 83;

export type CurrencyCode = "INR" | "USD";

/** Hard ceiling per order, in minor units: ₹5,00,000 / $6,025. */
export const MAX_ORDER_MINOR: Record<CurrencyCode, number> = {
  INR: 500000 * 100,
  USD: 6025 * 100,
};

/** Allowed drift between recomputed and Razorpay-reported amounts. */
export const AMOUNT_TOLERANCE_MINOR = 100;

/** Catalogue numbers are prices in the shown currency ($78 / ₹78).
 * Convert an order total to Razorpay minor units (paise / cents). */
export function toMinor(total: number, currency: CurrencyCode): number {
  if (currency === "INR") return Math.round(total) * 100;
  return Math.round(total * 100);
}

export function formatTotal(total: number, currency: CurrencyCode): string {
  if (currency === "INR") return `₹${Math.round(total).toLocaleString("en-IN")}`;
  return `$${total.toFixed(2)}`;
}

type CatalogueEntry = {
  id: string;
  price: number;
  priceINR?: number;
};

/**
 * Resolve both region prices for a cart line id (display only —
 * charging always re-resolves server-side). Falls back to the stored
 * unit price when the catalogue entry is gone.
 */
export function unitPrices(
  cartId: string,
  gift: boolean,
  catalogue: CatalogueEntry[],
  storedUnit: number
): { usd: number; inr: number } {
  for (const vessel of VESSEL_IDS) {
    const suffix = `-${vessel}`;
    if (cartId.endsWith(suffix)) {
      const base = catalogue.find((p) => p.id === cartId.slice(0, -suffix.length));
      if (!base) return { usd: storedUnit, inr: storedUnit };
      return {
        usd: VESSELS[vessel] + (gift ? ITEM_GIFT_WRAP_FEE : 0),
        inr: VESSELS_INR[vessel] + (gift ? FEES_INR.gift : 0),
      };
    }
  }
  const product = catalogue.find((p) => p.id === cartId);
  if (!product) return { usd: storedUnit, inr: storedUnit };
  return { usd: product.price, inr: product.priceINR ?? product.price };
}

export type PricedLine = {
  unitUsd: number;
  qty: number;
};

export type OrderOptions = {
  /** Keepsake linen box selected at checkout. */
  keepsake: boolean;
  /** Priority express shipping selected at checkout. */
  express: boolean;
};

export function computeTotals(
  lines: PricedLine[],
  opts: OrderOptions,
  currency: CurrencyCode = "USD"
) {
  const subtotal = lines.reduce((sum, l) => sum + l.unitUsd * l.qty, 0);
  const giftFee = opts.keepsake ? feeFor("keepsake", currency) : 0;
  const shippingFee = opts.express ? feeFor("express", currency) : 0;
  const strikerFee = feeFor("striker", currency);
  const tax = (subtotal + giftFee + shippingFee) * TAX_RATE;
  const totalUsd = subtotal + giftFee + shippingFee + tax + strikerFee;
  const totalInr = Math.round(totalUsd * USD_TO_INR);
  return {
    subtotal,
    giftFee,
    shippingFee,
    tax,
    totalUsd,
    totalInr,
    paise: totalInr * 100,
  };
}
