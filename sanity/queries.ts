import { groq } from 'next-sanity'

const SECTION_PRODUCT_FRAGMENT = groq`
  collection -> {
    _id,
    name,
    slug,
    "products": products[] -> {
      _id,
      name,
      slug,
      price,
      priceINR,
      badge,
      notes,
      description,
      weight,
      burnTime,
      inStock,
      "imageAlt": image.alt,
      "image": image.asset-> {
        _id,
        url
      }
    }
  }
`

const PAGE_SECTIONS = groq`
  "sections": sections[] -> {
    ...,
    _type,
    sectionType,
    orderRank,
    ${SECTION_PRODUCT_FRAGMENT}
  }
`

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage" && slug.current == $slug][0] {
    title,
    slug,
    ${PAGE_SECTIONS}
  }
`

export const SHOP_PAGE_QUERY = groq`
  *[_type == "shopPage" && slug.current == $slug][0] {
    title,
    slug,
    ${PAGE_SECTIONS}
  }
`

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && slug.current == $slug][0] {
    title,
    slug,
    ${PAGE_SECTIONS}
  }
`

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage" && slug.current == $slug][0] {
    title,
    slug,
    ${PAGE_SECTIONS}
  }
`

export const PRIVACY_POLICY_PAGE_QUERY = groq`
  *[_type == "privacyPolicyPage" && slug.current == $slug][0] {
    title,
    slug,
    content
  }
`

export const TERMS_PAGE_QUERY = groq`
  *[_type == "termsPage" && slug.current == $slug][0] {
    title,
    slug,
    content
  }
`

export const SHIPPING_PAGE_QUERY = groq`
  *[_type == "shippingPage" && slug.current == $slug][0] {
    title,
    slug,
    content
  }
`

export const RETURNS_PAGE_QUERY = groq`
  *[_type == "returnsPage" && slug.current == $slug][0] {
    title,
    slug,
    content
  }
`

export const FAQ_PAGE_QUERY = groq`
  *[_type == "faqPage" && slug.current == $slug][0] {
    title,
    slug,
    faqs[] {
      question,
      answer
    }
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    announcementBar,
    heroEyebrow,
    heroHeadline,
    heroTagline,
    heroSubtext,
    manifestoEyebrow,
    manifestoHeadline,
    manifestoQuote,
    manifestoMetrics[] {
      value,
      label,
      description
    },
    craftEyebrow,
    craftHeadline,
    craftQuote,
    craftQuoteAuthor,
    craftQuoteLocation,
    craftStory,
    craftSpecs[] {
      title,
      subtitle,
      desc
    },
    sanctuaryHeadline,
    sanctuaryQuote,
    sanctuaryText,
    sanctuaryCaption
  }
`

export const NAVBAR_QUERY = groq`
  *[_type == "navbar"][0] {
    title,
    announcementText,
    navLinks[] {
      label,
      url
    }
  }
`

export const FOOTER_QUERY = groq`
  *[_type == "footer"][0] {
    title,
    brandTagline,
    copyrightText,
    footerColumns[] {
      columnTitle,
      links[] {
        label,
        url
      }
    }
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    priceINR,
    badge,
    notes,
    description,
    longDescription,
    weight,
    burnTime,
    accentNotes[],
    topNotes,
    heartNotes,
    baseNotes,
    inStock,
    orderRank,
    "image": image.asset-> {
      _id,
      url
    },
    "imageAlt": image.alt,
    collection -> {
      name,
      slug
    },
    insiderInfo -> {
      title,
      provenanceStory,
      topNotes,
      heartNotes,
      baseNotes,
      ingredientsList[],
      gallery[] {
        asset-> {
          _id,
          url
        },
        caption
      }
    }
  }
`

export const PRODUCTS_LIST_QUERY = groq`
  *[_type == "product" && inStock == true] | order(orderRank asc, _createdAt asc) {
    _id,
    name,
    slug,
    price,
    priceINR,
    badge,
    notes,
    "image": image.asset-> {
      _id,
      url
    },
    "imageAlt": image.alt,
    inStock
  }
`

export const MOOD_RECOMMENDATIONS_QUERY = groq`
  *[_type == "moodRecommendation"] | order(orderRank asc) {
    _id,
    mood,
    label,
    tagline,
    description,
    bestFor,
    warmth,
    intensity,
    clarity,
    product -> {
      _id,
      name,
      slug,
      price,
      priceINR,
      badge,
      notes,
      "image": image.asset-> {
        _id,
        url
      },
      inStock
    }
  }
`

export const JOURNAL_ARTICLES_QUERY = groq`
  *[_type == "journalArticle"] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    readTime,
    publishedAt,
    summary,
    "coverImage": coverImage.asset-> {
      _id,
      url
    },
    content[],
    author
  }
`

export const JOURNAL_ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "journalArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    readTime,
    publishedAt,
    summary,
    content[],
    author,
    "coverImage": coverImage.asset-> {
      _id,
      url
    }
  }
`

export const COLLECTION_BY_SLUG_QUERY = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    "image": image.asset-> {
      _id,
      url
    },
    products[] -> {
      _id,
      name,
      slug,
      price,
      priceINR,
      badge,
      notes,
      description,
      weight,
      burnTime,
      inStock,
      "imageAlt": image.alt,
      "image": image.asset-> {
        _id,
        url
      }
    }
  }
`

export const COLLECTION_PRODUCTS_QUERY = groq`
  *[_type == "product" && references(^.[0]._id)] | order(orderRank asc, _createdAt asc) {
    _id,
    name,
    slug,
    price,
    priceINR,
    badge,
    notes,
    "image": image.asset-> {
      _id,
      url
    },
    inStock
  }
`

export const COMPLIMENTARY_SAMPLES_QUERY = groq`
  *[_type == "complimentarySample"] | order(orderRank asc, _createdAt asc) {
    _id,
    name,
    notes,
    volume,
    description
  }
`