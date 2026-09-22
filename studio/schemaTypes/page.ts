import { defineField, defineType } from 'sanity'

const SECTION_TYPES = [
  'hero',
  'manifesto',
  'featuredProducts',
  'productGrid',
  'collectionGrid',
  'imageText',
  'editorialImage',
  'journalGrid',
  'quote',
  'testimonials',
  'newsletter',
  'cta',
  'richText',
  'textBlock',
  'faqList',
  'divider',
] as const

/**
 * Per-page section whitelist. Editors can only add, reorder, and edit
 * sections that make sense for the page — e.g. no Product Grid on a
 * Privacy Policy page. Order lives on the Page (array order), never on
 * the section itself.
 */
const SECTION_WHITELISTS: Record<string, readonly string[]> = {
  home: [
    'hero',
    'manifesto',
    'featuredProducts',
    'productGrid',
    'imageText',
    'editorialImage',
    'journalGrid',
    'quote',
    'testimonials',
    'newsletter',
    'cta',
    'richText',
    'textBlock',
    'faqList',
    'divider',
  ],
  shop: [
    'hero',
    'productGrid',
    'collectionGrid',
    'imageText',
    'journalGrid',
    'quote',
    'newsletter',
    'cta',
    'faqList',
    'divider',
  ],
  journal: ['hero', 'journalGrid', 'newsletter', 'cta', 'divider'],
  about: [
    'hero',
    'manifesto',
    'imageText',
    'editorialImage',
    'quote',
    'testimonials',
    'richText',
    'textBlock',
    'newsletter',
    'cta',
    'faqList',
    'divider',
  ],
  contact: [
    'hero',
    'textBlock',
    'richText',
    'imageText',
    'faqList',
    'newsletter',
    'cta',
    'divider',
  ],
  faq: ['hero', 'faqList', 'textBlock', 'cta', 'divider'],
  concierge: ['hero', 'faqList', 'textBlock', 'cta', 'divider'],
  privacy: ['richText', 'divider'],
  terms: ['richText', 'divider'],
  shipping: ['richText', 'divider'],
  returns: ['richText', 'divider'],
}

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      description: 'Controls which sections this page may contain.',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Shop', value: 'shop' },
          { title: 'Journal', value: 'journal' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Concierge', value: 'concierge' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Terms', value: 'terms' },
          { title: 'Shipping', value: 'shipping' },
          { title: 'Returns', value: 'returns' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description:
        'Add, remove, and drag sections into any order. Only sections allowed for this page type are offered.',
      of: SECTION_TYPES.map((type) => ({ type })),
      validation: (Rule) =>
        Rule.custom((sections, context) => {
          const pageType = (context?.document as { pageType?: string } | undefined)?.pageType
          if (!pageType) return true
          const allowed = SECTION_WHITELISTS[pageType] ?? []
          const offenders = ((sections as Array<{ _type?: string }> | undefined) ?? []).filter(
            (s) => s && !allowed.includes(s._type ?? '')
          )
          if (offenders.length > 0) {
            const names = [...new Set(offenders.map((s) => s._type))].join(', ')
            return `Not allowed on a "${pageType}" page: ${names}. Remove them or change the page type.`
          }
          return true
        }),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pageType' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled Page', subtitle: subtitle ? `Page · ${subtitle}` : 'Page' }
    },
  },
})
