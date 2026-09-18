import { defineField, defineType } from 'sanity'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
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
      initialValue: 'Atelier Voices',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({ name: 'author', title: 'Author', type: 'string' }),
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
          preview: { select: { title: 'author' } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title ? `Testimonials — ${title}` : 'Testimonials' }
    },
  },
})
