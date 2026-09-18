// Migration seed: rebuild Oryenna production (djdiiitp) with the NEW 3-layer schema.
// Source content: `git show 8ab60ed` (initial commit) — data.ndjson, seed.mjs, and
// hardcoded Header/Footer/home sections from the pre-Sanity website.
//
// Usage:
//   $env:SANITY_AUTH_TOKEN="skXXXX"   # create at manage.sanity.io -> API -> Tokens (editor/write)
//   node scripts/migrate.mjs
//
// Idempotent: re-running is safe (createOrReplace + asset reuse).

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../../public/images')

const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('❌ Missing token. Create one at https://manage.sanity.io -> API -> Tokens, then run:')
  console.error('   $env:SANITY_AUTH_TOKEN="skXXXX" ; node scripts/migrate.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: 'djdiiitp',
  dataset: 'production',
  apiVersion: '2026-02-01',
  useCdn: false,
  token,
})

let keyCounter = 0
const key = (prefix = 'k') => `${prefix}${(++keyCounter).toString(36)}`
const pt = (text) => [
  {
    _type: 'block',
    _key: key('blk'),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key('sp'), text }],
  },
]
const imgDoc = (assetId, alt) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
  alt,
})

// ---------------------------------------------------------------------------
// 1. Image assets (reuse existing asset if the original filename is present)
// ---------------------------------------------------------------------------
const imageFiles = [
  { name: 'amber', file: 'products/ember.png' },
  { name: 'santal', file: 'products/santal.png' },
  { name: 'palo-santo', file: 'products/fig-olive.png' },
  { name: 'hinoki', file: 'products/soft-linen.png' },
  { name: 'hero', file: 'hero/candle-linen.jpg' },
]

