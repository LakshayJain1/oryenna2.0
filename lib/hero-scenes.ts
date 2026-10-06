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
    id: "santal",
    slug: "santal",
    productName: "Santal",
    image: "/images/hero-santal.jpg",
    imageAlt:
      "Cream wax pouring into a glass Oryenna candle surrounded by lavender, vanilla beans, and sandalwood",
    centralImage: "/images/central-candle-santal.jpg",
    centralImageAlt:
      "Santal candle with smooth wax surface and wooden wick",
    notes: [
      {
        name: "Lavender",
        qualities: "Calming · Floral · Serene",
        position: "left",
      },
      {
        name: "Vanilla",
        qualities: "Warm · Sweet · Comforting",
        position: "right-top",
      },
      {
        name: "Sandalwood",
        qualities: "Grounded · Earthy · Relaxing",
        position: "right-mid",
      },
    ],
    tagline: "Grounding sandalwood & warm vanilla",
  },
  {
    id: "ember",
    slug: "ember",
    productName: "Ember",
    image: "/images/hero-ember.jpg",
    imageAlt:
      "Amber wax pouring into a glass candle surrounded by cade wood, birch bark, and resin",
    centralImage: "/images/central-candle-ember.jpg",
    centralImageAlt:
      "Ember candle with glowing amber wax and birch bark accents",
    notes: [
      {
        name: "Birch Smoke",
        qualities: "Charred · Warm · Intimate",
        position: "left",
      },
      {
        name: "Amber",
        qualities: "Resinous · Honeyed · Deep",
        position: "right-top",
      },
      {
        name: "Cade Wood",
        qualities: "Smoked · Forest · Ember",
        position: "right-mid",
      },
    ],
    tagline: "Charred birch & deep amber",
  },
  {
    id: "fig-olive",
    slug: "fig-olive",
    productName: "Fig & Olive",
    image: "/images/hero-fig-olive.jpg",
    imageAlt:
      "Pale wax pouring into a glass candle surrounded by fig leaves, ripe figs, and olive branches",
    centralImage: "/images/central-candle-fig.jpg",
    centralImageAlt:
      "Fig & Olive candle with pale wax and fig leaf details",
    notes: [
      {
        name: "Fig Leaf",
        qualities: "Green · Sun-warmed · Lush",
        position: "left",
      },
      {
        name: "Olive Wood",
        qualities: "Mediterranean · Soft · Dry",
        position: "right-top",
      },
      {
        name: "Musk",
        qualities: "Skin-close · Quiet · Lasting",
        position: "right-mid",
      },
    ],
    tagline: "Fresh fig & Mediterranean olive",
  },
  {
    id: "soft-linen",
    slug: "soft-linen",
    productName: "Soft Linen",
    image: "/images/hero-soft-linen.jpg",
    imageAlt:
      "Ivory wax pouring into a glass candle surrounded by cotton, iris blossoms, and sun-dried linen",
    centralImage: "/images/central-candle-linen.jpg",
    centralImageAlt:
      "Soft Linen candle with ivory wax and cotton fiber details",
    notes: [
      {
        name: "Cotton",
        qualities: "Airy · Clean · Sun-dried",
        position: "left",
      },
      {
        name: "Iris",
        qualities: "Powdery · Pale · Tender",
        position: "right-top",
      },
      {
        name: "White Musk",
        qualities: "Sheer · Soft · Fresh",
        position: "right-mid",
      },
    ],
    tagline: "Air cotton & fresh linen",
  },
];