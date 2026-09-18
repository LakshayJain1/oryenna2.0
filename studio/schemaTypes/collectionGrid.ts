import { defineField, defineType } from 'sanity'

export const collectionGrid = defineType({
  name: 'collectionGrid',
  title: 'Collection Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      initialValue: 'Olfactory Collections',
    }),
    defineField({
      name: 'collection',
      title: 'Featured Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '4',
    }),
    defineField({
      name: 'showImage',
      title: 'Show Product Images',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Collection Grid',
      }
    },
  },
})