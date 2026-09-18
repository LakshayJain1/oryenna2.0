import { defineField, defineType } from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  description: 'Centered editorial text statement.',
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
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Text Block — ${title}` : 'Text Block' }
    },
  },
})
