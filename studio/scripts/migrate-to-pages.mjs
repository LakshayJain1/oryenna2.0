// Migrates legacy page/section documents to the unified `page` model.
//
// Legacy model:  homePage|shopPage|... documents with sections[] of
//                REFERENCES to standalone *Section documents.
// New model:     one `page` document per route with sections[] of
//                INLINE objects (same content, embedded).
//
// Usage (from studio/):
//   node scripts/migrate-to-pages.mjs            # dry run, prints plan
//   node scripts/migrate-to-pages.mjs --apply    # creates `page` docs
//   node scripts/migrate-to-pages.mjs --apply --cleanup
//       # also deletes the legacy page + section documents afterwards.
//       # Only run cleanup after verifying the new pages render!
//
// Requires SANITY_AUTH_TOKEN (or SANITY_API_WRITE_TOKEN) for --apply.

import { createClient } from '@sanity/client'

const APPLY = process.argv.includes('--apply')
const CLEANUP = process.argv.includes('--cleanup')

const client = createClient({
  projectId: 'djdiiitp',
  dataset: 'production',
  apiVersion: '2026-02-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
})

const randKey = () =>
  Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)

const PAGE_TYPE_MAP = {
  homePage: 'home',
  shopPage: 'shop',
  aboutPage: 'about',
  contactPage: 'contact',
  faqPage: 'faq',
  privacyPolicyPage: 'privacy',
  termsPage: 'terms',
  shippingPage: 'shipping',
  returnsPage: 'returns',
}

const SECTION_RENAME = {
  heroSection: 'hero',
  productGrid: 'productGrid',
  collectionGrid: 'collectionGrid',
  imageText: 'imageText',
  editorialSection: 'imageText',
  testimonialSection: 'testimonials',
  newsletterSection: 'newsletter',
  richTextSection: 'richText',
  ctaSection: 'cta',
  faqSection: 'faqList',
}

function withoutSystem(doc) {
  const out = { ...doc }
  delete out._id
  delete out._rev
  delete out._createdAt
  delete out._updatedAt
  return out
}

/** Convert one legacy section document into a new inline section object. */
function toInlineSection(doc) {
  const base = withoutSystem(doc)
  delete base._type
  const out = { ...base, _type: SECTION_RENAME[doc._type] || doc._type }
  if (!out._key) out._key = randKey()

  switch (doc._type) {
    case 'heroSection':
      out.headline = doc.title
      out.tagline = doc.subtitle
      out.backgroundImage = doc.image
      if (doc.ctaText) out.cta = { _type: 'object', label: doc.ctaText, url: doc.ctaUrl || '#' }
      delete out.title
      delete out.subtitle
      delete out.image
      delete out.ctaText
      delete out.ctaUrl
      delete out.backgroundColor
      delete out.textColor
      break
    case 'productGrid':
      out.headline = doc.title
      out.description = doc.subtitle
      out.layout = doc.columns
      out.products = []
      out.count = 8
      delete out.title
      delete out.subtitle
      delete out.columns
      delete out.productFilter
      delete out.showVendor
      delete out.showBadge
      break
    case 'collectionGrid':
      out.headline = doc.title
      out.collections = doc.collection ? [doc.collection] : []
      out.layout = doc.columns
      delete out.title
      delete out.collection
      delete out.columns
      delete out.showImage
      break
    case 'imageText':
      out.headline = doc.title
      out.description = doc.subtitle
      delete out.title
      delete out.subtitle
      break
    case 'editorialSection':
      out.headline = doc.title
      out.description = doc.subtitle
      out.body = doc.text
      if (doc.ctaText) out.cta = { _type: 'object', label: doc.ctaText, url: doc.ctaUrl || '#' }
      delete out.title
      delete out.subtitle
      delete out.text
      delete out.ctaText
      delete out.ctaUrl
      break
    case 'testimonialSection':
      out.headline = doc.title
      delete out.title
      break
    case 'newsletterSection':
      out.headline = doc.title
      out.description = doc.subtitle
      out.ctaLabel = doc.ctaText
      delete out.title
      delete out.subtitle
      delete out.ctaText
      delete out.ctaUrl
      delete out.showForm
      delete out.backgroundColor
      break
    case 'richTextSection':
      out.headline = doc.title
      if (doc.ctaText) out.cta = { _type: 'object', label: doc.ctaText, url: doc.ctaUrl || '#' }
      delete out.title
      delete out.ctaText
      delete out.ctaUrl
      break
    case 'ctaSection':
      out.headline = doc.title
      out.description = doc.subtitle
      if (doc.ctaText) out.cta = { _type: 'object', label: doc.ctaText, url: doc.ctaUrl || '/shop' }
      if (doc.ctaSecondaryText)
        out.secondaryCta = {
          _type: 'object',
          label: doc.ctaSecondaryText,
          url: doc.ctaSecondaryUrl || '/about',
        }
      delete out.title
      delete out.subtitle
      delete out.ctaText
      delete out.ctaSecondaryText
      delete out.ctaUrl
      delete out.ctaSecondaryUrl
      delete out.backgroundColor
      delete out.textColor
      break
    case 'faqSection':
      out.headline = doc.title
      out.items = (doc.faqs || []).map((f) => ({
        _type: 'object',
        _key: f._key || randKey(),
        question: f.question,
        answer: f.answer,
      }))
      delete out.title
      delete out.faqs
      break
    default:
      break
  }
  return out
}

