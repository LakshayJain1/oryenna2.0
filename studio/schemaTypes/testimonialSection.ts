import { defineField, defineType } from 'sanity'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Atelier Voices',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Testimonial Text',
              type: 'array',
              of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            }),
          ],
          required: ['author', 'content'],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'showNames',
      title: 'Show Author Names',
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
        title: title || 'Testimonial Section',
      }
    },
  },
})