// Seed script to populate initial documents to Sanity project djdiiitp (production)
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'djdiiitp',
  dataset: 'production',
  apiVersion: '2026-02-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
})

const initialProducts = [
  {
    _id: 'product-amber',
    _type: 'product',
    name: 'Amber',
    slug: { _type: 'slug', current: 'amber' },
    price: 78,
    badge: 'BESTSELLER',
    notes: 'Warm Woods · Amber · Smoke',
    description:
      'Evoking dry birch logs glowing quietly on a stone hearth at dusk. Golden labdanum with smoked cedar.',
    weight: '290G / 10.2 OZ',
    burnTime: '55 Hours',
    accentNotes: ['Bergamot', 'Golden Amber', 'Smoked Cedar'],
    topNotes: 'Bergamot & Pink Pepper',
    heartNotes: 'Amber & Labdanum',
    baseNotes: 'Smoked Cedar & Benzoin',
    story:
      'Inspired by the quiet amber light of late November in Aix-en-Provence. Dry birch logs, golden rockrose resin, and soft ribbons of incense that linger in fabrics long after the wick is snuffed.',
    inStock: true,
    orderRank: 1,
  },
  {
    _id: 'product-santal',
    _type: 'product',
    name: 'Santal',
    slug: { _type: 'slug', current: 'santal' },
    price: 78,
    badge: 'CLASSIC',
    notes: 'Sandalwood · Vanilla · Cedar',
    description:
      'Silky Australian sandalwood with soft crushed vanilla orchid, dry cardamom, and white musk.',
    weight: '290G / 10.2 OZ',
    burnTime: '55 Hours',
    accentNotes: ['Cardamom', 'Australian Sandalwood', 'Vanilla Orchid'],
    topNotes: 'Cardamom Pods & White Pepper',
    heartNotes: 'Australian Sandalwood & Vanilla Orchid',
    baseNotes: 'Virginia Cedar & Powdered Orris',
    story:
      'Formulated for moments of solitude and evening reading. A delicate botanical veil that cushions background sound and restores mental clarity.',
    inStock: true,
    orderRank: 2,
  },
  {
    _id: 'product-palo-santo',
    _type: 'product',
    name: 'Palo Santo',
    slug: { _type: 'slug', current: 'palo-santo' },
    price: 82,
    badge: 'LIMITED',
    notes: 'Palo Santo · Sage · Vetiver',
    description:
      'Wild-harvested sacred wood with cleansing white sage, Haitian vetiver root, and smoky copal resin.',
    weight: '290G / 10.2 OZ',
    burnTime: '55 Hours',
    accentNotes: ['White Sage', 'Palo Santo Wood', 'Earthy Vetiver'],
    topNotes: 'Crisp Wild Sage & Bergamot Rind',
    heartNotes: 'Ecuadorian Palo Santo & Copal Resin',
    baseNotes: 'Haitian Vetiver & Smoked Birch',
    story:
      'Clears dense atmospheres and resets room energy. Hand-harvested sacred wood from naturally fallen branches in protected coastal forests.',
    inStock: true,
    orderRank: 3,
  },
  {
    _id: 'product-hinoki',
    _type: 'product',
    name: 'Hinoki',
    slug: { _type: 'slug', current: 'hinoki' },
    price: 84,
    badge: 'ARCHIVE',
    notes: 'Hinoki Cypress · Frankincense · Moss',
    description:
      'Japanese mountain cypress and ancient stone temple incense surrounded by dewy cedar needle moss.',
    weight: '290G / 10.2 OZ',
    burnTime: '55 Hours',
    accentNotes: ['Cypress Needles', 'Omani Frankincense', 'Oakmoss'],
    topNotes: 'Green Cypress Needles & Lemon Peel',
    heartNotes: 'Sacred Frankincense Tears & Shiso',
    baseNotes: 'Japanese Hinoki Wood & Wet Forest Moss',
    story:
      'Transports space to mist-covered mountain temples in Yoshino. Resinous, quiet, and deeply centering.',
    inStock: true,
    orderRank: 4,
  },
]

