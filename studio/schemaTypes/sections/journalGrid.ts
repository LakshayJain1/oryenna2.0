import { defineField, defineType } from 'sanity'

export const journalGrid = defineType({
  name: 'journalGrid',
  title: 'Journal Grid',
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
      initialValue: 'Essays on Slow Living',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'journalArticle' }] }],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string', initialValue: '/journal' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Journal Grid — ${title}` : 'Journal Grid' }
    },
  },
})
