import type { ConciergeGroup } from "@/components/concierge/concierge-view";

// Plain candle-care knowledge, grouped by topic. Rendered on /faq.
export const FAQ_GROUPS: ConciergeGroup[] = [
  {
    id: "burn",
    discipline: "Topic 01",
    title: "Burning & Wick Care",
    items: [
      {
        q: "How long should the first burn last?",
        a: "Two and a half to three hours, until the melted wax reaches the glass edge all the way round. Plant waxes hold the shape of their first burn, and a full opening pool prevents tunnelling for the rest of the candle's life.",
      },
      {
        q: "Why trim the cotton wick to 5mm before every lighting?",
        a: "Unbleached cotton wicks form carbon buildup at the tip as they burn. Trimming to 5mm keeps the flame steady and teardrop-shaped, stops black soot marks on the glass, and delivers the full 60+ hour burn time.",
      },
      {
        q: "What is the cleanest way to put the candle out?",
        a: "Don't blow on it — that sprays hot wax and fills the room with smoke. Place a snuffer or the lid over the flame for a few seconds to starve it cleanly.",
      },
    ],
  },
  {
    id: "wax",
    discipline: "Topic 02",
    title: "Wax & Ingredients",
    items: [
      {
        q: "What is the wax made of?",
        a: "A cold-pressed rapeseed and coconut butter base with a little natural beeswax. No paraffin, no palm oil, no pesticide soy — and every fragrance is phthalate-free and follows IFRA safety standards.",
      },
      {
        q: "Are the fragrances safe around pets and children?",
        a: "Our formulas contain only essential oils, resin extracts, and absolutes within IFRA safety limits. Still, always burn in a ventilated room, keep lit candles out of reach, and never leave a flame unattended.",
      },
    ],
  },
  {
    id: "vessel",
    discipline: "Topic 03",
    title: "Vessels & Refills",
    items: [
      {
        q: "How do I clean the glass or ceramic vessel when the wax is finished?",
        a: "Pour in hot water (around 75°C, not boiling). The wax melts, floats up, and sets into a disc overnight that pops out and can go in compost. Wash with warm soapy water and the vessel is ready for reuse.",
      },
      {
        q: "How do the wax drop-in refills work?",
        a: "Every ORYENNA vessel is sized to take our cylindrical refill blocks. Peel off the seed-paper wrapping, drop the cold wax block in, and light as normal — no new jar needed.",
      },
    ],
  },
  {
    id: "transit",
    discipline: "Topic 04",
    title: "Shipping & Gifting",
    items: [
      {
        q: "How long does shipping take?",
        a: "Orders leave our Jaipur studio within 2 working days. Europe takes 3–5 working days, India 2–4, and the rest of the world 5–9. Every parcel is tracked and packed in biodegradable boxes tied with cotton cord.",
      },
      {
        q: "Do you offer gift packaging?",
        a: "Yes — choose Signature Gift Packaging at checkout for a cotton-lined gift box with a wax seal and herb card. It fits every vessel in the collection.",
      },
    ],
  },
];
