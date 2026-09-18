import { defineField, defineType } from 'sanity'

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Editorial Image',
  type: 'object',
  description: 'Full-width atmospheric image with optional caption.',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'caption', media: 'image' },
    prepare({ title, subtitle }) {
      return { title: title ? `Editorial — ${title}` : 'Editorial Image', subtitle }
    },
  },
})
