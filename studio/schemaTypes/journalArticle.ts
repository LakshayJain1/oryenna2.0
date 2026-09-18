import { defineField, defineType } from 'sanity'

export const journalArticle = defineType({
  name: 'journalArticle',
  title: 'Journal Page',
  type: 'document',
  description:
    'The Journal listing page. Create one document: page title, tagline, and the ordered list of insider articles.',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      description: 'Ordered list of Journal Insider (deep dive) articles shown on the listing page.',
      of: [{ type: 'reference', to: [{ type: 'journalInsider' }] }],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Journal Page',
        subtitle: 'Journal listing',
      }
    },
  },
})