const initialMoods = [
  {
    _id: 'mood-quiet',
    _type: 'moodRecommendation',
    mood: 'quiet',
    label: 'Quiet & Contemplative',
    tagline: 'Serene Linen & Whispering Woods',
    description:
      'Formulated for moments of solitude, evening reading, and unwinding mental tension. A delicate veil that cushions background sound.',
    product: { _type: 'reference', _ref: 'product-santal' },
    bestFor: 'Rainy afternoons, mindful reading, bedside wind-down',
    warmth: 65,
    intensity: 45,
    clarity: 85,
    orderRank: 1,
  },
  {
    _id: 'mood-grounded',
    _type: 'moodRecommendation',
    mood: 'grounded',
    label: 'Grounded & Earthbound',
    tagline: 'Ancient Cypress & Deep Roots',
    description:
      'Anchors chaotic thoughts in physical stillness. Deep roots, mossy temple woods, and meditative resins that settle breathing.',
    product: { _type: 'reference', _ref: 'product-hinoki' },
    bestFor: 'Morning meditation, creative focus, resetting energy',
    warmth: 60,
    intensity: 70,
    clarity: 80,
    orderRank: 2,
  },
  {
    _id: 'mood-uplifted',
    _type: 'moodRecommendation',
    mood: 'uplifted',
    label: 'Uplifted & Luminous',
    tagline: 'Crisp Botanicals & Sunlight',
    description:
      'Opens windows in the mind. Sun-warmed Mediterranean fig leaves, wild crushed herbs, and bright morning air that invites vitality.',
    product: { _type: 'reference', _ref: 'product-palo-santo' },
    bestFor: 'Midday reset, dining room gatherings, fresh morning air',
    warmth: 50,
    intensity: 60,
    clarity: 95,
    orderRank: 3,
  },
  {
    _id: 'mood-warm',
    _type: 'moodRecommendation',
    mood: 'warm',
    label: 'Warm & Enveloping',
    tagline: 'Smoky Birch & Golden Amber',
    description:
      'A comforting hearth in the quiet of dusk. Rich golden labdanum melting into dry firewood and sweet lingering benzoin resin.',
    product: { _type: 'reference', _ref: 'product-amber' },
    bestFor: 'Cold dusk hours, intimate conversations, slow dinners',
    warmth: 95,
    intensity: 75,
    clarity: 60,
    orderRank: 4,
  },
]

const initialArticles = [
  {
    _id: 'article-evening-reset',
    _type: 'journalArticle',
    title: 'The Art of the Evening Reset',
    slug: { _type: 'slug', current: 'the-art-of-the-evening-reset' },
    category: 'RITUAL',
    readTime: '4 MIN READ',
    publishedAt: '2026-10-14',
    excerpt:
      'How lowering ambient light, striking a sulfur match, and choosing one singular scent signals the body that labor has ceased.',
  },
  {
    _id: 'article-notes-grasse',
    _type: 'journalArticle',
    title: 'Notes from Grasse: The Mimosa Harvest',
    slug: { _type: 'slug', current: 'notes-from-grasse-the-mimosa-harvest' },
    category: 'TERROIR',
    readTime: '6 MIN READ',
    publishedAt: '2026-09-28',
    excerpt:
      'Walking the terraced hills of southern France as winter breaks into yellow blossom, sourcing botanical essences at dawn.',
  },
  {
    _id: 'article-negative-space',
    _type: 'journalArticle',
    title: 'In Praise of Negative Space in the Home',
    slug: { _type: 'slug', current: 'in-praise-of-negative-space-in-the-home' },
    category: 'SPACES',
    readTime: '5 MIN READ',
    publishedAt: '2026-08-19',
    excerpt:
      'Why the empty corner and unadorned tabletop are as crucial to psychological calm as the objects we choose to display.',
  },
  {
    _id: 'article-why-paraffin',
    _type: 'journalArticle',
    title: 'Why Paraffin Has No Place on Your Nightstand',
    slug: { _type: 'slug', current: 'why-paraffin-has-no-place-on-your-nightstand' },
    category: 'CRAFT',
    readTime: '3 MIN READ',
    publishedAt: '2026-07-04',
    excerpt:
      'The physiological and environmental case for pure European rapeseed and clean non-GMO soy waxes over petroleum derivatives.',
  },
]

