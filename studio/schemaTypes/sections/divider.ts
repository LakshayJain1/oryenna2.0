import { defineField, defineType } from 'sanity'

export const divider = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  description: 'A quiet horizontal rule between sections.',
  fields: [
    defineField({
      name: 'note',
      title: 'Editorial Note',
      type: 'string',
      description: 'Internal label so dividers are identifiable in long section lists. Never displayed.',
    }),
  ],
  preview: {
    select: { title: 'note' },
    prepare({ title }) {
      return { title: typeof title === 'string' && title ? `Divider — ${title}` : 'Divider' }
    },
  },
})
