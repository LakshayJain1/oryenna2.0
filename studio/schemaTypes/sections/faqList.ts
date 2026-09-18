import { defineField, defineType } from 'sanity'

export const faqList = defineType({
  name: 'faqList',
  title: 'FAQ List',
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
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'items',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `FAQ List — ${title}` : 'FAQ List' }
    },
  },
})
