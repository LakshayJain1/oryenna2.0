import { defineField, defineType } from 'sanity'

export const featuredProducts = defineType({
  name: 'featuredProducts',
  title: 'Featured Products',
  type: 'object',
  description: 'Hand-picked products referenced directly.',
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
      initialValue: 'Curated Releases',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (Rule) => Rule.min(1).max(8),
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
      return { title: title ? `Featured Products — ${title}` : 'Featured Products' }
    },
  },
})
