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
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
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
    }),
    defineField({
      name: 'topNotes',
      title: 'Olfactory Pyramid — Top Notes',
      type: 'string',
      description: 'e.g. Bergamot, Pink Peppercorn, Wild Mint',
    }),
    defineField({
      name: 'heartNotes',
      title: 'Olfactory Pyramid — Heart Notes',
      type: 'string',
      description: 'e.g. Labdanum, Damask Rose, Orris Root',
    }),
    defineField({
      name: 'baseNotes',
      title: 'Olfactory Pyramid — Base Notes',
      type: 'string',
      description: 'e.g. Smoked Cedar, White Amber, Benzoin Resin',
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
      title: 'Insider Information',
      type: 'reference',
      to: [{ type: 'productInsider' }],
      description: 'Link to detailed product craftsmanship, provenance, and olfactory pyramid.',
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
      title: 'Gallery Images',
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