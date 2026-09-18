import { defineField, defineType } from 'sanity'

export const shopPage = defineType({
  name: 'shopPage',
  title: 'Shop Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Signature Pours',
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
            { type: 'productGrid' },
            { type: 'collectionGrid' },
            { type: 'imageText' },
            { type: 'editorialSection' },
            { type: 'testimonialSection' },
            { type: 'newsletterSection' },
            { type: 'faqSection' },
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