const initialSamples = [
  {
    _id: 'sample-hinoki',
    _type: 'complimentarySample',
    name: 'Hinoki Cypress & Cedar',
    notes: 'Japanese Cypress · Frankincense · Clean Moss',
    volume: '2ML EAU DE PARFUM VIAL',
    description: 'Temple wood smoke meets mountain rain.',
    orderRank: 1,
  },
  {
    _id: 'sample-fig',
    _type: 'complimentarySample',
    name: 'Wild Fig & Olive Leaf',
    notes: 'Bruised Fig Leaf · Tuscan Olive Wood · White Musk',
    volume: '2ML EAU DE PARFUM VIAL',
    description: 'Sun-drenched Mediterranean afternoon.',
    orderRank: 2,
  },
  {
    _id: 'sample-santal',
    _type: 'complimentarySample',
    name: 'Santal & Orris Root',
    notes: 'Australian Sandalwood · Florentine Iris · Cardamom',
    volume: '2ML EAU DE PARFUM VIAL',
    description: 'Powdery wood and comforting whisper.',
    orderRank: 3,
  },
]

const initialSiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: "Oryenna — Atelier de Parfum d'Intérieur",
  description:
    'Scents and spaces designed for slower moments. Hand-poured candles from wild botanicals in Grasse and Provence.',
  announcementBar:
    'Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence',
  heroEyebrow: "Atelier de Parfum d'Intérieur",
  heroHeadline: 'Oryenna',
  heroTagline: 'Light a calmer you.',
  heroSubtext:
    'Scents and spaces designed for slower moments. Poured by hand into mouth-blown glass vessels using European rapeseed and wild botanicals.',
  manifestoEyebrow: '01 / Manifeste',
  manifestoHeadline: 'Beauty in a Quieter World.',
  manifestoQuote:
    'Oryenna was founded on the belief that scent is an invisible architecture — shaping the energy, stillness, and emotional landscape of the rooms we inhabit. Hand-poured with pure renewable botanical wax and wild distillates, each vessel is an invitation to pause, exhale, and arrive fully in the present.',
  manifestoMetrics: [
    {
      value: '100%',
      label: 'Botanical Wax Blend',
      description: 'European rapeseed & clean soy without petroleum paraffin.',
    },
    {
      value: '55+ Hrs',
      label: 'Clean Slow Burn',
      description: 'Double unbleached organic cotton core wick.',
    },
    {
      value: 'Small Batch',
      label: 'Handcrafted Atelier',
      description: 'Numbered pours made in southern Grasse & Provence.',
    },
  ],
  craftHeadline: 'A Ritual, Not Just a Scent.',
  craftQuote:
    'We do not formulate fragrances to overpower a room; we formulate them to inhabit it gently.',
  craftStory:
    'Lighting a wick is a quiet threshold. It marks the deliberate boundary between the noise of the day and the sanctuary of the evening. Each candle requires three separate hand-pours over forty-eight hours to achieve a perfectly level surface.',
  sanctuaryHeadline: 'We Believe a Home Should Have a Feeling.',
  sanctuaryQuote:
    'An object in your home should either serve an indispensable purpose or bring your nervous system back into alignment.',
  sanctuaryText:
    'We reject industrial high-pressure candle manufacturing. Every batch is measured by hand in our Provence glasshouse, using cold-pressed plant oils and small-batch essential oil distillates that honour the botanical complexity of the Mediterranean seasons.',
}

export async function seed() {
  console.log('Beginning seed to Sanity dataset production...')
  const tx = client.transaction()

  for (const doc of [
    ...initialProducts,
    ...initialMoods,
    ...initialArticles,
    ...initialSamples,
    initialSiteSettings,
  ]) {
    tx.createOrReplace(doc)
  }

  await tx.commit()
  console.log('✓ Successfully seeded all documents to Sanity!')
}

if (process.argv[1]?.includes('seed')) {
  seed().catch(console.error)
}
