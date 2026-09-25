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
    title: "The Art of the Evening Reset",
    category: "Rituals",
    readTime: "6 min read",
    excerpt:
      "A small, repeatable ceremony for closing the day — dim the overheads, light a single vessel, and let scent draw the line between work and rest.",
    image: "/images/hero-linen.jpg",
    content: [
      p("Every evening asks the same quiet question: when does the day actually end? For most of us, it never quite does — the laptop glows into dinner, messages trail us to the sofa, and rest arrives as collapse rather than ceremony. The evening reset is our answer: a short, deliberate ritual that tells the nervous system the working day is over."),
      h2("Begin with light, not scent"),
      p("Before striking a match, change the light. Overhead lighting keeps the mind inerrant-task mode; a single warm point of light — one candle, one low lamp — narrows the room and widens attention. Place the vessel where you will actually sit, not where it photographs best."),
      p("Trim the wick to 5mm, light it, and give the wax two full minutes before you judge the throw. Botanical waxes open slowly; the first minutes belong to the flame, not the fragrance."),
      quote("Rest is not the absence of the day. It is a room you enter on purpose."),
      h2("Three breaths, one room"),
      p("Sit. Name three things you can smell beyond the candle — linen, wood, evening air through a cracked window. This is not mysticism; it is attention training. Scent is the fastest sense to reach the limbic system, which is why a familiar fragrance can lower shoulders faster than any stretch."),
      p("Stay for twenty minutes. Read something printed. Fold something. Do nothing ambitious. When you snuff the candle — bell snuffer, three breaths, never a hard blow — the day is closed. Tomorrow can wait outside the room."),
    ],
    closingNote:
      "EMBER and SANTAL were composed for exactly this hour — low, warm, and unhurried.",
  },
  {
    slug: "the-quiet-luxury-of-a-scented-candle-jar",
    title: "The Quiet Luxury of a Scented Candle Jar",
    category: "Craft",
    readTime: "8 min read",
    excerpt:
      "Why mouth-blown glass, a double cotton wick, and sixty-five hours of burn time matter more than any logo — notes from inside the atelier.",
    image: "/images/ember.jpg",
    content: [
      p("Luxury, in the atelier sense, is not rarity performed for others. It is the density of decisions hidden inside an ordinary object. A candle jar looks simple. Ours carries forty-one decisions — wax ratio, wick braid, glass thickness, pour temperature, cure length — most of which you will never see, only feel as an evening that burns evenly for sixty-five hours."),
      h2("Glass first"),
      p("We pour into mouth-blown glass because machine glass is too perfect: uniform walls wick heat away too fast and the flame drowns in its own melt pool. A hand-blown vessel varies by a millimetre or two, and that variation breathes. Each jar is heavy-based, reusable for life, and numbered by pour batch."),
      h2("Wax with a memory"),
      p("Our base is cold-pressed European rapeseed and coconut butter with a whisper of wild French beeswax — no paraffin, no palm, no pesticide soy. Plant waxes remember their first burn, which is why the opening lighting matters: let the pool reach the glass edge, all the way round, before the first snuff. Two and a half to three hours. It is the longest instruction we give, and the most important."),
      quote("You should never see our work. You should only notice that the evening felt held."),
      h2("The wick is an instrument"),
      p("A double core of unbleached cotton sounds modest until you watch it siphon essential oil without mushrooming. Trim to 5mm before every lighting. If the flame dances taller than a thumbnail, it is asking to be trimmed, not admired."),
      p("When the wax is spent, hot water at 75 degrees lifts the remainder cleanly; the disc composts, and the vessel begins its second life as a vase, a cup for brushes, a keeper of small things. That is the whole philosophy: nothing here is single-use, least of all your attention."),
    ],
    closingNote:
      "Every ORYENNA vessel is poured in small numbered batches in southern Provence.",
  },
  {
    slug: "the-sensory-home",
    title: "The Sensory Home",
    category: "Spaces",
    readTime: "5 min read",
    excerpt:
      "Rooms are instruments and scent is how you tune them — a room-by-room guide to composing fragrance the way you compose light.",
    image: "/images/fig-olive.jpg",
    content: [
      p("You already compose your home with light and texture — the lamp in the corner, the linen that softens a chair. Scent is the third instrument, and the most architectural: invisible, it shapes how large a room feels, how long guests linger, and what hour of the day a hallway belongs to."),
      h2("One scent per threshold"),
      p("The simplest rule we teach: never let two fragrances argue across an open doorway. Give each room its own composition and let thresholds do the mixing. Entry — something green and alert, like FIG & OLIVE. Sitting room — something low and resinous. Bedroom — skin-close musks and cotton, never smoke."),
      h2("Height matters"),
      p("Warm air rises and carries fragrance with it, so place vessels low in tall rooms and high on shelves in small ones. A candle on the floor beside a reading chair will throw further than one stranded on a high mantel. Bathrooms, being small and humid, need only the last centimetre of any vessel — humidity amplifies throw."),
      quote("A room should smell like the hour you mean to spend in it."),
      h2("Season the rotation"),
      p("Rotate two or three compositions with the light: bright botanicals while the sun is up, woods and ambers after dark. When a scent stops registering, it is not failing — your nose has simply filed it under home. That is the highest compliment a fragrance can earn."),
    ],
    closingNote:
      "Start with one vessel per threshold. The collection is composed to layer, never to compete.",
  },
];

export const getJournalPostBySlug = (slug: string) =>
  journalPosts.find((p) => p.slug === slug);
