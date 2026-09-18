import { defineField, defineType } from 'sanity'

export const moodRecommendation = defineType({
  name: 'moodRecommendation',
  title: 'Scent Finder Moods',
  type: 'document',
  fields: [
    defineField({
      name: 'mood',
      title: 'Mood Identifier',
      type: 'string',
      options: {
        list: [
          { title: 'Quiet', value: 'quiet' },
          { title: 'Grounded', value: 'grounded' },
          { title: 'Uplifted', value: 'uplifted' },
          { title: 'Warm', value: 'warm' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Prescribed Atmosphere Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Atmospheric Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Recommended Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bestFor',
      title: 'Ideal Sanctuary Setting',
      type: 'string',
    }),
    defineField({
      name: 'warmth',
      title: 'Atmospheric Warmth (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'intensity',
      title: 'Projection & Throw (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'clarity',
      title: 'Botanical Clarity (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
})