import { defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
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
      initialValue: 'Discover Oryenna',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cta',
      title: 'Primary Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'Shop Now' }),
        defineField({ name: 'url', title: 'URL', type: 'string', initialValue: '/shop' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string', initialValue: '/about' }),
      ],
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `CTA — ${title}` : 'Call to Action' }
    },
  },
})
