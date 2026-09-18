import { defineField, defineType } from 'sanity'

export const productInsider = defineType({
  name: 'productInsider',
  title: 'Products Insider Info',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Insider Info Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productReference',
      title: 'Associated Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'provenanceStory',
      title: 'Provenance & Atelier Craft Story',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'topNotes',
      title: 'Olfactory Pyramid — Top Notes',
      type: 'string',
    }),
    defineField({
      name: 'heartNotes',
      title: 'Olfactory Pyramid — Heart Notes',
      type: 'string',
    }),
    defineField({
      name: 'baseNotes',
      title: 'Olfactory Pyramid — Base Notes',
      type: 'string',
    }),
    defineField({
      name: 'ingredientsList',
      title: 'Full Ingredients & Botanical Ratios',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Craftsmanship Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
        },
      ],
    }),
  ],
})