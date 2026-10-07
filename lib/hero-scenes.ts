export type HeroNote = {
  name: string;
  qualities: string;
  position: "left" | "right-top" | "right-mid";
};

export type HeroCandle = {
  id: string;
  slug: string;
  productName: string;
  image: string;
  imageAlt: string;
  centralImage?: string;
  centralImageAlt?: string;
  notes: [HeroNote, HeroNote, HeroNote];
  tagline?: string;
};

export type HeroScene = {
  candle: HeroCandle;
  isActive: boolean;
};

/** Homepage hero candle sections — one candle per scene. */
export const HERO_CANDLES: HeroCandle[] = [
  {
    id: "vanilla",
    slug: "vanilla",
    productName: "Vanilla",
    image: "/images/hero/1.png",
    imageAlt: "Oryenna Vanilla Candle with vanilla bean pods and orchid flower",
    centralImage: "/images/hero/1.png",
    centralImageAlt: "Vanilla candle with glowing flame and vanilla accents",
    notes: [
      {
        name: "Vanilla Absolute",
        qualities: "Calming · Warm · Sweet",
        position: "left",
      },
      {
        name: "White Orchid",
        qualities: "Floral · Luminous · Delicate",
        position: "right-top",
      },
      {
        name: "Tonka Bean",
        qualities: "Grounded · Earthy · Relaxing",
        position: "right-mid",
      },
    ],
    tagline: "Madagascar vanilla & white orchid",
  },
  {
    id: "lavender",
    slug: "lavender",
    productName: "Lavender",
    image: "/images/hero/2.png",
    imageAlt: "Oryenna Lavender Candle on travertine stone with fresh lavender",
    centralImage: "/images/hero/2.png",
    centralImageAlt: "Lavender candle with glowing flame on stone coaster",
    notes: [
      {
        name: "French Lavender",
        qualities: "Herbaceous · Soothing · Pure",
        position: "left",
      },
      {
        name: "Warm Amber",
        qualities: "Resinous · Honeyed · Deep",
        position: "right-top",
      },
      {
        name: "White Musk",
        qualities: "Soft · Clean · Serene",
        position: "right-mid",
      },
    ],
    tagline: "Provençal lavender & warm amber",
  },
  {
    id: "sandalwood",
    slug: "sandalwood",
    productName: "Sandalwood",
    image: "/images/hero/3.png",
    imageAlt: "Oryenna Sandalwood Candle with aged sandalwood bark pieces",
    centralImage: "/images/hero/3.png",
    centralImageAlt: "Sandalwood candle with aromatic wood bark pieces",
    notes: [
      {
        name: "Mysore Sandalwood",
        qualities: "Creamy · Sacred · Meditative",
        position: "left",
      },
      {
        name: "Cedarwood Resin",
        qualities: "Woody · Balsamic · Warm",
        position: "right-top",
      },
      {
        name: "Cardamom",
        qualities: "Spicy · Crisp · Grounding",
        position: "right-mid",
      },
    ],
    tagline: "Mysore sandalwood & warm cedarwood",
  },
  {
    id: "jasmine",
    slug: "jasmine",
    productName: "Jasmine",
    image: "/images/hero/4.png",
    imageAlt: "Oryenna Jasmine Candle with blooming white jasmine blossoms",
    centralImage: "/images/hero/4.png",
    centralImageAlt: "Jasmine candle surrounded by delicate star jasmine flowers",
    notes: [
      {
        name: "Jasmine Sambac",
        qualities: "Luminous · Floral · Night-blooming",
        position: "left",
      },
      {
        name: "Green Leaf",
        qualities: "Fresh · Dewy · Awakening",
        position: "right-top",
      },
      {
        name: "White Amber",
        qualities: "Sheer · Radiant · Enveloping",
        position: "right-mid",
      },
    ],
    tagline: "Jasmine sambac & luminous florals",
  },
];