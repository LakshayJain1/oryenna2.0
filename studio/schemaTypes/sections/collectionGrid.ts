import { defineField, defineType } from 'sanity'

export const collectionGrid = defineType({
  name: 'collectionGrid',
  title: 'Collection Grid',
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
      initialValue: 'Olfactory Collections',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Grid Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
        ],
      },
      initialValue: '3',
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Collection Grid — ${title}` : 'Collection Grid' }
    },
  },
})
