import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'We Believe a Home Should Have a Feeling.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Modular Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'heroSection' },
            { type: 'editorialSection' },
            { type: 'testimonialSection' },
            { type: 'newsletterSection' },
            { type: 'richTextSection' },
            { type: 'ctaSection' },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})