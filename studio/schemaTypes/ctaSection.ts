import { defineField, defineType } from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Discover Oryenna',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subhead',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'Primary CTA',
      type: 'string',
      initialValue: 'Shop Now',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Secondary CTA',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Primary CTA URL',
      type: 'string',
      initialValue: '#shop',
    }),
    defineField({
      name: 'ctaSecondaryUrl',
      title: 'Secondary CTA URL',
      type: 'string',
      initialValue: '#about',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'ory-ink',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: 'ory-cream',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'CTA Section',
      }
    },
  },
})