import type { JournalPost } from "@/lib/journal";

// Hardcoded journal catalogue. Content blocks use the same shape the
// PortableTextRenderer understands (block / h2 / blockquote / lists).

const p = (text: string) => ({
  _type: "block",
  style: "normal",
  children: [{ _type: "span", text }],
});

const h2 = (text: string) => ({
  _type: "block",
  style: "h2",
  children: [{ _type: "span", text }],
});

const quote = (text: string) => ({
  _type: "block",
  style: "blockquote",
  children: [{ _type: "span", text }],
});

export const journalPosts: JournalPost[] = [
  {
    slug: "the-art-of-the-evening-reset",
    title: "How to Get the Best First Burn",
    category: "How-To",
    readTime: "4 min read",
    excerpt:
      "The first lighting decides how your candle burns for the rest of its life — here is the two-minute routine that prevents tunnelling.",
    image: "/images/hero-linen.jpg",
    content: [
      p("Plant-based waxes remember their first burn. If the melt pool never reaches the edge on day one, the candle will tunnel — burning straight down the middle and wasting the rest. The fix takes no skill, only patience."),
      h2("Give it one long first burn"),
      p("On the first lighting, let the candle burn until the liquid wax reaches the glass edge all the way round — usually two and a half to three hours. After that, normal one-to-two-hour burns are perfect."),
      h2("Trim the wick, every time"),
      p("Trim the cotton wick to 5mm before each lighting. A trimmed wick gives a steady, smoke-free flame and the full 60+ hour burn printed on the label."),
      quote("One long first burn, then trim the wick — that is the whole technique."),
      h2("Snuff, don't blow"),
      p("Blowing out a candle sprays hot wax and leaves smoke in the room. A bell snuffer — or the lid, placed on for a few seconds — starves the flame cleanly and keeps the fragrance in the air, not in a puff of grey."),
    ],
    closingNote:
      "Every ORYENNA vessel ships with a printed burn-care card covering exactly this.",
  },
  {
    slug: "the-quiet-luxury-of-a-scented-candle-jar",
    title: "What Actually Makes a Premium Candle",
    category: "Craft",
    readTime: "6 min read",
    excerpt:
      "Wax, wick, fragrance load, and glass — the four things that separate a good candle from a forgettable one, and what to check before you buy.",
    image: "/images/ember.jpg",
    content: [
      p("Most candles look identical on a shelf. The differences that matter are all inside the jar — and they decide whether you get sixty even hours or a sooty tunnel by week two."),
      h2("1. The wax"),
      p("Cheap candles use paraffin, a petroleum by-product that burns fast and soots. Ours use a cold-pressed rapeseed and coconut butter base with a little natural beeswax — no paraffin, no palm oil. Plant waxes burn slower, hold fragrance better, and clean out of the jar with hot water."),
      h2("2. The wick"),
      p("A double core of unbleached cotton siphons oil evenly without mushrooming into carbon. If a candle's flame dances taller than a thumbnail, the wick needed trimming — not admiring."),
      quote("You should never notice our work. You should only notice the candle burns evenly."),
      h2("3. The fragrance load"),
      p("We use steam-distilled essential oils and resin extracts at loads the wax can actually carry. Overloaded candles smell strong for a week and then go flat; correctly loaded ones throw consistently to the last centimetre."),
      h2("4. The vessel"),
      p("Heavy-based, mouth-blown glass that survives the dishwasher and deserves a second life as a vase or catch-all. When the wax is spent, hot water at 75 degrees lifts the remainder out cleanly — or slide in one of our drop-in refills."),
    ],
    closingNote:
      "Every ORYENNA vessel is poured in small numbered batches in Jaipur.",
  },
  {
    slug: "the-sensory-home",
    title: "Scenting Different Rooms",
    category: "Spaces",
    readTime: "4 min read",
    excerpt:
      "One fragrance per room, matched to the size of the space — a practical room-by-room guide to using scented candles at home.",
    image: "/images/fig-olive.jpg",
    content: [
      p("A candle is the cheapest way to change how a room feels. A few practical rules make the difference between a home that smells good and one where fragrances fight each other across doorways."),
      h2("One scent per room"),
      p("Never let two strong fragrances argue across an open doorway. Give each room its own candle and let the thresholds do the mixing: something green and fresh near the entry, warm woods in the sitting room, soft cotton and musk in the bedroom."),
      h2("Match the candle to the room size"),
      p("Small bathrooms need only the last centimetre of any candle — humidity amplifies scent. Large sitting rooms with high ceilings need a bigger vessel or two lit together, placed low where you actually sit rather than stranded on a high shelf."),
      quote("If you stop noticing a candle, it is working — it has become part of the room."),
      h2("Rotate with the seasons, not your mood"),
      p("Bright botanicals suit daylight and summer; woods, amber, and smoke suit evenings and winter. When a scent fades into the background, your nose has simply filed it under home — rotate it out for a month and it will smell new again."),
    ],
    closingNote:
      "The collection is composed to layer — start with one vessel per room.",
  },
];

export const getJournalPostBySlug = (slug: string) =>
  journalPosts.find((p) => p.slug === slug);
