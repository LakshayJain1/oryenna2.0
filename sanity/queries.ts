import { groq } from 'next-sanity'

// ---------------------------------------------------------------------------
// Page model: one `page` document per route, sections embedded inline.
// This file contains only queries for live schema types. Legacy per-route
// page types (homePage, shopPage, aboutPage, ...) and the un-schematized
// `siteSettings` type were removed — the unified `page` doc is the source
// of truth. NAVBAR/FOOTER live in queries_footer_navbar.ts.
// ---------------------------------------------------------------------------

const INLINE_PRODUCT_FRAGMENT = groq`
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
  "image": image.asset-> {
    _id,
    url
  },
  "imageAlt": image.alt
`;

const PAGE_SECTIONS_NEW = groq`
  "sections": sections[] {
    ...,
    _type,
    _key,
    "backgroundImageUrl": backgroundImage.asset->url,
    "imageUrl": image.asset->url,
    "imageAlt": coalesce(image.alt, backgroundImage.alt),
    "products": products[]-> {
      ${INLINE_PRODUCT_FRAGMENT}
    },
    "articles": articles[]-> {
      _id,
      title,
      slug,
      publishedAt,
      "summary": coalesce(summary, description),
      "publishedBy": coalesce(publishedBy, author),
      coverImage
    },
    "collections": collections[]-> {
      _id,
      name,
      slug,
      description,
      image
    },
    "collection": collection-> {
      _id,
      name,
      slug,
      "products": products[]-> {
        ${INLINE_PRODUCT_FRAGMENT}
      }
    }
  }
`;

export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageType,
    ${PAGE_SECTIONS_NEW}
  }
`;

export const HOME_PAGE_DOC_QUERY = groq`
  *[_type == "page" && pageType == "home"][0] {
    _id,
    title,
    slug,
    pageType,
    ${PAGE_SECTIONS_NEW}
  }
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    priceINR,
    comparePrice,
    badge,
    notes,
    description,
    longDescription,
    weight,
    size,
    sku,
    burnTime,
    accentNotes[],
    topNotes,
    heartNotes,
    baseNotes,
    ingredients[],
    inStock,
    featured,
    orderRank,
    gallery[] {
      asset-> {
        _id,
        url
      },
      caption
    },
    seo {
      title,
      description
    },
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
    description,
    weight,
    burnTime,
    "image": image.asset-> {
      _id,
      url
    },
    "imageAlt": image.alt,
    inStock
  }
`

const JOURNAL_INSIDER_LIST_FRAGMENT = groq`
  _id,
  title,
  slug,
  publishedAt,
  "summary": coalesce(summary, description),
  "publishedBy": coalesce(publishedBy, author),
  "coverImage": coverImage.asset-> {
    _id,
    url
  }
`

export const JOURNAL_PAGE_QUERY = groq`
  *[_type == "journalArticle"][0] {
    title,
    tagline,
    "articles": articles[]-> {
      ${JOURNAL_INSIDER_LIST_FRAGMENT}
    }
  }
`

export const JOURNAL_INSIDER_SLUGS_QUERY = groq`
  *[_type == "journalInsider" && defined(slug.current)]{ "slug": slug.current }
`

export const JOURNAL_INSIDER_BY_SLUG_QUERY = groq`
  *[_type == "journalInsider" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    "summary": coalesce(summary, description),
    "publishedBy": coalesce(publishedBy, author),
    content[],
    "closingNote": coalesce(closingNote, curatorNote),
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

// NOTE: moodRecommendation + complimentarySample schemas remain registered in
// Studio for future merchandising use, but no frontend surface consumes them
// yet — so no queries are exported for them (avoids dead code). Add a query
// here only together with a renderer + route that uses it.