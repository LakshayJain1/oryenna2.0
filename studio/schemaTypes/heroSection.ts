import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheadline',
      type: 'string',
      description: 'Secondary headline or tagline',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Atelier de Parfum d\'Intérieur',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Explore Collection',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Link URL',
      type: 'string',
      initialValue: '#shop',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'ory-cream-deep',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: 'ory-ink',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? `(${subtitle})` : undefined,
      }
    },
  },
})