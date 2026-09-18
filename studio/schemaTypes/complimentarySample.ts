import { defineField, defineType } from 'sanity'

export const complimentarySample = defineType({
  name: 'complimentarySample',
  title: 'Complimentary Sample',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Sample Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'notes',
      title: 'Fragrance Notes',
      type: 'string',
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      initialValue: '2ml',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})