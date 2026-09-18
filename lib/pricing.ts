// Shared, server-authoritative pricing. Pure functions + constants only —
// safe to import from both client components (display) and API routes
// (verification). The API routes recompute from these so a client can
// never dictate what gets charged.

export const VESSELS = {
  standard: 78,
  grand: 118,
  refill: 52,
} as const;

export type VesselId = keyof typeof VESSELS;

export const VESSEL_IDS = Object.keys(VESSELS) as VesselId[];

export const ITEM_GIFT_WRAP_FEE = 14;
export const KEEPSAKE_FEE = 14;
export const STRIKER_FEE = 4;
export const EXPRESS_SHIPPING_FEE = 18;
export const TAX_RATE = 0.087;
export const USD_TO_INR = 83;

/** Hard ceiling per order: ₹5,00,000 (in paise). */
export const MAX_ORDER_PAISE = 500000 * 100;

/** Allowed drift between recomputed and Razorpay-reported amounts. */
export const AMOUNT_TOLERANCE_PAISE = 100;

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

export function computeTotals(lines: PricedLine[], opts: OrderOptions) {
  const subtotal = lines.reduce((sum, l) => sum + l.unitUsd * l.qty, 0);
  const giftFee = opts.keepsake ? KEEPSAKE_FEE : 0;
  const shippingFee = opts.express ? EXPRESS_SHIPPING_FEE : 0;
  const tax = (subtotal + giftFee + shippingFee) * TAX_RATE;
  const totalUsd = subtotal + giftFee + shippingFee + tax + STRIKER_FEE;
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
