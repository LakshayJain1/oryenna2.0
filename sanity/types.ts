export interface SanityAsset {
  _id: string
  url: string
}

export interface SanityImage {
  asset?: SanityAsset
  url?: string
  alt?: string
}

export interface SectionBlock {
  _type: string
  sectionType?: string
  orderRank?: number
  [key: string]: any
}

/** Unified page document (new model). Sections are embedded inline. */
export interface PageSection {
  _type: string
  _key?: string
  [key: string]: any
}

export interface PageDoc {
  _id: string
  title: string
  slug: string | { current: string }
  pageType:
    | 'home'
    | 'shop'
    | 'journal'
    | 'about'
    | 'contact'
    | 'faq'
    | 'privacy'
    | 'terms'
    | 'shipping'
    | 'returns'
  sections?: PageSection[]
}

export interface SanityHomePage {
  title: string
  slug: string
  sections: SectionBlock[]
}

export interface SanityShopPage {
  title: string
  slug: string
  sections: SectionBlock[]
}

export interface SanityAboutPage {
  title: string
  slug: string
  sections: SectionBlock[]
}

export interface SanityContactPage {
  title: string
  slug: string
  sections: SectionBlock[]
}

export interface SanityFaqPage {
  title: string
  slug: string
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export interface SanityPrivacyPolicyPage {
  title: string
  slug: string
  content?: any[]
}

export interface SanityTermsPage {
  title: string
  slug: string
  content?: any[]
}

export interface SanityShippingPage {
  title: string
  slug: string
  content?: any[]
}

export interface SanityReturnsPage {
  title: string
  slug: string
  content?: any[]
}

export interface SanityProduct {
  _id: string
  name: string
  slug: string
  price: number
  priceINR: number
  badge?: string
  notes: string
  description: string
  longDescription: any[]
  weight: string
  burnTime?: string
  accentNotes?: string[]
  topNotes?: string
  heartNotes?: string
  baseNotes?: string
  inStock?: boolean
  featured?: boolean
  orderRank?: number
  comparePrice?: number
  size?: string
  sku?: string
  ingredients?: string[]
  gallery?: Array<{
    asset: {
      _id: string
      url: string
    }
    caption?: string
  }>
  seo?: {
    title?: string
    description?: string
  }
  collection?: {
    name: string
    slug: string
  }
  image: SanityImage
  imageAlt?: string
  insiderInfo?: {
    title: string
    provenanceStory: string
    topNotes?: string
    heartNotes?: string
    baseNotes?: string
    ingredientsList?: string[]
    gallery?: Array<{
      asset: {
        _id: string
        url: string
      }
      caption?: string
    }>
  }
}

export interface SanityCollection {
  _id: string
  name: string
  slug: string
  description: string
  image: SanityImage
  products: SanityProduct[]
  orderRank?: number
}

export interface SanityMoodRecommendation {
  _id: string
  mood: 'quiet' | 'grounded' | 'uplifted' | 'warm'
  label: string
  tagline: string
  description: string
  bestFor: string
  warmth: number
  intensity: number
  clarity: number
  product: {
    _id: string
    name: string
    slug: string
    price: number
    priceINR: number
    badge?: string
    notes: string
    weight: string
    image: SanityImage
    inStock?: boolean
  }
}

export interface SanityJournalArticle {
  _id: string
  title: string
  slug: string
  category: string
  readTime: string
  publishedAt?: string
  summary: string
  content: any[]
  author: string
  featured?: boolean
  seo?: {
    title?: string
    description?: string
  }
  coverImage: {
    asset: SanityAsset
    url: string
  }
}

export interface SanityJournalInsider {
  _id: string
  title: string
  articleReference: {
    _id: string
    title: string
  }
  author: string
  contentChapters: Array<{
    chapterHeading: string
    chapterText: any[]
    chapterImage?: {
      asset: SanityAsset
      url: string
    }
  }>
  curatorNote?: string
}

export interface SanityComplimentarySample {
  _id: string
  name: string
  notes: string
  volume: string
  description: string
  orderRank?: number
}

export interface SanitySiteSettings {
  title?: string
  description?: string
  announcementBar?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroTagline?: string
  heroSubtext?: string
  manifestoEyebrow?: string
  manifestoHeadline?: string
  manifestoQuote?: string
  manifestoMetrics?: Array<{
    value: string
    label: string
    description: string
  }>
  craftHeadline?: string
  craftQuote?: string
  craftQuoteAuthor?: string
  craftQuoteLocation?: string
  craftStory?: string
  craftSpecs?: Array<{
    title: string
    subtitle: string
    desc: string
  }>
  sanctuaryHeadline?: string
  sanctuaryQuote?: string
  sanctuaryText?: string
  sanctuaryCaption?: string
}

export interface SanityNavbar {
  title?: string
  announcementText?: string
  navLinks?: Array<{
    label: string
    url: string
  }>
}

export interface SanityFooter {
  title?: string
  brandTagline?: string
  copyrightText?: string
  footerColumns?: {
    columnTitle: string
    links: Array<{
      label: string
      url: string
    }>
  }[]
}