async function uploadAsset(file, label) {
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0] { _id }`,
    { f: path.basename(file) }
  )
  if (existing) {
    console.log(`  · reuse asset ${existing._id} (${label})`)
    return existing._id
  }
  const asset = await client.assets.upload('image', fs.createReadStream(file), {
    filename: path.basename(file),
  })
  console.log(`  · uploaded asset ${asset._id} (${label})`)
  return asset._id
}

console.log('Uploading images…')
const assetIds = {}
for (const { name, file } of imageFiles) {
  const abs = path.join(publicDir, file)
  if (!fs.existsSync(abs)) throw new Error(`Missing image: ${abs}`)
  assetIds[name] = await uploadAsset(abs, name)
}

// ---------------------------------------------------------------------------
// 2. Content documents (sourced from initial commit legacy data)
// ---------------------------------------------------------------------------
const products = [
  {
    _id: 'product-amber',
    _type: 'product',
    name: 'Amber',
    slug: { _type: 'slug', current: 'amber' },
    price: 78,
    priceINR: 6499,
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
    longDescription: pt(
      'Inspired by the quiet amber light of late November. Golden labdanum, dry birch logs, and soft ribbons of incense that linger in fabrics long after the wick is snuffed.'
    ),
    image: imgDoc(assetIds.amber, 'Amber candle in amber glass vessel'),
    inStock: true,
    orderRank: 1,
    collection: { _type: 'reference', _ref: 'collection-signature' },
  },
  {
    _id: 'product-santal',
    _type: 'product',
    name: 'Santal',
    slug: { _type: 'slug', current: 'santal' },
    price: 78,
    priceINR: 6499,
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
    longDescription: pt(
      'Formulated for moments of solitude and evening reading. A delicate botanical veil that cushions background sound and restores mental clarity.'
    ),
    image: imgDoc(assetIds.santal, 'Santal candle in white glass vessel'),
    inStock: true,
    orderRank: 2,
    collection: { _type: 'reference', _ref: 'collection-signature' },
  },
  {
    _id: 'product-palo-santo',
    _type: 'product',
    name: 'Palo Santo',
    slug: { _type: 'slug', current: 'palo-santo' },
    price: 82,
    priceINR: 6999,
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
    longDescription: pt(
      'Clears dense atmospheres and resets room energy. Hand-harvested sacred wood from naturally fallen branches in protected coastal forests.'
    ),
    image: imgDoc(assetIds['palo-santo'], 'Palo Santo candle in dark glass vessel'),
    inStock: true,
    orderRank: 3,
    collection: { _type: 'reference', _ref: 'collection-signature' },
  },
  {
    _id: 'product-hinoki',
    _type: 'product',
    name: 'Hinoki',
    slug: { _type: 'slug', current: 'hinoki' },
    price: 84,
    priceINR: 7199,
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
    longDescription: pt(
      'Transports space to mist-covered mountain temples in Yoshino. Resinous, quiet, and deeply centering.'
    ),
    image: imgDoc(assetIds.hinoki, 'Hinoki candle in soft-linen-toned glass vessel'),
    inStock: true,
    orderRank: 4,
    collection: { _type: 'reference', _ref: 'collection-signature' },
  },
]

const collection = {
  _id: 'collection-signature',
  _type: 'collection',
  name: 'Signature Collection',
  slug: { _type: 'slug', current: 'signature' },
  description:
    'Four distinct olfactory landscapes — Amber, Santal, Palo Santo, and Hinoki — hand-poured in Grasse.',
  image: imgDoc(assetIds['palo-santo'], 'Signature Collection candles arranged at the atelier'),
  products: products.map((p) => ({ _type: 'reference', _ref: p._id })),
  orderRank: 1,
}

const moods = [
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

const articleImage = {
  'the-art-of-the-evening-reset': 'amber',
  'notes-from-grasse-the-mimosa-harvest': 'palo-santo',
  'in-praise-of-negative-space-in-the-home': 'santal',
  'why-paraffin-has-no-place-on-your-nightstand': 'hinoki',
}

const articles = [
  {
    _id: 'article-evening-reset',
    _type: 'journalArticle',
    title: 'The Art of the Evening Reset',
    slug: { _type: 'slug', current: 'the-art-of-the-evening-reset' },
    category: 'RITUAL',
    readTime: '4 MIN READ',
    publishedAt: '2026-10-14',
    summary:
      'How lowering ambient light, striking a sulfur match, and choosing one singular scent signals the body that labor has ceased.',
    content: pt(
      'How lowering ambient light, striking a sulfur match, and choosing one singular scent signals the body that labor has ceased. We walk through the evening ritual step by step.'
    ),
    coverImage: imgDoc(assetIds[articleImage['the-art-of-the-evening-reset']], 'Evening reset candle lit in a dim room'),
    author: 'Atelier Curators, Grasse',
    orderRank: 1,
  },
  {
    _id: 'article-notes-grasse',
    _type: 'journalArticle',
    title: 'Notes from Grasse: The Mimosa Harvest',
    slug: { _type: 'slug', current: 'notes-from-grasse-the-mimosa-harvest' },
    category: 'TERROIR',
    readTime: '6 MIN READ',
    publishedAt: '2026-09-28',
    summary:
      'Walking the terraced hills of southern France as winter breaks into yellow blossom, sourcing botanical essences at dawn.',
    content: pt(
      'Walking the terraced hills of southern France as winter breaks into yellow blossom, sourcing botanical essences at dawn.'
    ),
    coverImage: imgDoc(assetIds[articleImage['notes-from-grasse-the-mimosa-harvest']], 'Mimosa blossom in southern France'),
    author: 'Atelier Curators, Grasse',
    orderRank: 2,
  },
  {
    _id: 'article-negative-space',
    _type: 'journalArticle',
    title: 'In Praise of Negative Space in the Home',
    slug: { _type: 'slug', current: 'in-praise-of-negative-space-in-the-home' },
    category: 'SPACES',
    readTime: '5 MIN READ',
    publishedAt: '2026-08-19',
    summary:
      'Why the empty corner and unadorned tabletop are as crucial to psychological calm as the objects we choose to display.',
    content: pt(
      'Why the empty corner and unadorned tabletop are as crucial to psychological calm as the objects we choose to display.'
    ),
    coverImage: imgDoc(assetIds[articleImage['in-praise-of-negative-space-in-the-home']], 'Minimal unadorned home corner with candle'),
    author: 'Atelier Curators, Grasse',
    orderRank: 3,
  },
  {
    _id: 'article-why-paraffin',
    _type: 'journalArticle',
    title: 'Why Paraffin Has No Place on Your Nightstand',
    slug: { _type: 'slug', current: 'why-paraffin-has-no-place-on-your-nightstand' },
    category: 'CRAFT',
    readTime: '3 MIN READ',
    publishedAt: '2026-07-04',
    summary:
      'The physiological and environmental case for pure European rapeseed and clean non-GMO soy waxes over petroleum derivatives.',
    content: pt(
      'The physiological and environmental case for pure European rapeseed and clean non-GMO soy waxes over petroleum derivatives.'
    ),
    coverImage: imgDoc(assetIds[articleImage['why-paraffin-has-no-place-on-your-nightstand']], 'Hand-poured botanical wax candle'),
    author: 'Atelier Curators, Grasse',
    orderRank: 4,
  },
]

const samples = [
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

const siteSettings = {
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
  // Legacy editorial content preserved on the doc (schema keeps the 7 core fields;
  // these extra fields are retained so older queries keep resolving).
  manifestoEyebrow: '01 / Manifeste',
  manifestoHeadline: 'Beauty in a Quieter World.',
  manifestoQuote:
    'Oryenna was founded on the belief that scent is an invisible architecture — shaping the energy, stillness, and emotional landscape of the rooms we inhabit. Hand-poured with pure renewable botanical wax and wild distillates, each vessel is an invitation to pause, exhale, and arrive fully in the present.',
  manifestoMetrics: [
    { value: '100%', label: 'Botanical Wax Blend', description: 'European rapeseed & clean soy without petroleum paraffin.' },
    { value: '55+ Hrs', label: 'Clean Slow Burn', description: 'Double unbleached organic cotton core wick.' },
    { value: 'Small Batch', label: 'Handcrafted Atelier', description: 'Numbered pours made in southern Grasse & Provence.' },
  ],
  craftHeadline: 'A Ritual, Not Just a Scent.',
  craftQuote:
    'We do not formulate fragrances to overpower a room; we formulate them to inhabit it gently.',
  craftQuoteAuthor: 'Atelier Oryenna',
  craftQuoteLocation: 'Grasse, France',
  craftStory:
    'Lighting a wick is a quiet threshold. It marks the deliberate boundary between the noise of the day and the sanctuary of the evening. Each candle requires three separate hand-pours over forty-eight hours to achieve a perfectly level surface.',
  craftSpecs: [
    { title: 'Mouth-Blown Glass', subtitle: 'Tuscan Artisan Glass', desc: 'Heavyweight base with soft tactile curves. Reusable as an aperitif glass or keepsake vessel once consumed.' },
    { title: 'Braided Organic Cotton', subtitle: 'Zero Lead or Zinc', desc: 'Custom flat-braided wicks designed for an even melt pool without black smoke or mushrooming residue.' },
    { title: 'Wild Botanical Distillates', subtitle: 'Southern Grasse Terroir', desc: 'Blended in small batch cold macerations using responsibly foraged pine, wild lavender, and resin tears.' },
  ],
  sanctuaryHeadline: 'We Believe a Home Should Have a Feeling.',
  sanctuaryQuote:
    'An object in your home should either serve an indispensable purpose or bring your nervous system back into alignment.',
  sanctuaryText:
    'We reject industrial high-pressure candle manufacturing. Every batch is measured by hand in our Provence glasshouse, using cold-pressed plant oils and small-batch essential oil distillates that honour the botanical complexity of the Mediterranean seasons.',
  sanctuaryCaption:
    'The Glasshouse Atelier — Wild-harvested botanicals dried in Grasse',
}

const navbar = {
  _id: 'navbar',
  _type: 'navbar',
  title: 'Main Website Navbar',
  announcementText:
    'Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence',
  navLinks: [
    { label: 'Shop', url: '/shop' },
    { label: 'Journal', url: '/journal' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' },
  ],
}

const footer = {
  _id: 'footer',
  _type: 'footer',
  title: 'Main Website Footer',
  brandTagline: 'An Invitation to Slow Down',
  copyrightText: '© 2026 ORYENNA ATELIER DE PARFUM. ALL RIGHTS RESERVED.',
  footerColumns: [
    {
      columnTitle: 'The Atelier',
      links: [
        { label: 'Manifesto', url: '/about' },
        { label: 'Ritual of the Flame', url: '/about' },
        { label: 'The Journal', url: '/journal' },
        { label: 'Contact the Atelier', url: '/contact' },
      ],
    },
    {
      columnTitle: 'Fragrance Pours',
      links: [
        { label: 'Shop All', url: '/shop' },
        { label: 'Signature Collection', url: '/collections/signature' },
        { label: 'Amber Candle', url: '/product/amber' },
        { label: 'Santal Candle', url: '/product/santal' },
      ],
    },
    {
      columnTitle: 'Client Care',
      links: [
        { label: 'Shipping', url: '/shipping' },
        { label: 'Returns', url: '/returns' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Privacy Protocol', url: '/privacy-policy' },
      ],
    },
    {
      columnTitle: 'Flagships',
      links: [
        { label: 'Grasse Studio — 14 Rue des Parfumeurs, 06130', url: '#' },
        { label: 'London Sanctuary — 28 Mount Street, Mayfair', url: '#' },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// 3. Homepage modular sections (new 3-layer: section docs referenced by homePage)
// ---------------------------------------------------------------------------
const sec = (s) => ({ sectionType: s._type, orderRank: s.orderRank, ...s })

const homeSections = [
  sec({
    _id: 'sec-home-hero',
    _type: 'heroSection',
    title: 'Oryenna',
    subtitle:
      'Scents and spaces designed for slower moments. Poured by hand into mouth-blown glass vessels using European rapeseed and wild botanicals.',
    eyebrow: "Atelier de Parfum d'Intérieur",
    ctaText: 'Explore the Collection',
    ctaUrl: '/collections/signature',
    image: imgDoc(assetIds.hero, 'Candle beside linen, softly lit at dusk'),
    backgroundColor: 'ory-cream-deep',
    textColor: 'ory-ink',
    orderRank: 1,
  }),
  sec({
    _id: 'sec-home-sanctuary',
    _type: 'imageText',
    title: 'We Believe a Home Should Have a Feeling.',
    subtitle:
      'An object in your home should either serve an indispensable purpose or bring your nervous system back into alignment.',
    text:
      'We reject industrial high-pressure candle manufacturing. Every batch is measured by hand in our Provence glasshouse, using cold-pressed plant oils and small-batch essential oil distillates that honour the botanical complexity of the Mediterranean seasons.',
    image: imgDoc(assetIds.hero, 'The glasshouse atelier in Grasse'),
    imageAlignment: 'right',
    textAlignment: 'left',
    orderRank: 2,
  }),
  sec({
    _id: 'sec-home-manifesto',
    _type: 'editorialSection',
    title: 'Beauty in a Quieter World.',
    subtitle:
      'Scent is an invisible architecture — shaping the energy, stillness, and emotional landscape of the rooms we inhabit. Hand-poured with pure renewable botanical wax and wild distillates, each vessel is an invitation to pause, exhale, and arrive fully in the present.',
    image: imgDoc(assetIds.amber, 'Amber candle glowing on a hearth at dusk'),
    text: pt(
      'Lighting a wick is a quiet threshold. It marks the deliberate boundary between the noise of the day and the sanctuary of the evening. Each candle requires three separate hand-pours over forty-eight hours to achieve a perfectly level surface.'
    ),
    ctaText: 'Read the Journal',
    ctaUrl: '/journal',
    orderRank: 3,
  }),
  sec({
    _id: 'sec-home-product-grid',
    _type: 'productGrid',
    title: 'Signature Pours',
    subtitle: 'Four distinct olfactory landscapes',
    productFilter: 'all',
    columns: '4',
    showVendor: false,
    showBadge: true,
    orderRank: 4,
  }),
  sec({
    _id: 'sec-home-collection-grid',
    _type: 'collectionGrid',
    title: 'Olfactory Collections',
    collection: { _type: 'reference', _ref: 'collection-signature' },
    columns: '4',
    showImage: true,
    orderRank: 5,
  }),
  sec({
    _id: 'sec-home-faq',
    _type: 'faqSection',
    title: 'Frequently Asked Questions',
    faqs: [
      { question: 'Do you offer complimentary samples?', answer: 'Yes. Every order includes 2ML Eau de Parfum vials of your choosing.' },
      { question: 'How should I care for the wick?', answer: 'Trim to 5mm before each burn, allow a full melt pool to the edges, and never burn longer than four hours.' },
      { question: 'What is your returns policy?', answer: 'Unused, unlit candles may be returned within 14 days of delivery.' },
    ],
    orderRank: 6,
  }),
  sec({
    _id: 'sec-home-newsletter',
    _type: 'newsletterSection',
    title: 'Join Our Olfactory Circle',
    subtitle:
      'Receive private release notifications, seasonal fragrance journals, and early access before public cellar releases.',
    ctaText: 'Subscribe',
    ctaUrl: '',
    showForm: true,
    backgroundColor: 'ory-cream',
    orderRank: 7,
  }),
  sec({
    _id: 'sec-home-cta',
    _type: 'ctaSection',
    title: 'Discover Oryenna',
    subtitle:
      'Hand-poured candles from wild botanicals in Grasse and Provence.',
    ctaText: 'Shop the Collection',
    ctaUrl: '/collections/signature',
    ctaSecondaryText: 'Read the Journal',
    ctaSecondaryUrl: '/journal',
    backgroundColor: 'ory-ink',
    textColor: 'ory-cream',
    orderRank: 8,
  }),
]

const pages = [
  {
    _id: 'home',
    _type: 'homePage',
    title: 'Homepage',
    slug: { _type: 'slug', current: 'home' },
    sections: homeSections
      .slice()
      .sort((a, b) => a.orderRank - b.orderRank)
      .map((s) => ({ _type: 'reference', _ref: s._id })),
  },
  {
    _id: 'page-about',
    _type: 'aboutPage',
    title: 'The Atelier',
    slug: { _type: 'slug', current: 'about' },
    sections: [
      {
        _type: 'reference',
        _ref: 'sec-home-manifesto',
      },
      {
        _type: 'reference',
        _ref: 'sec-home-sanctuary',
      },
    ],
  },
  {
    _id: 'page-contact',
    _type: 'contactPage',
    title: 'Contact the Atelier',
    slug: { _type: 'slug', current: 'contact' },
    sections: [
      { _type: 'reference', _ref: 'sec-home-cta' },
      { _type: 'reference', _ref: 'sec-home-faq' },
    ],
  },
  {
    _id: 'page-shop',
    _type: 'shopPage',
    title: 'Shop',
    slug: { _type: 'slug', current: 'shop' },
    sections: [
      { _type: 'reference', _ref: 'sec-home-hero' },
      { _type: 'reference', _ref: 'sec-home-collection-grid' },
      { _type: 'reference', _ref: 'sec-home-newsletter' },
    ],
  },
  {
    _id: 'page-faq',
    _type: 'faqPage',
    title: 'Frequently Asked Questions',
    slug: { _type: 'slug', current: 'faq' },
    faqs: [
      {
        question: 'What are your shipping options?',
        answer:
          'Complimentary white-glove shipping on orders over $150. Hand-poured in Provence, dispatched worldwide within 48 hours.',
      },
      {
        question: 'Do you offer complimentary samples?',
        answer:
          'Yes. Every order includes 2ML Eau de Parfum vials of your choosing.',
      },
      {
        question: 'How should I care for the wick?',
        answer:
          'Trim to 5mm before each burn, allow a full melt pool to the edges, and never burn longer than four hours.',
      },
      {
        question: 'What is your returns policy?',
        answer:
          'Unused, unlit candles may be returned within 14 days of delivery.',
      },
    ],
  },
  {
    _id: 'page-privacy',
    _type: 'privacyPolicyPage',
    title: 'Privacy Protocol',
    slug: { _type: 'slug', current: 'privacy-policy' },
    content: pt(
      'Oryenna respects your privacy. We collect only the information needed to fulfil orders: name, shipping address, email, and payment confirmation. We never sell or share personal data with third parties, except as required to process your order.'
    ),
  },
  {
    _id: 'page-terms',
    _type: 'termsPage',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms' },
    content: pt(
      'By placing an order with Oryenna, you agree to these terms. All candles are hand-poured in small batches and shipped from Provence. Prices are listed in USD and INR at checkout. We reserve the right to update pricing and terms at any time.'
    ),
  },
  {
    _id: 'page-shipping',
    _type: 'shippingPage',
    title: 'Shipping Information',
    slug: { _type: 'slug', current: 'shipping' },
    content: pt(
      'Complimentary white-glove shipping is offered on orders over $150. Orders are dispatched within 48 hours from our atelier in Grasse, France. International delivery typically arrives within 7–14 working days and is fully tracked.'
    ),
  },
  {
    _id: 'page-returns',
    _type: 'returnsPage',
    title: 'Returns',
    slug: { _type: 'slug', current: 'returns' },
    content: pt(
      'Unused, unlit candles may be returned within 14 days of delivery for a full refund. Please contact the atelier to arrange a return before dispatching any item. Custom or personalised pours are final sale.'
    ),
  },
]

// ---------------------------------------------------------------------------
// 4. Commit everything
// ---------------------------------------------------------------------------
const docs = [
  collection,
  ...products,
  ...moods,
  ...articles,
  ...samples,
  siteSettings,
  navbar,
  footer,
  ...homeSections,
  ...pages,
]

console.log(`Committing ${docs.length} documents…`)
const tx = client.transaction()
for (const doc of docs) tx.createOrReplace(doc)
await tx.commit()

console.log('✓ Done. Studio: https://oryenna-studio.vercel.app')