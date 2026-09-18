import { defineField, defineType } from 'sanity'

export const newsletterSection = defineType({
  name: 'newsletterSection',
  title: 'Newsletter Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Join Our Olfactory Circle',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subhead',
      type: 'string',
      initialValue: 'Receive private release notifications, seasonal fragrance journals, and early access before public cellar releases.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Subscribe',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Link URL',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'showForm',
      title: 'Show Subscription Form',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
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
        title: title || 'Newsletter Section',
      }
    },
  },
})