async function main() {
  if (APPLY && !client.config().token) {
    console.error('Missing SANITY_AUTH_TOKEN — cannot write. Run without --apply for a dry run.')
    process.exit(1)
  }

  const legacyTypes = Object.keys(PAGE_TYPE_MAP)
  const pages = await client.fetch(
    `*[ _type in $types ] { _id, _type, title, slug, sections[]->, faqs, content }`,
    { types: legacyTypes }
  )

  console.log(`Found ${pages.length} legacy page documents.\n`)

  const created = []
  const legacyIds = []

  for (const page of pages) {
    const pageType = PAGE_TYPE_MAP[page._type]
    const slug = page.slug?.current || page._type.replace(/Page$/, '').toLowerCase()
    let sections = []

    if (page._type === 'faqPage') {
      sections = [
        {
          _type: 'faqList',
          _key: randKey(),
          headline: 'Frequently Asked Questions',
          items: (page.faqs || []).map((f) => ({
            _type: 'object',
            _key: f._key || randKey(),
            question: f.question,
            answer: f.answer,
          })),
        },
      ]
    } else if (Array.isArray(page.content)) {
      sections = [{ _type: 'richText', _key: randKey(), content: page.content }]
    } else {
      sections = (page.sections || []).map(toInlineSection)
    }

    const doc = {
      _id: `page-${pageType}`,
      _type: 'page',
      title: page.title || pageType,
      slug: { _type: 'slug', current: slug },
      pageType,
      sections,
    }

    legacyIds.push(page._id)
    for (const s of page.sections || []) {
      if (s && s._id) legacyIds.push(s._id)
    }

    if (APPLY) {
      await client.createIfNotExists(doc)
      created.push(doc._id)
      console.log(`  ✓ ${doc._id}  (${sections.length} sections, from ${page._type}/${page._id})`)
    } else {
      console.log(`  · would create ${doc._id} with ${sections.length} sections (from ${page._type}/${page._id})`)
      for (const s of sections) console.log(`      - ${s._type}`)
    }
  }

  if (!APPLY) {
    console.log('\nDry run only — nothing written. Re-run with --apply to create the page docs.')
    return
  }

  console.log(`\nCreated ${created.length} page documents.`)

  if (CLEANUP) {
    const unique = [...new Set(legacyIds)]
    console.log(`Deleting ${unique.length} legacy documents...`)
    const tx = client.transaction()
    unique.forEach((id) => tx.delete(id))
    await tx.commit()
    console.log('Cleanup complete. Verify the new pages render before removing this script.')
  } else {
    console.log(
      'Legacy documents left untouched. After verifying the new pages, re-run with --apply --cleanup to remove them.'
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
