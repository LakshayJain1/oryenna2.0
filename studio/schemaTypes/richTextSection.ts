import { defineField, defineType } from 'sanity'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'content',
      title: 'Rich Text Content',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Link URL',
      type: 'string',
      initialValue: '#',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Rich Text Section',
      }
    },
  },
})