import { defineField, defineType } from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Author Role / Location',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'author' },
    prepare({ title, subtitle }) {
      const short = typeof title === 'string' && title.length > 60 ? `${title.slice(0, 60)}…` : title
      return { title: short ? `“${short}”` : 'Quote', subtitle }
    },
  },
})
