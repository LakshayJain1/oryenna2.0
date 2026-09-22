import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD $)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'priceINR',
      title: 'Price (INR ₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'comparePrice',
      title: 'Compare-At Price (USD $)',
      type: 'number',
      description: 'Optional strikethrough price for sales.',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Tag',
      type: 'string',
      description: 'e.g. BESTSELLER, LIMITED, ARCHIVE, SIGNATURE',
    }),
    defineField({
      name: 'notes',
      title: 'Primary Olfactory Notes Summary',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
    }),
    defineField({
      name: 'weight',
      title: 'Vessel Weight / Size',
      type: 'string',
      initialValue: '290G / 10.2 OZ',
    }),
    defineField({
      name: 'size',
      title: 'Size Label',
      type: 'string',
      description: 'e.g. 290G Standard, 500G Grande',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'burnTime',
      title: 'Burn Time / Longevity',
      type: 'string',
      initialValue: '55 Hours',
    }),
    defineField({
      name: 'accentNotes',
      title: 'Accent Notes',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Short shelf-level accents only. The full pyramid and ingredients live on the linked Insider page.',
    }),
    defineField({
      name: 'image',
      title: 'Primary Vessel Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'insiderInfo',
      title: 'Insider Page (1 per product)',
      type: 'reference',
      to: [{ type: 'productInsider' }],
      description:
        'This product\u2019s own insider page: pyramid, ingredients, provenance story, craftsmanship gallery. The single source of truth for the link — link here only, never from the insider side.',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Surface in featured placements.',
      initialValue: false,
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery — Vessel / PDP Carousel',
      description:
        'Vessel and product shots for the product page carousel. Craftsmanship/process shots belong on the linked Insider page gallery.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO Title', type: 'string' }),
        defineField({ name: 'description', title: 'SEO Description', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title: title || 'Product',
      }
    },
  },
})