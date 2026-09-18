import { defineField, defineType } from 'sanity'

export const editorialSection = defineType({
  name: 'editorialSection',
  title: 'Editorial Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Essays on Slow Living',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subhead',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Editorial Text',
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
      initialValue: '#shop',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Editorial Section',
      }
    },
  },
})