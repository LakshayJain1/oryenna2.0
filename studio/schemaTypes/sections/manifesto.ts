import { defineField, defineType } from 'sanity'

export const manifesto = defineType({
  name: 'manifesto',
  title: 'Manifesto',
  type: 'object',
  description: 'Brand statement with supporting metric cards.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: '01 / Manifeste',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metrics',
      title: 'Metric Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Manifesto — ${title}` : 'Manifesto' }
    },
  },
})
