import { defineField, defineType } from 'sanity'

export const newsletter = defineType({
  name: 'newsletter',
  title: 'Newsletter',
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
      initialValue: 'Join Our Olfactory Circle',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Receive private release notifications, seasonal fragrance journals, and early access before public releases.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Subscribe',
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Newsletter — ${title}` : 'Newsletter' }
    },
  },
})
