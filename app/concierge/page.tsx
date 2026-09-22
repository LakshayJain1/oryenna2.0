import { fetchPageBySlug, sectionOf } from "@/sanity/page-data";
import ConciergeView, {
  type ConciergeGroup,
} from "@/components/concierge/concierge-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/concierge",
  title: "Concierge — Wax, Wick & Ritual Care",
  description:
    "A contemplative guide to botanical flame stewardship, clean burning rituals, and slow sensory transit.",
});

export const revalidate = 60;

const SLUG = "concierge";

function slugify(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || fallback;
}

// EMERGENCY/OFFLINE FALLBACK ONLY — Sanity (`page` doc with pageType
// "concierge" holding one faqList section per discipline) is the source of
// truth. This renders only when Sanity is unreachable or the concierge doc
// has no faqList sections. Do not add new Q&As here; edit them in Studio.
const FALLBACK_GROUPS: ConciergeGroup[] = [
  {
    id: "burn",
    discipline: "Discipline 01",
    title: "The Art of the Burn & Wick Care",
    items: [
      {
        q: "Why is the initial burn ritual so critical to the life of the candle?",
        a: "Plant-based botanical waxes possess an olfactory 'wax memory.' On the first lighting, do not extinguish your candle until the liquefied pool has melted completely to the outer edge of the vessel. Allow between 2.5 and 3 hours.",
      },
      {
        q: "Why do you recommend trimming the unbleached cotton wick to 5mm before every lighting?",
        a: "Unbleached, braided organic wicks naturally form carbon blooms at their tips as they siphon rich essential oils. Trimming to exactly 5mm before each lighting ensures an untroubled, teardrop flame and eliminates black soot trails.",
      },
      {
        q: "How do I snuff out the candle without acrid smoke disrupting the room?",
        a: "Blowing directly upon a molten candle disturbs the essential oil vapor. Either place a conical bell snuffer gently over the flame for three breaths, or employ a brass wick-dipper to bend the burning wick into the warm wax pool.",
      },
    ],
  },
  {
    id: "wax",
    discipline: "Discipline 02",
    title: "Botanical Wax & Clean Formulations",
    items: [
      {
        q: "What is inside the proprietary ORYENNA botanical wax base?",
        a: "Our bespoke wax contains zero petroleum paraffin, zero pesticide monoculture soy, and zero palm oils. Instead, a cold-pressed European rapeseed and organic coconut butter base, balanced with a whisper of sustainably sourced wild French cera alba.",
      },
      {
        q: "Are your fragrances synthetic-free, phthalate-free, and safe around pets?",
        a: "Yes. We compose exclusively with pure steam-distilled essential oils, CO2 resinoid extracts, and artisanal enfleurage absolutes. Every formula adheres to rigorous IFRA Standards and remains free from phthalates, parabens, formaldehydes, and nitro-musks.",
      },
    ],
  },
  {
    id: "vessel",
    discipline: "Discipline 03",
    title: "Vessel Permanence & Refill Rituals",
    items: [
      {
        q: "How do I clean the stoneware ceramic or mouth-blown vessel once the wax is spent?",
        a: "Pour hot water (around 75°C, not boiling) directly into the vessel. The botanical wax will liquify and rise to the water's surface. Once cooled overnight, the hardened wax disc can be popped out and composted.",
      },
      {
        q: "How does the Zero-Waste Wax Drop-In Refill system function?",
        a: "Every vessel in the ORYENNA catalog is precision-engineered to accommodate our cylindrical Wax Drop-In refills. Arriving enclosed in wild chamomile-seeded compostable paper, you merely peel away the wrapping and slide the cold wax block into place.",
      },
    ],
  },
  {
    id: "transit",
    discipline: "Discipline 04",
    title: "Slow Sensory Transit & Gifting",
    items: [
      {
        q: "Why do you offer dedicated Slow Sensory Transit rather than overnight air freight?",
        a: "Sudden atmospheric pressure drops and uninsulated cargo holds during rapid air transit shock fragile vegetable waxes, inducing 'frosting' and premature essential oil sweat. We curate ground transit routes with climate-controlled staging.",
      },
      {
        q: "Can I request a personalized handwritten calligraphy parchment note?",
        a: "Indubitably. During checkout, select 'Atelier Scribe Note.' Our in-house archivist inscribes your personal dedication using oak gall ink onto handmade hemp rag paper, folded and hand-stamped with our botanical monogram in terracotta beeswax.",
      },
    ],
  },
];

export default async function ConciergePage() {
  // Single source of truth: `page` doc with pageType "concierge".
  // Authors create one faqList section per discipline (burn, wax, vessel,
  // transit); each section headline becomes a filter tab, its eyebrow the
  // "Discipline 0X" label, and its items the Q&As.
  const pageDoc = await fetchPageBySlug(SLUG);
  const heroSection = sectionOf(pageDoc, "hero");
  const faqSections = (pageDoc?.sections ?? []).filter(
    (s: any) =>
      (s._type === "faqList" || s.sectionType === "faqList") &&
      Array.isArray((s as any).items) &&
      (s as any).items.length > 0
  );

  const groups: ConciergeGroup[] =
    faqSections.length > 0
      ? faqSections.map((s: any, i: number) => ({
          id: slugify(
            typeof s.headline === "string" ? s.headline : "",
            (s._key as string) || `group-${i}`
          ),
          discipline:
            (typeof s.eyebrow === "string" && s.eyebrow) ||
            `Discipline ${String(i + 1).padStart(2, "0")}`,
          title:
            (typeof s.headline === "string" && s.headline) ||
            `Discipline ${i + 1}`,
          items: (s.items as any[]).map((item: any) => ({
            q: item.question as string,
            a: item.answer as string,
          })),
        }))
      : FALLBACK_GROUPS;

  return (
    <ConciergeView
      eyebrow={(heroSection as any)?.eyebrow}
      title={
        ((heroSection as any)?.headline as string | undefined) ||
        (pageDoc?.title as string | undefined)
      }
      tagline={(heroSection as any)?.tagline}
      groups={groups}
    />
  );
}
