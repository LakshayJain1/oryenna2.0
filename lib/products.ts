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

// The boutique catalogue — 4 signature scented candles.
export const products: Product[] = [
    {
        id: "lavender",
        slug: "lavender",
        name: "LAVENDER Candle",
        scentNumber: "Botanical Scent No. 01",
        notes: "Lavender · Amber · Soft Musk",
        description:
            "Fields of Provençal lavender distilled into a slow, calming burn. Dried botanical lavender buds bloom into a warm amber base, leaving behind a quiet, serene atmosphere.",
        price: 74,
        priceINR: 2200,
        image: "/images/lavender.jpg",
        imageAlt: "ORYENNA Lavender Scented Candle on travertine stone with dried lavender sprigs",
        badge: "Bestseller",
        category: "botanical",
        burnTime: "65 hr slow burn",
        weight: "290g",
        topNotes: "French Lavender, Bergamot",
        heartNotes: "Lavender Absolute, Violet Leaf",
        baseNotes: "Warm Amber, White Musk, Cedarwood",
        ingredients: ["Natural Soy Wax", "Lavender Essential Oil", "Amber Fragrance", "Cotton Wick"],
        featured: true,
        inStock: true,
        seo: {
            title: "Lavender Scented Candle — ORYENNA",
            description: "Hand-poured lavender soy candle with dried botanicals. 65-hour burn. Free shipping in India.",
        },
    },
    {
        id: "sandalwood",
        slug: "sandalwood",
        name: "SANDALWOOD Candle",
        scentNumber: "Botanical Scent No. 02",
        notes: "Mysore Sandalwood · Cedarwood · Vanilla",
        description:
            "Creamy Mysore sandalwood — one of the world's most prized woods — grounded by warm cedarwood resin and a whisper of sweet vanilla. Earthy, meditative, and deeply comforting.",
        price: 78,
        priceINR: 2400,
        image: "/images/sandalwood.jpg",
        imageAlt: "ORYENNA Sandalwood Scented Candle on travertine stone with sandalwood bark pieces",
        badge: "Signature",
        category: "botanical",
        burnTime: "65 hr slow burn",
        weight: "290g",
        topNotes: "Sandalwood, Cardamom",
        heartNotes: "Mysore Sandalwood Absolute, Vetiver",
        baseNotes: "Cedarwood Resin, Madagascar Vanilla, White Musk",
        ingredients: ["Natural Soy Wax", "Sandalwood Essential Oil", "Cedarwood Extract", "Cotton Wick"],
        featured: true,
        inStock: true,
        seo: {
            title: "Sandalwood Scented Candle — ORYENNA",
            description: "Hand-poured Mysore sandalwood soy candle. 65-hour burn. Studio-crafted in Jaipur.",
        },
    },
    {
        id: "vanilla",
        slug: "vanilla",
        name: "VANILLA Candle",
        scentNumber: "Botanical Scent No. 03",
        notes: "Madagascar Vanilla · Orchid · Tonka Bean",
        description:
            "Warm, creamy, and utterly comforting. Madagascar vanilla pods and delicate white orchid float over a rich tonka bean and blonde sandalwood base — like golden afternoon light in a quiet room.",
        price: 74,
        priceINR: 2200,
        image: "/images/vanilla.jpg",
        imageAlt: "ORYENNA Vanilla Scented Candle with vanilla bean pods and white orchid flowers",
        badge: "Classic",
        category: "botanical",
        burnTime: "62 hr burn",
        weight: "290g",
        topNotes: "Madagascar Vanilla, White Orchid",
        heartNotes: "Vanilla Absolute, Heliotrope",
        baseNotes: "Tonka Bean, Blonde Sandalwood, Benzoin",
        ingredients: ["Natural Soy Wax", "Vanilla Absolute", "Orchid Fragrance", "Cotton Wick"],
        featured: true,
        inStock: true,
        seo: {
            title: "Vanilla Scented Candle — ORYENNA",
            description: "Hand-poured Madagascar vanilla soy candle with orchid. 62-hour burn. Crafted in Jaipur.",
        },
    },
    {
        id: "jasmine",
        slug: "jasmine",
        name: "JASMINE Candle",
        scentNumber: "Botanical Scent No. 04",
        notes: "Jasmine Sambac · Green Leaf · White Amber",
        description:
            "The intoxicating freshness of jasmine sambac at dusk — delicate, luminous, and quietly brightening. A breath of floral calm that transforms any space into a sanctuary.",
        price: 78,
        priceINR: 2400,
        image: "/images/jasmine.jpg",
        imageAlt: "ORYENNA Jasmine Scented Candle with fresh white jasmine flowers and green leaves",
        badge: "New",
        category: "botanical",
        burnTime: "68 hr burn",
        weight: "290g",
        topNotes: "Jasmine Sambac, Green Leaf, Bergamot",
        heartNotes: "Jasmine Absolute, Neroli, Lily of the Valley",
        baseNotes: "White Amber, Musk, Soft Cedarwood",
        ingredients: ["Natural Soy Wax", "Jasmine Absolute", "Neroli Oil", "Cotton Wick"],
        featured: true,
        inStock: true,
        seo: {
            title: "Jasmine Scented Candle — ORYENNA",
            description: "Hand-poured jasmine sambac soy candle. 68-hour burn. Studio-crafted in Jaipur.",
        },
    },
];

export const getProductBySlug = (slug: string) =>
    products.find((p) => p.slug === slug);