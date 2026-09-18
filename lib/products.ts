export type Product = {
    id: string;
    slug: string;
    name: string;
    scentNumber: string;
    notes: string;
    description: string;
    price: number;
    image: string;
    badge?: string;
    category: "botanical" | "archival" | "objects";
    burnTime: string;
    weight: string;
    seo?: {
        title?: string;
        description?: string;
    };
};

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
        image:
            "https://lh3.googleusercontent.com/aida/AEtjO1XriQDEeBTvp-WB3OCY2_uA57waD6v-S2E7oqjFl0RAtTCMB21VMwGD4RGT7eMYvYgtAZ5fwAB4Y9e0d9KLMM--oha8Fd7nRfsNfrvehrPwCWqqFE2JjfyHLtoDJlMlhb7kRH38mCEdsfzVSaNuZm2OnzBidymSgUpaLFMNs0vKVGg4E-pDgWorJn8c-8ZkhWRm1Oo4Xd06EtVGNq-nJI5FwVKEuGnA4lsf8gY2BUPzwbQYVvBTwnf4DXfK",
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
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB5mOEJguAI1yq94xdHiIZdBlCTVfD5JMdQzGA6swY__oUgT4kdPS2yLmD5dVZ4E7X-1K4Ts2mYOSQQxq2uBpxC5fo27IVFP86Mshkan8O5AdooGfkdw92uORjU_AmGT7GFcfjkW9qyWu94oBeUDXfmBrrRtHgfWDZdj-OzlemrVWi8JYc1rP9WF7bRdLJKYren2VH4AYvvoy4XmRSeuZOfyctU2bKfysEobgT4gFA_JGffgCaeZi7htg",
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
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDxqWDpB4AmDvIHlbSpLSalJtrsk8rL55tzffDjTu_GizDlKHj69MB7oiPg6wjBfUG9XlQvL_hfdu-iC_ae4LtuejHrJwqxd1bYRs5emPvjr1OTmJywj9_GaJLQydJqpnde9NTLF-b3AZmAcqRT-YN9NlD3E2J_kcoe_DyiBrJBJ2VIfpyclZFQsoL2RAet4t581JgzhTbuz2EShnPRAdiXq-6_prEeJhGNu4uG9gxWOhurjwmeUDRKvw",
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
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDhPEjNFeVKembgEaXFYo0RUtH_05DBjpUnqOuD6rHIj9IkJio-P_c6u0jfJ2pP-ybaa0DFPUMabYsK3B86qyyStm4xQmyklAqyRYwlpj1sTMngl5K4jkXxksHmtOxAj2Hh3w08bTSiQ-afOmoRWGHraDzsvQ-ioorUYYwByBCLyHf1r6PXT6AxC8jSE6IteAYZrp39VT7IenqdjVs_fKsOPeHej_zlr5WkCAlaA5brjuxYv_mjtbCohw",
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
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD5GEIkk0rB4ZBeWXdtspd1vUncGa0-u5h5YcqIJtVeXpRlmjMtQTE4Z4769u_rIQBwRxfw0h-ketoDxgcJu6q3WBfTcAsHUBlE6HhRdSimfOgRdYu_M-sVmFXI12_qvHs_kAc30csKmwJT-1Jh3I_ApJgDOrWgPR1ALgMt_WRqBeLgGe88cv9OD7pzhhRXzuRJdx6uypWAcdjwAGgTgNMOcOhV6N70YqpwXiijX6WuoYtILUPhcAuPqg",
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
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDDbbFsFP53-z6-SSXWFRshUKMV0VmId4c4YEPAg2FguB15B4iLRsjGyFVxpOVuUuzhLWRps4elic72AhHA8BMHTBcwvMW8EBIcYeUD7FqQGIufbNE2b9w6xbLxqi3BfrClIRoNj48wDuANdkmVXcWXy_4xYdVTCXCgWrlaty6gj7FJGCN75vLbGN5U6XwKzURdITRGK7Ze69gzP7opuiiPJVJNFztChDrtYPD6adO72fP63b4WzLCK9g",
        badge: "Stonework",
        category: "objects",
        burnTime: "Felt padded base",
        weight: "1.4kg",
    },
];

export const getProductBySlug = (slug: string) =>
    products.find((p) => p.slug === slug);