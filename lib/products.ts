// Canonical frontend Product shape. This catalogue is the source of truth —
// edit products directly in the array below.
export type ProductGalleryImage = {
    url: string;
    alt?: string;
    caption?: string;
};

export type ProductInsiderInfo = {
    title?: string;
    provenanceStory?: string;
    topNotes?: string;
    heartNotes?: string;
    baseNotes?: string;
    ingredientsList?: string[];
};

export type Product = {
    id: string;
    slug: string;
    name: string;
    scentNumber: string;
    notes: string;
    description: string;
    price: number;
    priceINR?: number;
    comparePrice?: number;
    image: string;
    imageAlt?: string;
    badge?: string;
    category: "botanical" | "archival" | "objects";
    burnTime: string;
    weight: string;
    size?: string;
    sku?: string;
    accentNotes?: string[];
    topNotes?: string;
    heartNotes?: string;
    baseNotes?: string;
    ingredients?: string[];
    longDescription?: any[];
    gallery?: ProductGalleryImage[];
    inStock?: boolean;
    featured?: boolean;
    collection?: { name?: string; slug?: string };
    insiderInfo?: ProductInsiderInfo | null;
    seo?: {
        title?: string;
        description?: string;
    };
};

// The boutique catalogue. Add, edit, or remove products here.
export const products: Product[] = [
    {
        id: "ember",
        slug: "ember",
        name: "EMBER Candle",
        scentNumber: "Botanical Scent No. 04",
        notes: "Warm woods · Amber · Birch Smoke",
        description:
            "A crackling fire captured through charred Cade wood, dark resinous labdanum, and soft, comforting honeyed birch.",
        price: 78,
        image: "/images/ember.jpg",
        badge: "Signature",
        category: "botanical",
        burnTime: "65 hr slow burn",
        weight: "290g",
    },
    {
        id: "santal",
        slug: "santal",
        name: "SANTAL Candle",
        scentNumber: "Botanical Scent No. 09",
        notes: "Sandalwood · Madagascar Vanilla · Cedar Resin",
        description:
            "Creamy Mysore sandalwood balanced with aged Madagascar pod vanilla, cardamom pods, and crisp mountain cedarwood.",
        price: 78,
        image: "/images/santal.jpg",
        badge: "Classic",
        category: "botanical",
        burnTime: "62 hr burn",
        weight: "290g",
    },
    {
        id: "fig-olive",
        slug: "fig-olive",
        name: "FIG & OLIVE Candle",
        scentNumber: "Botanical Scent No. 12",
        notes: "Fig leaf · Olive wood · Musk",
        description:
            "Sun-warmed fig pulp, crushed green leaves, bitter almond blossoms, and a whisper of terracotta earth after rain.",
        price: 78,
        image: "/images/fig-olive.jpg",
        badge: "Botanical",
        category: "botanical",
        burnTime: "68 hr burn",
        weight: "290g",
    },
    {
        id: "soft-linen",
        slug: "soft-linen",
        name: "SOFT LINEN Candle",
        scentNumber: "Botanical Scent No. 02",
        notes: "Cotton · Iris · White Musk",
        description:
            "Evokes sun-dried textiles suspended in a Tuscan breeze, delicate Florentine orris root, and clean sheer amber.",
        price: 74,
        image: "/images/soft-linen.jpg",
        badge: "Limited",
        category: "botanical",
        burnTime: "60 hr burn",
        weight: "290g",
    },
    {
        id: "brass-wick-duo",
        slug: "brass-wick-duo",
        name: "Brass Wick Ritual Duo",
        scentNumber: "Atelier Tool",
        notes: "Hand-Forged · Unlacquered Brass",
        description:
            "Precision angled trimmer and snuffer designed to clip wicks cleanly at 5mm, preventing soot deposits and extending burn life.",
        price: 32,
        image: "/images/brass-duo.jpg",
        badge: "Ritual Tool",
        category: "objects",
        burnTime: "Ages with patina",
        weight: "Solid brass",
    },
    {
        id: "travertine-pedestal",
        slug: "travertine-pedestal",
        name: "Travertine Pedestal",
        scentNumber: "Stonework",
        notes: "Honed Roman Travertine · 18cm × 18cm",
        description:
            "Substantial thermal stone surface that safeguards credenzas while elevating your scent ritual into an altar of stillness.",
        price: 45,
        image: "/images/travertine.jpg",
        badge: "Stonework",
        category: "objects",
        burnTime: "Felt padded base",
        weight: "1.4kg",
    },
];

export const getProductBySlug = (slug: string) =>
    products.find((p) => p.slug === slug);