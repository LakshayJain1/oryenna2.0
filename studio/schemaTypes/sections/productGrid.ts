import { defineField, defineType } from 'sanity'

export const productGrid = defineType({
  name: 'productGrid',
  title: 'Product Grid',
  type: 'object',
  description: 'Product listing driven by a collection, an explicit selection, or both.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Signature Pours',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'collection',
      title: 'Collection (optional)',
      type: 'reference',
      to: [{ type: 'collection' }],
      description: 'When set, the grid lists this collection’s products.',
    }),
    defineField({
      name: 'products',
      title: 'Explicit Products (optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Used when no collection is set, or to override it.',
    }),
    defineField({
      name: 'count',
      title: 'Max Products Shown',
      type: 'number',
      initialValue: 8,
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'layout',
      title: 'Grid Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '4',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string', initialValue: '/shop' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Product Grid — ${title}` : 'Product Grid' }
    },
  },
})
